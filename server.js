const express = require('express');
const { Wallet, getDefaultProvider, utils, parseEther, formatEther, ethers } = require("ethers")

const app = express();
const port = 3000;
API_URL = "https://eth-sepolia.g.alchemy.com/v2/wBcPxQ5w6ofyjXYaQHWSCLgSZABE42hS"

app.use(express.json());

app.get('/generate_wallet', (req, res) => {
    const wallet = Wallet.createRandom()

    const walletData = {
        private_key: wallet.privateKey,
        address: wallet.address,
        mnemonic:wallet.mnemonic.phrase
    };

    res.json(walletData);
});

app.post('/transfer', async (req, res) => {
    const body = req.body;
    console.log(body)

    await transfer(body.private_key, body.recipient, body.amount);

    res.json();
    console.log("transfer complete")
});

app.post("/check_balance", async (req, res)=>{
    const address = req.body.address
    const result = await checkBalance(address)
    res.json(result)
});

app.post("/mnemonic_login", async (req, res) => {
    const body = req.body
    const mnemonicPhrase = ethers.Mnemonic.fromPhrase(body.mnemonic);
    const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicPhrase)
    const walletData = {
        private_key:wallet.privateKey,
        address:wallet.address,
        mnemonic: mnemonicPhrase
    }
    console.log(walletData)
    res.json(walletData)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

async function transfer(privateKey, recipient, amount) {
    const PRIVATE_KEY = privateKey;
    const RECIPIENT_ADDRESS = recipient; 
    try {
        // Provider
        const provider = new getDefaultProvider(API_URL);

        // Signer
        const signer = new Wallet(PRIVATE_KEY, provider);

        // Amount to transfer (in ETH)
        const amountToTransfer = parseEther(amount.toString());

        // Send transaction
        const tx = await signer.sendTransaction({
            to: RECIPIENT_ADDRESS,
            value: amountToTransfer
        });
        
        console.log("Transaction hash:", tx.hash);

        await tx.wait();

    } catch (error) {
        console.error("Error:", error);
    }
}
async function checkBalance(address){
    const provider = new getDefaultProvider(API_URL);

    // Check signer's balance
    const balanceBefore = await provider.getBalance(address);
    const weiBalance = BigInt(balanceBefore);
    const etherBalance = parseFloat(weiBalance) / 1e18;
    console.log(etherBalance.toString(), address)
    return etherBalance.toString()
}