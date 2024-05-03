

const ensRegistryAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "label",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "NewOwner",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "resolver",
				"type": "address"
			}
		],
		"name": "NewResolver",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "ttl",
				"type": "uint64"
			}
		],
		"name": "NewTTL",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "resolver",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "ttl",
				"type": "uint64"
			}
		],
		"name": "setRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "resolver",
				"type": "address"
			}
		],
		"name": "setResolver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "label",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "setSubnodeOwner",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "label",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "resolver",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "ttl",
				"type": "uint64"
			}
		],
		"name": "setSubnodeRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "uint64",
				"name": "ttl",
				"type": "uint64"
			}
		],
		"name": "setTTL",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "recordExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "resolver",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "ttl",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const ensRegistryByte = "6080604052348015600f57600080fd5b50336000808060001b815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061123d806100766000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80635b0fc9c3116100715780635b0fc9c3146101b15780635ef2c7f0146101cd578063a22cb465146101e9578063cf40882314610205578063e985e9c514610221578063f79fe53814610251576100b4565b80630178b8bf146100b957806302571be3146100e957806306ab59231461011957806314ab90381461014957806316a25cbd146101655780631896f70a14610195575b600080fd5b6100d360048036038101906100ce9190610dda565b610281565b6040516100e09190610e48565b60405180910390f35b61010360048036038101906100fe9190610dda565b6102c0565b6040516101109190610e48565b60405180910390f35b610133600480360381019061012e9190610e8f565b610342565b6040516101409190610ef1565b60405180910390f35b610163600480360381019061015e9190610f4c565b6104c5565b005b61017f600480360381019061017a9190610dda565b610643565b60405161018c9190610f9b565b60405180910390f35b6101af60048036038101906101aa9190610fb6565b610676565b005b6101cb60048036038101906101c69190610fb6565b61080c565b005b6101e760048036038101906101e29190610ff6565b610958565b005b61020360048036038101906101fe91906110a9565b61097a565b005b61021f600480360381019061021a91906110e9565b610a77565b005b61023b60048036038101906102369190611150565b610a92565b604051610248919061119f565b60405180910390f35b61026b60048036038101906102669190610dda565b610b26565b604051610278919061119f565b60405180910390f35b600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361033857600091505061033d565b809150505b919050565b600083600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148061043f5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61044857600080fd5b6000868660405160200161045d9291906111db565b60405160208183030381529060405280519060200120905061047f8186610b94565b85877fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e82876040516104b09190610e48565b60405180910390a38093505050509392505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806105c05750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6105c957600080fd5b837f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa68846040516105f99190610f9b565b60405180910390a28260008086815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050505050565b600080600083815260200190815260200160002060010160149054906101000a900467ffffffffffffffff169050919050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806107715750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61077a57600080fd5b837f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a0846040516107aa9190610e48565b60405180910390a28260008086815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806109075750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61091057600080fd5b61091a8484610b94565b837fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d2668460405161094a9190610e48565b60405180910390a250505050565b6000610965868686610342565b9050610972818484610bec565b505050505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610a6b919061119f565b60405180910390a35050565b610a81848461080c565b610a8c848383610bec565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff1660008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b8060008084815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610ce1578160008085815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a083604051610cd89190610e48565b60405180910390a25b60008084815260200190815260200160002060010160149054906101000a900467ffffffffffffffff1667ffffffffffffffff168167ffffffffffffffff1614610d9a578060008085815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550827f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6882604051610d919190610f9b565b60405180910390a25b505050565b600080fd5b6000819050919050565b610db781610da4565b8114610dc257600080fd5b50565b600081359050610dd481610dae565b92915050565b600060208284031215610df057610def610d9f565b5b6000610dfe84828501610dc5565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e3282610e07565b9050919050565b610e4281610e27565b82525050565b6000602082019050610e5d6000830184610e39565b92915050565b610e6c81610e27565b8114610e7757600080fd5b50565b600081359050610e8981610e63565b92915050565b600080600060608486031215610ea857610ea7610d9f565b5b6000610eb686828701610dc5565b9350506020610ec786828701610dc5565b9250506040610ed886828701610e7a565b9150509250925092565b610eeb81610da4565b82525050565b6000602082019050610f066000830184610ee2565b92915050565b600067ffffffffffffffff82169050919050565b610f2981610f0c565b8114610f3457600080fd5b50565b600081359050610f4681610f20565b92915050565b60008060408385031215610f6357610f62610d9f565b5b6000610f7185828601610dc5565b9250506020610f8285828601610f37565b9150509250929050565b610f9581610f0c565b82525050565b6000602082019050610fb06000830184610f8c565b92915050565b60008060408385031215610fcd57610fcc610d9f565b5b6000610fdb85828601610dc5565b9250506020610fec85828601610e7a565b9150509250929050565b600080600080600060a0868803121561101257611011610d9f565b5b600061102088828901610dc5565b955050602061103188828901610dc5565b945050604061104288828901610e7a565b935050606061105388828901610e7a565b925050608061106488828901610f37565b9150509295509295909350565b60008115159050919050565b61108681611071565b811461109157600080fd5b50565b6000813590506110a38161107d565b92915050565b600080604083850312156110c0576110bf610d9f565b5b60006110ce85828601610e7a565b92505060206110df85828601611094565b9150509250929050565b6000806000806080858703121561110357611102610d9f565b5b600061111187828801610dc5565b945050602061112287828801610e7a565b935050604061113387828801610e7a565b925050606061114487828801610f37565b91505092959194509250565b6000806040838503121561116757611166610d9f565b5b600061117585828601610e7a565b925050602061118685828601610e7a565b9150509250929050565b61119981611071565b82525050565b60006020820190506111b46000830184611190565b92915050565b6000819050919050565b6111d56111d082610da4565b6111ba565b82525050565b60006111e782856111c4565b6020820191506111f782846111c4565b602082019150819050939250505056fea26469706673582212209e1bfc6bc55005f1401ec6aef1333320890d232bc1dc47ef73c5a65626b844d264736f6c63430008190033"
