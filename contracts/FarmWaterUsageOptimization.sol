// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterUsageOptimization
 * @dev Water usage optimization recommendations and tracking
 */
contract FarmWaterUsageOptimization is Ownable {
    struct OptimizationPlan {
        uint256 planId;
        address farmer;
        string fieldId;
        uint256 currentUsage;
        uint256 targetUsage;
        uint256 potentialSavings;
        uint256 planDate;
    }

    mapping(uint256 => OptimizationPlan) public plans;
    uint256 private _planIdCounter;

    event PlanCreated(
        uint256 indexed planId,
        address indexed farmer,
        uint256 potentialSavings
    );

    constructor() Ownable(msg.sender) {}

    function createPlan(
        string memory fieldId,
        uint256 currentUsage,
        uint256 targetUsage
    ) public returns (uint256) {
        require(targetUsage < currentUsage, "Invalid target");
        uint256 potentialSavings = currentUsage - targetUsage;
        uint256 planId = _planIdCounter++;
        plans[planId] = OptimizationPlan({
            planId: planId,
            farmer: msg.sender,
            fieldId: fieldId,
            currentUsage: currentUsage,
            targetUsage: targetUsage,
            potentialSavings: potentialSavings,
            planDate: block.timestamp
        });

        emit PlanCreated(planId, msg.sender, potentialSavings);
        return planId;
    }

    function getPlan(uint256 planId) public view returns (OptimizationPlan memory) {
        return plans[planId];
    }
}