// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./stripeSubscription.sol";
import "./products.sol";
import "./interfaces.sol";

20, 0x1BdA40cc2F4967F594238b837C6adA89962C5B88, 0x7b052B26fB5d8C15687AF2B93CE47cE3e2600D98, 0x3542Cbdd6c0948A0f4f82F2a1ECb33FA4f55f242, 0x66C0Df10e1737c8bE573390b7e7449DE939A9439, 0xc042F10f20a23d1E90f54C6B81032e62087cef23, 0x65667FD7a2C7Dc8d5fA9CE2CB7C4769487AbC8AD, 0x27753Ca046fB273B2FEC0bccfE8c6ECa4C873C07, provider1, https://bafkreias2zi5f6mcdlwhvgrgc56x5s4igwwsgcb6pwfjwptron6pgyouc4.ipfs.nftstorage.link/
contract serviceProvider { 

    // New contracts that will be deployed for every service provider
    Products              productsContract;
    stripeSubscription    subscriptionContract;

    // Existing contract that upon creation- need to be specified
    IMetadata           MetadataContract;
    IServiceProviders   SPSContracts;
    IENS                EnsContract;
    IAyala              ayalaContract;
    IKermis             kermisContract;


    uint    public INDEX_OF_METADATA;
    string  public SERVICE_PROVIDER_ENS;

    event showAddress(
        address subscriptionContract
    );
    constructor(
        uint32              _levels,
        IHasher             _hasher,
        IVerifier           _verifier,
        IMetadata           _metadataContract,
        IServiceProviders   _spsContract,
        IPalo               _fundsContract,
        IAyala              _ayalaContract,
        IKermis             _kermisContract,
        string memory       _serviceProviderENS, 
        string memory       _metaData
    ) payable {
        
        _spsContract.safeMint{
            value: msg.value / 2
        }(
            _serviceProviderENS, 
            msg.sender
        );


        INDEX_OF_METADATA = _metadataContract.safeMint{
            value: msg.value / 2
        }(
            msg.sender,
            _metaData
        ); 

        SERVICE_PROVIDER_ENS =  _serviceProviderENS;
        SPSContracts         =  _spsContract;
        MetadataContract     =  _metadataContract;
        ayalaContract        =  _ayalaContract;
        kermisContract       = _kermisContract;

        productsContract     =  new Products        (
                                                        _metadataContract
                                                    );

        subscriptionContract =  new stripeSubscription  ( 
                                                        _levels, 
                                                        _hasher,
                                                        _verifier,
                                                        _fundsContract,
                                                        productsContract
                                                        );
        emit showAddress(address(subscriptionContract));
    }

    function requestPayout() public{

        uint amount = 50;//calculateMoneyToBePaid(); // logic for calculating
        kermisContract.transferEuros(msg.sender, amount, INDEX_OF_METADATA);
    }

    function getServiceProviderTokenId()public view returns(uint){
        return INDEX_OF_METADATA;
    }

    function getServiceProviderMetadata(
    ) public view returns(string memory) {

        return MetadataContract.tokenURI (
                                            INDEX_OF_METADATA
                                         );
    }   

    function addProduct(
        uint _setupFee, 
        uint _monthlyFee, 
        string memory _metaData
    ) public payable{

        productsContract._addProduct(
                                        _setupFee,
                                        _monthlyFee,
                                        _metaData,
                                        msg.sender
                                    );
    }

    function getProductMetaData(
        uint256 _productID
    ) public  view returns(string memory){

        return productsContract._getProductMetaData(_productID);
    }

    function createSubscription(
        uint256 _commitmentDeposit,
        uint    _productID
    ) external {

        subscriptionContract._createSubscription(
                                                    bytes32(_commitmentDeposit),
                                                    _productID
                                                );
    }

    function startSubscription(
        uint[2] memory _proof_a,
        uint[2][2] memory _proof_b,
        uint[2] memory _proof_c,
        uint256 _nullifierHash,
        uint256 _root,
        string memory ens
    ) external{

            return subscriptionContract._startSubscription  (
                                                                _proof_a,
                                                                _proof_b,
                                                                _proof_c,
                                                                bytes32(_nullifierHash),
                                                                bytes32(_root),
                                                                ens
                                                            ); 
    }

    function extendSubscription(
        uint[2] memory _proof_a,
        uint[2][2] memory _proof_b,
        uint[2] memory _proof_c,
        uint256 _nullifierHash,
        uint256 _root,
        uint256 _productID
    ) external{

            return subscriptionContract._extendSubscription  (
                                                                _proof_a,
                                                                _proof_b,
                                                                _proof_c,
                                                                bytes32(_nullifierHash),
                                                                bytes32(_root),
                                                                _productID
                                                            ); 
    }

    function updateNewServiceProvider(
        // bytes   memory _signature, 
        // string  memory _messageSigned, 
        string  memory _ENS // ENS
    ) external{

            // return ayalaContract.updateUserRegistery ( 
            //                                             _signature, 
            //                                             _messageSigned, 
            //                                             _ENS
            //                                         );
            return ayalaContract.updateUser ( 
                                                _ENS    
                                            );
    }


    // returns if the user is valid
    function isUserValid(
        string memory ens
    ) external view returns(bool){
            // return subscriptionContract.isUserValid(
            //                                         ens
            //                                         );
            return true;                                        
    }

}