const resolverAbi = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "clearRecords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "setAddr",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ensRegistry",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "newVersion",
				"type": "uint64"
			}
		],
		"name": "VersionChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "addr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "addresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "recordVersions",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceID",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const resolverByte = "6080604052348015600f57600080fd5b506040516108b03803806108b08339818101604052810190602f91906090565b5060b8565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006062826039565b9050919050565b6070816059565b8114607a57600080fd5b50565b600081519050608a816069565b92915050565b60006020828403121560a35760a26034565b5b600060af84828501607d565b91505092915050565b6107e9806100c76000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806301ffc9a7146100675780633603d758146100975780633b3b57de146100b3578063699f200f146100e3578063d5fa2b0014610113578063d700ff331461012f575b600080fd5b610081600480360381019061007c919061050b565b61015f565b60405161008e9190610553565b60405180910390f35b6100b160048036038101906100ac91906105a4565b6101d9565b005b6100cd60048036038101906100c891906105a4565b6102ab565b6040516100da9190610612565b60405180910390f35b6100fd60048036038101906100f891906105a4565b6102e8565b60405161010a9190610612565b60405180910390f35b61012d60048036038101906101289190610659565b61031b565b005b610149600480360381019061014491906105a4565b610371565b60405161015691906106bc565b60405180910390f35b60007fd700ff33000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806101d257506101d182610398565b5b9050919050565b806101e381610402565b6101ec57600080fd5b600080838152602001908152602001600020600081819054906101000a900467ffffffffffffffff168092919061022290610706565b91906101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050817fc6621ccb8f3f5a04bb6502154b2caf6adf5983fe76dfef1cfc9c42e3579db44460008085815260200190815260200160002060009054906101000a900467ffffffffffffffff1660405161029f91906106bc565b60405180910390a25050565b60006001600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b806001600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60006020528060005260406000206000915054906101000a900467ffffffffffffffff1681565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60003373ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049c90610793565b60405180910390fd5b60019050919050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6104e8816104b3565b81146104f357600080fd5b50565b600081359050610505816104df565b92915050565b600060208284031215610521576105206104ae565b5b600061052f848285016104f6565b91505092915050565b60008115159050919050565b61054d81610538565b82525050565b60006020820190506105686000830184610544565b92915050565b6000819050919050565b6105818161056e565b811461058c57600080fd5b50565b60008135905061059e81610578565b92915050565b6000602082840312156105ba576105b96104ae565b5b60006105c88482850161058f565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105fc826105d1565b9050919050565b61060c816105f1565b82525050565b60006020820190506106276000830184610603565b92915050565b610636816105f1565b811461064157600080fd5b50565b6000813590506106538161062d565b92915050565b600080604083850312156106705761066f6104ae565b5b600061067e8582860161058f565b925050602061068f85828601610644565b9150509250929050565b600067ffffffffffffffff82169050919050565b6106b681610699565b82525050565b60006020820190506106d160008301846106ad565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061071182610699565b915067ffffffffffffffff820361072b5761072a6106d7565b5b600182019050919050565b600082825260208201905092915050565b7f756e617574686f72697365642072657175657374000000000000000000000000600082015250565b600061077d601483610736565b915061078882610747565b602082019050919050565b600060208201905081810360008301526107ac81610770565b905091905056fea264697066735822122080eacef4e0e795c562c47feab98c49110cd60cc4024709dda682b2fe5f34918c64736f6c63430008190033"
