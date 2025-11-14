// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmHarvestFutures
 * @dev Onchain futures contracts for harvest yields
 */
contract FarmHarvestFutures is Ownable {
    struct FuturesContract {
        uint256 contractId;
        uint256 plantationId;
        address farmer;
        address buyer;
        uint256 expectedYield;
        uint256 pricePerUnit;
        uint256 deliveryDate;
        bool delivered;
        bool settled;
    }

    mapping(uint256 => FuturesContract) public futuresContracts;
    mapping(address => uint256[]) public contractsByFarmer;
    mapping(address => uint256[]) public contractsByBuyer;
    uint256 private _contractIdCounter;

    event FuturesContractCreated(
        uint256 indexed contractId,
        address indexed farmer,
        address indexed buyer,
        uint256 expectedYield
    );

    event ContractDelivered(uint256 indexed contractId, uint256 actualYield);
    event ContractSettled(uint256 indexed contractId, uint256 settlementAmount);

    constructor() Ownable(msg.sender) {}

    function createFuturesContract(
        uint256 plantationId,
        address buyer,
        uint256 expectedYield,
        uint256 pricePerUnit,
        uint256 deliveryDate
    ) public returns (uint256) {
        uint256 contractId = _contractIdCounter++;
        futuresContracts[contractId] = FuturesContract({
            contractId: contractId,
            plantationId: plantationId,
            farmer: msg.sender,
            buyer: buyer,
            expectedYield: expectedYield,
            pricePerUnit: pricePerUnit,
            deliveryDate: deliveryDate,
            delivered: false,
            settled: false
        });

        contractsByFarmer[msg.sender].push(contractId);
        contractsByBuyer[buyer].push(contractId);

        emit FuturesContractCreated(contractId, msg.sender, buyer, expectedYield);
        return contractId;
    }

    function deliverHarvest(uint256 contractId, uint256 actualYield) public {
        require(futuresContracts[contractId].farmer == msg.sender, "Not the farmer");
        require(!futuresContracts[contractId].delivered, "Already delivered");
        require(block.timestamp >= futuresContracts[contractId].deliveryDate, "Delivery date not reached");

        futuresContracts[contractId].delivered = true;

        emit ContractDelivered(contractId, actualYield);
    }

    function settleContract(uint256 contractId, uint256 actualYield) public payable {
        require(futuresContracts[contractId].buyer == msg.sender, "Not the buyer");
        require(futuresContracts[contractId].delivered, "Not delivered");
        require(!futuresContracts[contractId].settled, "Already settled");

        uint256 settlementAmount = actualYield * futuresContracts[contractId].pricePerUnit;
        require(msg.value >= settlementAmount, "Insufficient payment");

        futuresContracts[contractId].settled = true;

        payable(futuresContracts[contractId].farmer).transfer(msg.value);

        emit ContractSettled(contractId, settlementAmount);
    }

    function getContract(uint256 contractId) public view returns (FuturesContract memory) {
        return futuresContracts[contractId];
    }
}

