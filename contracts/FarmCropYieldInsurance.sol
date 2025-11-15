// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropYieldInsurance
 * @dev Onchain crop yield insurance with automated claims
 */
contract FarmCropYieldInsurance is Ownable {
    struct Policy {
        uint256 policyId;
        address farmer;
        string cropType;
        uint256 expectedYield;
        uint256 coverageAmount;
        uint256 premium;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        bool claimFiled;
    }

    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public policiesByFarmer;
    uint256 private _policyIdCounter;

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed farmer,
        string cropType,
        uint256 coverageAmount
    );

    event ClaimFiled(
        uint256 indexed policyId,
        address indexed farmer,
        uint256 actualYield,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createPolicy(
        string memory cropType,
        uint256 expectedYield,
        uint256 coverageAmount,
        uint256 duration
    ) public payable returns (uint256) {
        require(expectedYield > 0, "Expected yield must be greater than 0");
        require(coverageAmount > 0, "Coverage amount must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 policyId = _policyIdCounter++;
        policies[policyId] = Policy({
            policyId: policyId,
            farmer: msg.sender,
            cropType: cropType,
            expectedYield: expectedYield,
            coverageAmount: coverageAmount,
            premium: msg.value,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true,
            claimFiled: false
        });

        policiesByFarmer[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, cropType, coverageAmount);
        return policyId;
    }

    function fileClaim(uint256 policyId, uint256 actualYield) public {
        require(policies[policyId].farmer == msg.sender, "Not policy owner");
        require(policies[policyId].isActive, "Policy not active");
        require(!policies[policyId].claimFiled, "Claim already filed");
        require(block.timestamp >= policies[policyId].endDate, "Policy not expired");

        if (actualYield < policies[policyId].expectedYield) {
            uint256 shortfall = policies[policyId].expectedYield - actualYield;
            uint256 payoutAmount = (shortfall * policies[policyId].coverageAmount) / policies[policyId].expectedYield;
            
            policies[policyId].claimFiled = true;
            payable(msg.sender).transfer(payoutAmount);

            emit ClaimFiled(policyId, msg.sender, actualYield, payoutAmount);
        }
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }

    function getPoliciesByFarmer(address farmer) public view returns (uint256[] memory) {
        return policiesByFarmer[farmer];
    }
}

