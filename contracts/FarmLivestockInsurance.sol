// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockInsurance
 * @dev Onchain livestock insurance with mortality and health coverage
 */
contract FarmLivestockInsurance is Ownable {
    struct Policy {
        uint256 policyId;
        address farmer;
        string livestockType;
        uint256 livestockCount;
        uint256 coveragePerHead;
        uint256 totalCoverage;
        uint256 premium;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
    }

    struct Claim {
        uint256 claimId;
        uint256 policyId;
        uint256 livestockLost;
        uint256 payoutAmount;
        uint256 claimDate;
        bool approved;
    }

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public policiesByFarmer;
    uint256 private _policyIdCounter;
    uint256 private _claimIdCounter;

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed farmer,
        string livestockType,
        uint256 totalCoverage
    );

    event ClaimSubmitted(
        uint256 indexed claimId,
        uint256 indexed policyId,
        uint256 livestockLost
    );

    constructor() Ownable(msg.sender) {}

    function createPolicy(
        string memory livestockType,
        uint256 livestockCount,
        uint256 coveragePerHead,
        uint256 duration
    ) public payable returns (uint256) {
        require(livestockCount > 0, "Livestock count must be greater than 0");
        require(coveragePerHead > 0, "Coverage per head must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 policyId = _policyIdCounter++;
        uint256 totalCoverage = livestockCount * coveragePerHead;

        policies[policyId] = Policy({
            policyId: policyId,
            farmer: msg.sender,
            livestockType: livestockType,
            livestockCount: livestockCount,
            coveragePerHead: coveragePerHead,
            totalCoverage: totalCoverage,
            premium: msg.value,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true
        });

        policiesByFarmer[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, livestockType, totalCoverage);
        return policyId;
    }

    function submitClaim(uint256 policyId, uint256 livestockLost) public returns (uint256) {
        require(policies[policyId].farmer == msg.sender, "Not policy owner");
        require(policies[policyId].isActive, "Policy not active");
        require(livestockLost > 0, "Must report livestock lost");
        require(livestockLost <= policies[policyId].livestockCount, "Exceeds insured count");

        uint256 claimId = _claimIdCounter++;
        uint256 payoutAmount = livestockLost * policies[policyId].coveragePerHead;

        claims[claimId] = Claim({
            claimId: claimId,
            policyId: policyId,
            livestockLost: livestockLost,
            payoutAmount: payoutAmount,
            claimDate: block.timestamp,
            approved: false
        });

        emit ClaimSubmitted(claimId, policyId, livestockLost);
        return claimId;
    }

    function approveClaim(uint256 claimId) public onlyOwner {
        require(!claims[claimId].approved, "Claim already approved");
        Policy memory policy = policies[claims[claimId].policyId];
        
        claims[claimId].approved = true;
        payable(policy.farmer).transfer(claims[claimId].payoutAmount);
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }

    function getClaim(uint256 claimId) public view returns (Claim memory) {
        return claims[claimId];
    }
}

