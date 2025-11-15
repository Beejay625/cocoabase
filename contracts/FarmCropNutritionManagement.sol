// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropNutritionManagement
 * @dev Manage crop nutrition and fertilizer applications
 */
contract FarmCropNutritionManagement is Ownable {
    struct NutritionPlan {
        uint256 planId;
        uint256 plantationId;
        string cropType;
        uint256 nitrogenLevel;
        uint256 phosphorusLevel;
        uint256 potassiumLevel;
        uint256[] micronutrients;
        uint256 applicationDate;
        address owner;
    }

    struct NutritionResult {
        uint256 resultId;
        uint256 planId;
        uint256 growthImprovement;
        uint256 yieldIncrease;
        uint256 healthScore;
        address evaluator;
        uint256 evaluatedAt;
    }

    mapping(uint256 => NutritionPlan) public nutritionPlans;
    mapping(uint256 => NutritionResult) public nutritionResults;
    mapping(address => uint256[]) public plansByOwner;
    uint256 private _planIdCounter;
    uint256 private _resultIdCounter;

    event NutritionPlanCreated(
        uint256 indexed planId,
        address indexed owner,
        uint256 plantationId
    );

    event NutritionResultRecorded(
        uint256 indexed resultId,
        uint256 indexed planId,
        uint256 yieldIncrease
    );

    constructor() Ownable(msg.sender) {}

    function createNutritionPlan(
        uint256 plantationId,
        string memory cropType,
        uint256 nitrogenLevel,
        uint256 phosphorusLevel,
        uint256 potassiumLevel,
        uint256[] memory micronutrients
    ) public returns (uint256) {
        uint256 planId = _planIdCounter++;
        nutritionPlans[planId] = NutritionPlan({
            planId: planId,
            plantationId: plantationId,
            cropType: cropType,
            nitrogenLevel: nitrogenLevel,
            phosphorusLevel: phosphorusLevel,
            potassiumLevel: potassiumLevel,
            micronutrients: micronutrients,
            applicationDate: block.timestamp,
            owner: msg.sender
        });

        plansByOwner[msg.sender].push(planId);

        emit NutritionPlanCreated(planId, msg.sender, plantationId);
        return planId;
    }

    function recordNutritionResult(
        uint256 planId,
        uint256 growthImprovement,
        uint256 yieldIncrease,
        uint256 healthScore
    ) public returns (uint256) {
        require(nutritionPlans[planId].owner == msg.sender, "Not owner");
        
        uint256 resultId = _resultIdCounter++;
        nutritionResults[resultId] = NutritionResult({
            resultId: resultId,
            planId: planId,
            growthImprovement: growthImprovement,
            yieldIncrease: yieldIncrease,
            healthScore: healthScore,
            evaluator: msg.sender,
            evaluatedAt: block.timestamp
        });

        emit NutritionResultRecorded(resultId, planId, yieldIncrease);
        return resultId;
    }

    function getNutritionPlan(uint256 planId) public view returns (NutritionPlan memory) {
        return nutritionPlans[planId];
    }

    function getPlansByOwner(address owner) public view returns (uint256[] memory) {
        return plansByOwner[owner];
    }
}


