// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropYieldOptimization
 * @dev Optimize crop yields through data-driven recommendations
 */
contract FarmCropYieldOptimization is Ownable {
    struct OptimizationPlan {
        uint256 planId;
        uint256 plantationId;
        string cropType;
        uint256 targetYield;
        uint256 currentYield;
        string[] recommendations;
        uint256 implementationDate;
        address owner;
        bool active;
    }

    struct YieldImprovement {
        uint256 improvementId;
        uint256 planId;
        uint256 beforeYield;
        uint256 afterYield;
        uint256 improvementPercentage;
        address implementer;
        uint256 recordedAt;
    }

    mapping(uint256 => OptimizationPlan) public optimizationPlans;
    mapping(uint256 => YieldImprovement) public yieldImprovements;
    mapping(address => uint256[]) public plansByOwner;
    uint256 private _planIdCounter;
    uint256 private _improvementIdCounter;

    event OptimizationPlanCreated(
        uint256 indexed planId,
        address indexed owner,
        uint256 plantationId
    );

    event YieldImproved(
        uint256 indexed improvementId,
        uint256 indexed planId,
        uint256 improvementPercentage
    );

    constructor() Ownable(msg.sender) {}

    function createOptimizationPlan(
        uint256 plantationId,
        string memory cropType,
        uint256 targetYield,
        uint256 currentYield,
        string[] memory recommendations
    ) public returns (uint256) {
        uint256 planId = _planIdCounter++;
        optimizationPlans[planId] = OptimizationPlan({
            planId: planId,
            plantationId: plantationId,
            cropType: cropType,
            targetYield: targetYield,
            currentYield: currentYield,
            recommendations: recommendations,
            implementationDate: block.timestamp,
            owner: msg.sender,
            active: true
        });

        plansByOwner[msg.sender].push(planId);

        emit OptimizationPlanCreated(planId, msg.sender, plantationId);
        return planId;
    }

    function recordYieldImprovement(
        uint256 planId,
        uint256 afterYield
    ) public returns (uint256) {
        require(optimizationPlans[planId].owner == msg.sender, "Not owner");
        uint256 beforeYield = optimizationPlans[planId].currentYield;
        uint256 improvementPercentage = ((afterYield - beforeYield) * 100) / beforeYield;
        
        uint256 improvementId = _improvementIdCounter++;
        yieldImprovements[improvementId] = YieldImprovement({
            improvementId: improvementId,
            planId: planId,
            beforeYield: beforeYield,
            afterYield: afterYield,
            improvementPercentage: improvementPercentage,
            implementer: msg.sender,
            recordedAt: block.timestamp
        });

        optimizationPlans[planId].currentYield = afterYield;

        emit YieldImproved(improvementId, planId, improvementPercentage);
        return improvementId;
    }

    function getOptimizationPlan(uint256 planId) public view returns (OptimizationPlan memory) {
        return optimizationPlans[planId];
    }

    function getPlansByOwner(address owner) public view returns (uint256[] memory) {
        return plansByOwner[owner];
    }
}

