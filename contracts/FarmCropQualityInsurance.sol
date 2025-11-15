// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropQualityInsurance
 * @dev Onchain quality-based crop insurance
 */
contract FarmCropQualityInsurance is Ownable {
    struct Policy {
        uint256 policyId;
        address farmer;
        string cropType;
        uint256 quantity;
        string qualityGrade;
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
        string cropType,
        string qualityGrade
    );

    event ClaimFiled(
        uint256 indexed policyId,
        address indexed farmer,
        string actualGrade,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createPolicy(
        string memory cropType,
        uint256 quantity,
        string memory qualityGrade,
        uint256 coverageAmount,
        uint256 duration
    ) public payable returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        require(coverageAmount > 0, "Coverage amount must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 policyId = _policyIdCounter++;
        policies[policyId] = Policy({
            policyId: policyId,
            farmer: msg.sender,
            cropType: cropType,
            quantity: quantity,
            qualityGrade: qualityGrade,
            coverageAmount: coverageAmount,
            premium: msg.value,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true
        });

        policiesByFarmer[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, cropType, qualityGrade);
        return policyId;
    }

    function fileClaim(uint256 policyId, string memory actualGrade) public {
        require(policies[policyId].farmer == msg.sender, "Not policy owner");
        require(policies[policyId].isActive, "Policy not active");
        require(block.timestamp >= policies[policyId].endDate, "Policy not expired");

        if (keccak256(bytes(actualGrade)) != keccak256(bytes(policies[policyId].qualityGrade))) {
            policies[policyId].isActive = false;
            uint256 payoutAmount = policies[policyId].coverageAmount;
            payable(msg.sender).transfer(payoutAmount);

            emit ClaimFiled(policyId, msg.sender, actualGrade, payoutAmount);
        }
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }
}

