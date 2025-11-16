// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropYieldOptimization
 * @dev Optimize yields through data-driven recommendations
 */
contract FarmCropYieldOptimization is Ownable {
    struct OptimizationPlan {
        uint256 planId;
        address farmer;
        string fieldId;
        string cropType;
        uint256 currentYield;
        uint256 targetYield;
        string[] recommendations;
        uint256 implementationDate;
    }

    mapping(uint256 => OptimizationPlan) public plans;
    mapping(address => uint256[]) public plansByFarmer;
    uint256 private _planIdCounter;

    event PlanCreated(
        uint256 indexed planId,
        address indexed farmer,
        uint256 targetYield
    );

    event PlanImplemented(
        uint256 indexed planId,
        uint256 implementationDate
    );

    constructor() Ownable(msg.sender) {}

    function createPlan(
        string memory fieldId,
        string memory cropType,
        uint256 currentYield,
        uint256 targetYield,
        string[] memory recommendations
    ) public returns (uint256) {
        uint256 planId = _planIdCounter++;
        plans[planId] = OptimizationPlan({
            planId: planId,
            farmer: msg.sender,
            fieldId: fieldId,
            cropType: cropType,
            currentYield: currentYield,
            targetYield: targetYield,
            recommendations: recommendations,
            implementationDate: 0
        });

        plansByFarmer[msg.sender].push(planId);
        emit PlanCreated(planId, msg.sender, targetYield);
        return planId;
    }

    function implementPlan(uint256 planId) public {
        require(plans[planId].farmer == msg.sender, "Not authorized");
        require(plans[planId].implementationDate == 0, "Already implemented");
        plans[planId].implementationDate = block.timestamp;
        emit PlanImplemented(planId, block.timestamp);
    }

    function getPlan(uint256 planId) public view returns (OptimizationPlan memory) {
        return plans[planId];
    }
}