//Private blockchain
// 20, 0x1BdA40cc2F4967F594238b837C6adA89962C5B88, 0x7b052B26fB5d8C15687AF2B93CE47cE3e2600D98, 0x5c5348FbA2928D99fd8f8314185C1940Da9bE620, 0x8fe9dFe0C3B69E9676431F5367740C677759899d, 0x9C7eDaB386fCc99b00B633B2C730C731ECAf873A, 0x275d34dAa8708F9e74e7b452DE7DE9029dCeb7F7, kaksjdlaskdxc, k21n3lmsdlsd
// 20, 0x1BdA40cc2F4967F594238b837C6adA89962C5B88, 0x7b052B26fB5d8C15687AF2B93CE47cE3e2600D98, 0x5c5348FbA2928D99fd8f8314185C1940Da9bE620, 0x8fe9dFe0C3B69E9676431F5367740C677759899d, 0x9C7eDaB386fCc99b00B633B2C730C731ECAf873A, 0x3a5089B23d88ABE0161B1C5720643bFa391d27a9, 0xd85d3B2b9704AD0A77ad831e7b02F3511f0dBba6, kaksjdlaskdxc, k21n3lmsdlsd

// Amoy
// 20, 0x3542Cbdd6c0948A0f4f82F2a1ECb33FA4f55f242, 0xd3cD7Ca9f22a5E3E6F51E431893d0b9aBDc80B63, 0xC33F9Fde961459512a72C89C03091511eE6B3AF7, 0x3c1BBc1c46A6911cf683C4aCfB14e490F18e3288, 0x2bBda811Ca83237759fbEE586Ca86990bfe37277, 0xd15A48869405107177A5cf749B755b964b113c1e


// Mumbai
// 20,0xfCb643f284A5dC8ae58Ce8670e56E18918702984,0x9579abeF517247d57527ED3E0aE24505c779Ab9b,0xD0064dE44E4eFaf2777fD67648bdDa825E17A5D3,0x60925e97d321F358a7F6565EE2591037c71fA555,0x637F531794F69dA60952ecEBad039BEc60292B07,0xBaa107d8707966589254aDA3774c86a984958A3F, skdlfxcvsdfj34hjk,ajskdhad
// 0xfCb643f284A5dC8ae58Ce8670e56E18918702984
// 0x9579abeF517247d57527ED3E0aE24505c779Ab9b
// 0xD0064dE44E4eFaf2777fD67648bdDa825E17A5D3
// 0x60925e97d321F358a7F6565EE2591037c71fA555
// 0x637F531794F69dA60952ecEBad039BEc60292B07
// 0xBaa107d8707966589254aDA3774c86a984958A3F



// 3802418345810410421361026013629291548761387186794049078479540485864534212457
// ["0x21efad579fcbe506683f2b1b661e15b7f6ee63d4fa5df2503b571b8197a2a3a0", "0x144acdadab53ce40d217831bdc3e1d7121f5af42d6339bbc59002d4a894ee5e3"],[["0x2d681ea8c4183f320561bdbb682450e97a95b4eb809983886d7cd46f9ff9a65b", "0x2afd0d031c4f82ca4682d0a901fc73f68be78dbd83be64c24c941236fb0dc77e"],["0x17ffdcc660c77b5e4e32755da5d4df207ee971fa56df051e4698b8c8fac8028c", "0x2c8e738f16381b6c85352ba6a346aa492b2efe70d8644aec6450ad4405aa55b9"]],["0x159bc36c8b751c822c2cd4799a0480df6b60c3c705e6c8895c8a119abcfedef2", "0x2b5d887924f335a73485d8fe49cc62fbe11a63d21ea8239d6e4584e3a82ad741"],0x118ccafe60e13d97634c6d861ea6615808a50f8301d31b5791b5ea214d41cc39 , 0x17fc6d9113bd61693b909c3cd390ab8c1e772ec7368e4ab6afc877a083fd2822 ,0x2d4ac4b81d688b8db5a728752643642745f33b9ea648b1cb6df36f2b636803d3

// create - 0x47592e8f988Eb4e291542e154734E7dc8e2b051f (contract)
// start - 0x9e1611a42DA718FB14eCdE3fE6eba3Bb5B97F77B ( service Provider)
// end - 0xe7660e821AD8F5ddc7FBB1c702C223cF934e2d23 ( user )