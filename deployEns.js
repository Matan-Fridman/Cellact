const ethers = require("ethers")
const namehash = require("eth-ens-namehash")
const {ensRegistryAbi, ensRegistryByte, registrarAbi, registrarByte} = require("./tools")
require("dotenv").config()
const fs = require("fs")

const privateKey = process.env.PRIVATE_KEY
const walletAddress = process.env.ADDRESS
const provider = new ethers.JsonRpcProvider("http://3.22.38.202:8545")
fs.readFileSync("./addresses.json")
async function deployContract(abi, bytecode, wait,  args=[]){
    // const provider = new ethers.JsonRpcProvider("http://3.22.38.202:8545")
	const wlt = new ethers.Wallet(privateKey, provider)
	const factory = new ethers.ContractFactory(abi, bytecode, wlt);
	const contract = await factory.deploy(...args)
    if(wait){
        await contract.waitForDeployment()
    }
	console.log("Contract address:", contract.target);
    return contract
}
async function deployTemp(){
    //deploy registry
    const rootNode = "0x0000000000000000000000000000000000000000000000000000000000000000"
    const web2Hash = ethers.keccak256(Buffer.from("web2"))
    const cellactHash = ethers.keccak256(Buffer.from("cellact"))
    const ownerAddress = walletAddress
    const ensRegistry = await deployContract(ensRegistryAbi, ensRegistryByte, true)
    console.log("deployed ens at: ", ensRegistry.target)

	const json = JSON.parse(fs.readFileSync("./addresses.json"))
	json.ensRegistryPrivate = ensRegistry.target
	fs.writeFileSync("./addresses.json", JSON.stringify(json))

    const tx = await ensRegistry.setSubnodeOwner(rootNode, web2Hash, ownerAddress)
    console.log("making owner of .web2")
    // Now we are the owner of namehash.hash("web2") but not of keccak256("web2")
    await tx.wait()
    // make owner of .cellact
    const tx1 = await ensRegistry.setSubnodeOwner(rootNode, cellactHash, ownerAddress)
    console.log("making owner of .cellact")
    await tx1.wait()

    return ensRegistry
}

async function deployMain(){
    //deploy registry
    const rootNode = "0x0000000000000000000000000000000000000000000000000000000000000000"
    const ethHash = ethers.keccak256(Buffer.from("eth"))
    const ensRegistry = await deployContract(ensRegistryAbi, ensRegistryByte, true)
    console.log("deployed ens at: ", ensRegistry.target)
    //deploy registrar
    const registrar = await deployContract(registrarAbi, registrarByte, true, [ensRegistry.target, namehash.hash("eth")])

	const json = JSON.parse(fs.readFileSync("./addresses.json"))
	json.ensRegistryMain = ensRegistry.target
	json.ensRegistrarMain = registrar.target
	fs.writeFileSync("./addresses.json", JSON.stringify(json))

    //give registrar permissions for .eth
    const tx = await ensRegistry.setSubnodeOwner(rootNode, ethHash, registrar.target)
    console.log("making owner of .eth")

    await tx.wait()
    return registrar
}

async function registerEns(isTemp, address, ensContractAddress,ensDomain = ""){
    // const provider = new ethers.JsonRpcProvider("http://3.22.38.202:8545")
	const wlt = new ethers.Wallet(privateKey, provider)
    const tld = isTemp ? "web2" : "cellact"
    let ens = ensDomain
    if(isTemp){
        // ens = generateRandomENSName()
    }
    const contract = new ethers.Contract(ensContractAddress, ensRegistryAbi, wlt)
    // check if name is already taken
    const nameTaken = (await contract.owner(namehash.hash(`${ens}.${tld}`))) !== "0x0000000000000000000000000000000000000000"
    console.log(nameTaken)
    if(nameTaken){
        if(isTemp){ // generate new ens and try again
            ens = generateRandomENSName()
            console.log("Name taken. trying new one:", ens)
            const newNameTaken = (await contract.owner(namehash.hash(`${ens}.${tld}`))) !== "0x0000000000000000000000000000000000000000"
            if(!newNameTaken){
                const tx2 = await contract.setSubnodeOwner(namehash.hash(tld), ethers.keccak256(Buffer.from(ens)), address)
                console.log(`Making ${address} owner of ${ens}.${tld}`)
                await tx2.wait()
                return `${ens}.${tld}`
            }
            console.log("please try again")
            return false
        }
        else{
            console.log(`${ens}.${tld} already taken, try another one`)
            return false
        }
    }
    const tx2 = await contract.setSubnodeOwner(namehash.hash(tld), ethers.keccak256(Buffer.from(ens)), address)
    console.log(`Making ${address} owner of ${ens}.${tld}`)
    await tx2.wait()
    return `${ens}.${tld}`
}

async function main(){
    // deploy ens without ttl
    const registry = await deployTemp()
    // //register temp ens
    const temp = await registerEns(true, "0x8fDA3807019b36857fA9Ba9de82F2A4a4Be5c10f", registry.target, "11e1be994a")
    // //register user ens
    const user = await registerEns(false, "0x8fDA3807019b36857fA9Ba9de82F2A4a4Be5c10f", registry.target, "test")

    //deploy ens with ttl and .eth
    const registrar = await deployMain()
    const ttl = 24 * 60 * 60 * 10 // 10 days in seconds

    // test registrar by registering new domain
    const newUser = await registrar.register(ethers.keccak256(Buffer.from("testing")), "0x9A0d73b6D2D54fdC66AdD5b73495DB059Ce24C5c", ttl)
    await newUser.wait()
}
main()
function generateRandomENSName() {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).replace(/-/g, ''); // Generate UUID and remove hyphens
    return uuid.substring(0, 10); // Combine UUID with ENS name
}
