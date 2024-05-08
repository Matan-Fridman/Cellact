pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IPalo {
    function transferFromUser(address, address, uint256) external;
    function balanceOf(address) external view returns(uint);
}

contract KermisMachine{
    event transferRequest(uint amount, uint tokenId);
    IPalo tokensContract;
    constructor(IPalo tokensContractAddress){
        tokensContract = tokensContractAddress;
    }

    function transferEuros(address providerWallet, uint amount, uint providerTokenId) external {
        require(tokensContract.balanceOf(providerWallet) >= amount, "not enough funds for transfer");

        tokensContract.transferFromUser(providerWallet, address(this), amount);
        
        emit transferRequest(amount, providerTokenId);
    }
}