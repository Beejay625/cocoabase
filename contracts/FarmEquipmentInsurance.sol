// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentInsurance
 * @dev Onchain equipment insurance with damage and theft coverage
 */
contract FarmEquipmentInsurance is Ownable {
    struct Policy {
        uint256 policyId;
        address farmer;
        string equipmentType;
        string equipmentId;
        uint256 coverageAmount;
        uint256 premium;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
    }

    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public policiesByFarmer;
    uint256 private _policyIdCounter;

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed farmer,
        string equipmentType,
        uint256 coverageAmount
    );

    event ClaimFiled(
        uint256 indexed policyId,
        address indexed farmer,
        string claimType,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createPolicy(
        string memory equipmentType,
        string memory equipmentId,
        uint256 coverageAmount,
        uint256 duration
    ) public payable returns (uint256) {
        require(coverageAmount > 0, "Coverage amount must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 policyId = _policyIdCounter++;
        policies[policyId] = Policy({
            policyId: policyId,
            farmer: msg.sender,
            equipmentType: equipmentType,
            equipmentId: equipmentId,
            coverageAmount: coverageAmount,
            premium: msg.value,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true
        });

        policiesByFarmer[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, equipmentType, coverageAmount);
        return policyId;
    }

    function fileClaim(uint256 policyId, string memory claimType) public {
        require(policies[policyId].farmer == msg.sender, "Not policy owner");
        require(policies[policyId].isActive, "Policy not active");

        policies[policyId].isActive = false;
        uint256 payoutAmount = policies[policyId].coverageAmount;
        payable(msg.sender).transfer(payoutAmount);

        emit ClaimFiled(policyId, msg.sender, claimType, payoutAmount);
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }

    function getPoliciesByFarmer(address farmer) public view returns (uint256[] memory) {
        return policiesByFarmer[farmer];
    }
}

