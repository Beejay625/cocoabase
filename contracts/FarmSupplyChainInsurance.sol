// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainInsurance
 * @dev Onchain supply chain risk insurance
 */
contract FarmSupplyChainInsurance is Ownable {
    struct Policy {
        uint256 policyId;
        address insured;
        string productType;
        uint256 shipmentValue;
        uint256 coverageAmount;
        uint256 premium;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
    }

    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public policiesByInsured;
    uint256 private _policyIdCounter;

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed insured,
        string productType,
        uint256 shipmentValue
    );

    event ClaimFiled(
        uint256 indexed policyId,
        address indexed insured,
        string riskType,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createPolicy(
        string memory productType,
        uint256 shipmentValue,
        uint256 coverageAmount,
        uint256 duration
    ) public payable returns (uint256) {
        require(shipmentValue > 0, "Shipment value must be greater than 0");
        require(coverageAmount > 0, "Coverage amount must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 policyId = _policyIdCounter++;
        policies[policyId] = Policy({
            policyId: policyId,
            insured: msg.sender,
            productType: productType,
            shipmentValue: shipmentValue,
            coverageAmount: coverageAmount,
            premium: msg.value,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true
        });

        policiesByInsured[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, productType, shipmentValue);
        return policyId;
    }

    function fileClaim(uint256 policyId, string memory riskType) public {
        require(policies[policyId].insured == msg.sender, "Not policy owner");
        require(policies[policyId].isActive, "Policy not active");

        policies[policyId].isActive = false;
        uint256 payoutAmount = policies[policyId].coverageAmount;
        payable(msg.sender).transfer(payoutAmount);

        emit ClaimFiled(policyId, msg.sender, riskType, payoutAmount);
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }
}