const registrarAbi = [
	{
		"inputs": [
			{
				"internalType": "contract ENS",
				"name": "ensAddr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ens",
		"outputs": [
			{
				"internalType": "contract ENS",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "expiryTimes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "label",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ttl",
				"type": "uint256"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rootNode",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const registrarByte = "60c060405234801561001057600080fd5b5060405161070f38038061070f83398181016040528101906100329190610120565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508060a081815250505050610160565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a58261007a565b9050919050565b60006100b78261009a565b9050919050565b6100c7816100ac565b81146100d257600080fd5b50565b6000815190506100e4816100be565b92915050565b6000819050919050565b6100fd816100ea565b811461010857600080fd5b50565b60008151905061011a816100f4565b92915050565b6000806040838503121561013757610136610075565b5b6000610145858286016100d5565b92505060206101568582860161010b565b9150509250929050565b60805160a05161057d6101926000396000818161017b015261021d01526000818160db015261013f015261057d6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633f15457f14610051578063a5b0d68c1461006f578063af9f26e41461008b578063faff50a8146100bb575b600080fd5b6100596100d9565b60405161006691906102be565b60405180910390f35b61008960048036038101906100849190610388565b6100fd565b005b6100a560048036038101906100a091906103db565b610203565b6040516100b29190610417565b60405180910390f35b6100c361021b565b6040516100d09190610441565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b42600080858152602001908152602001600020541061011b57600080fd5b8042610127919061048b565b600080858152602001908152602001600020819055507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166306ab59237f000000000000000000000000000000000000000000000000000000000000000085856040518463ffffffff1660e01b81526004016101ba939291906104ce565b6020604051808303816000875af11580156101d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101fd919061051a565b50505050565b60006020528060005260406000206000915090505481565b7f000000000000000000000000000000000000000000000000000000000000000081565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061028461027f61027a8461023f565b61025f565b61023f565b9050919050565b600061029682610269565b9050919050565b60006102a88261028b565b9050919050565b6102b88161029d565b82525050565b60006020820190506102d360008301846102af565b92915050565b600080fd5b6000819050919050565b6102f1816102de565b81146102fc57600080fd5b50565b60008135905061030e816102e8565b92915050565b600061031f8261023f565b9050919050565b61032f81610314565b811461033a57600080fd5b50565b60008135905061034c81610326565b92915050565b6000819050919050565b61036581610352565b811461037057600080fd5b50565b6000813590506103828161035c565b92915050565b6000806000606084860312156103a1576103a06102d9565b5b60006103af868287016102ff565b93505060206103c08682870161033d565b92505060406103d186828701610373565b9150509250925092565b6000602082840312156103f1576103f06102d9565b5b60006103ff848285016102ff565b91505092915050565b61041181610352565b82525050565b600060208201905061042c6000830184610408565b92915050565b61043b816102de565b82525050565b60006020820190506104566000830184610432565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061049682610352565b91506104a183610352565b92508282019050808211156104b9576104b861045c565b5b92915050565b6104c881610314565b82525050565b60006060820190506104e36000830186610432565b6104f06020830185610432565b6104fd60408301846104bf565b949350505050565b600081519050610514816102e8565b92915050565b6000602082840312156105305761052f6102d9565b5b600061053e84828501610505565b9150509291505056fea2646970667358221220866c0846d20d7a561de1cb2392abc35dd7439ee35e47ea710149242c4ea3423464736f6c63430008190033"

module.exports = {ensRegistryAbi, ensRegistryByte, registrarAbi, registrarByte}