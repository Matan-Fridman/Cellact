// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Semaphore} from "./Semaphore.sol";
import {ISemaphoreVerifier} from "./ISemaphoreVerifier.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

struct ownedPackage {
    uint startTime;
    uint endTime;
    uint lastPaidMonth;
}

struct packageDetails {
    uint productId;
    uint packageGroupId;
    uint currentPackageIndex;
    mapping (string => uint) owners; // ens => packageId
    mapping (uint => ownedPackage) ownedPackages; // id => start time 
    uint monthsToBePaid;
    uint lastPaidIndex;
}

interface IPalo {
    function transferToContract(address, uint256) external;
    function directTransfer(address, uint) external;
}

interface IproductsContract {
    function setupFee(uint)external view returns (uint);
    function monthly(uint)external view returns (uint);
    function duration(uint)external view returns (uint);
}

contract SempahoreSubscription is Semaphore {
    uint productCounter = 2;
    mapping (uint256 => packageDetails) packages;
    mapping (uint256 => uint256) startingDates; //prodId => starting moment _ 10002 => timestamp
    mapping (uint256 => uint256) lastPaidDate; //prodId => last paid day _ 10002 => 243
    mapping (uint256 => uint256) lastFullyPaidDays; //prodId => last paid day _ 10002 => 243
    mapping (string => uint256) owners; // ens => productId. this way we can extract the days passed since subscription
    mapping (uint256 => uint) canceledSubscriptionAmounts;  // amount of subs canceled per full prod id;
    uint cancelNullifier;
    uint startNullifier;
    address providerAddress;

    IPalo fundsContract;
    IproductsContract productsContract;

    constructor(ISemaphoreVerifier _verifier, IPalo _fundsContract, address _providerAddress, IproductsContract _productsContract)Semaphore(_verifier){
        fundsContract = _fundsContract;
        providerAddress =_providerAddress;
        productsContract = _productsContract;
        for(uint i=1;i<=365*5;i++){
            uint productGroupId = 1000100000 + i;
            uint productId = 10001;
            _createGroup(productGroupId, address(this));
            startingDates[productId] = block.timestamp;
        }
    }
    // takes in just the groupId of the product so 10002
    function createSubscription(uint256 _commitment, uint256 productId) public returns (uint){
        // uint productId = getSlice(0, 5, Strings.toString(groupId)); // just prod id i.e 10002 is prodId 2
        uint setupFee = productsContract.setupFee(productId) * 10 ** 18;
        uint monthlyFee = productsContract.monthly(productId)* 10 ** 18 ;

        uint productFirstDay = startingDates[productId];
        uint daysPassed = (block.timestamp - productFirstDay) / 86400;    // days passed since product's day 1
        uint fullProductId = productId * 100000 + daysPassed; // go from 10002 to 1000200000 and add current day

        fundsContract.transferToContract(  // pay for first month in advance
            address(this),
            monthlyFee * 12 + setupFee
        );
        // if(getGroupAdmin(fullProductId)!= address(0x0)){
        //     _createGroup(fullProductId, providerAddress);
        // }
        _addMember(fullProductId, _commitment);
        return fullProductId;
    }

    function startSubscription(SemaphoreProof calldata proof, uint256 productId, string calldata ens)public{
        require(proof.scope == startNullifier, "nullifier not correct");

        uint productFirstDay = startingDates[productId];
        uint daysPassed = (block.timestamp - productFirstDay) / 86400;    // days passed since product's day 1
        uint fullProductId = productId * 100000 + daysPassed; // go from 10002 to 1000200000 and add current day
        
        validateProof(fullProductId, proof);

        uint totalFee = productsContract.monthly(productId) * productsContract.duration(productId);

        fundsContract.transferToContract(msg.sender, totalFee);

        // set ens mapping to package index
        owners[ens] = fullProductId;
    }

    function packageExists(uint productId, string calldata ens) public view returns(bool){
        uint fullProductId = owners[ens];
        uint dayOfStart = fullProductId - productId * 100000; // from 1000200345 to 345
        uint daysPassedSinceStart = (block.timestamp - startingDates[productId]) / 84600; // were on day 850 compared to start dates
        bool expired = daysPassedSinceStart - dayOfStart > 365; // were on 850 we started on 345, 850 - 345 is more than a 365

        if(expired){
            return false;
        }
        return true;
    }

    function createProduct()public{
        uint productId = 10000 + productCounter;    // 10003 prodId
        startingDates[productId] = block.timestamp;
        for(uint i=1;i<=365*5;i++){ // 5 years
            uint productGroupId = productId * 100000 + i;   // 1000300000 + 365 to add the days
            _createGroup(productGroupId, address(this));
        }
        productCounter++;
    }

    function withdrawFunds() public {
        uint amount = getAvailableFunds();
        fundsContract.directTransfer(providerAddress, amount);
    }

    function getAvailableFunds() public returns(uint total){

    }
    function viewAvailableFunds() public view returns(uint total){
        uint newestProductId = 10000 + productCounter;
        total = 0;
        for(uint prodId = 10001;prodId < newestProductId; prodId++){
            
        }
    }

    function getAvailableFundsForPackage(uint productId)public returns (uint){
        uint daysPassedSinceStart = (block.timestamp - startingDates[productId]) / 84600; // were on day 850 compared to start dates
        uint fullProductId = productId * 100000 + 1; //full prod id for first day
        uint months = 0;
        uint day = 1 + lastFullyPaidDays[productId];
        uint currentMonth = (daysPassedSinceStart - day) / 30;
        if(currentMonth > 12){
            currentMonth = 12;
        }
        // i.e while 1000200035 - 1000300000 = 35 is smaller than today keep checking,
        // if the groupId is after today we dont need to check
        while(day < daysPassedSinceStart){
            uint amountOfMonthsPaidLastTime = lastPaidDate[productId] - day / 30;
            if(amountOfMonthsPaidLastTime > 12){ // CHECK ROUNDING
                amountOfMonthsPaidLastTime = 12;
            }
            months += 
            (getMerkleTreeSize(fullProductId) - canceledSubscriptionAmounts[fullProductId])
            *
            (currentMonth - amountOfMonthsPaidLastTime);
            day ++;
            fullProductId ++;
            if(currentMonth >= 12 ){
                lastFullyPaidDays[productId] = day;
            }
            if((daysPassedSinceStart - day) / 30 < 12){ // CHECK ROUNDING
                currentMonth = (daysPassedSinceStart - day) / 30;
            }
        }
        lastPaidDate[productId] = daysPassedSinceStart;
    }

    function cancelSubscription(SemaphoreProof calldata proof, uint productId, string memory ens)public{
        require(proof.scope == cancelNullifier, "nullifier not correct");
        validateProof(productId, proof);
        uint refundAmount = calculateRefund(productId, ens);
        fundsContract.directTransfer(address(this), refundAmount);

        uint fullProductId = owners[ens];
        canceledSubscriptionAmounts[fullProductId] ++;
    }

    function calculateRefund(uint productId, string memory ens)public view returns(uint amount){
        uint fullProductId = owners[ens];
        uint daysPassed = fullProductId - productId * 100000; // 1000200034 - 1000200000 = 34 days have passed
        uint monthsOwed = 12 - daysPassed / 30;
        uint monthly = productsContract.monthly(productId);
        amount = monthly * monthsOwed;
    }

    function monthsToSeconds(uint256 months) public pure returns (uint256) {
        uint256 daysInMonth = 30; // Assuming 30 days in a month
        return months * daysInMonth * 84600;
    }

    function secondsToMonths(uint _seconds)public pure returns(uint){
        return _seconds / (30 * 84600);
    }

}