// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropRotation
 * @dev Onchain crop rotation planning
 */
contract FarmCropRotation is Ownable {
    struct RotationPlan {
        uint256 planId;
        address farmer;
        uint256 fieldId;
        string currentCrop;
        string nextCrop;
        uint256 rotationDate;
        uint256 cycleLength;
        bool isActive;
        uint256 creationDate;
    }

    struct RotationHistory {
        uint256 historyId;
        uint256 planId;
        string crop;
        uint256 plantingDate;
        uint256 harvestDate;
        uint256 yield;
        bool isCompleted;
    }

    mapping(uint256 => RotationPlan) public rotationPlans;
    mapping(uint256 => RotationHistory[]) public rotationHistory;
    mapping(address => uint256[]) public plansByFarmer;
    uint256 private _planIdCounter;
    uint256 private _historyIdCounter;

    event RotationPlanCreated(
        uint256 indexed planId,
        address indexed farmer,
        uint256 indexed fieldId,
        string currentCrop,
        string nextCrop
    );

    event RotationExecuted(
        uint256 indexed planId,
        address indexed farmer,
        string crop,
        uint256 plantingDate
    );

    constructor() Ownable(msg.sender) {}

    function createRotationPlan(
        uint256 fieldId,
        string memory currentCrop,
        string memory nextCrop,
        uint256 rotationDate,
        uint256 cycleLength
    ) public returns (uint256) {
        require(rotationDate > block.timestamp, "Invalid rotation date");
        require(cycleLength > 0, "Cycle length must be greater than 0");

        uint256 planId = _planIdCounter++;
        rotationPlans[planId] = RotationPlan({
            planId: planId,
            farmer: msg.sender,
            fieldId: fieldId,
            currentCrop: currentCrop,
            nextCrop: nextCrop,
            rotationDate: rotationDate,
            cycleLength: cycleLength,
            isActive: true,
            creationDate: block.timestamp
        });

        plansByFarmer[msg.sender].push(planId);

        emit RotationPlanCreated(planId, msg.sender, fieldId, currentCrop, nextCrop);
        return planId;
    }

    function executeRotation(
        uint256 planId,
        string memory crop,
        uint256 plantingDate,
        uint256 yield
    ) public returns (uint256) {
        require(rotationPlans[planId].farmer == msg.sender, "Not the farmer");
        require(rotationPlans[planId].isActive, "Plan not active");

        uint256 historyId = _historyIdCounter++;
        rotationHistory[planId].push(RotationHistory({
            historyId: historyId,
            planId: planId,
            crop: crop,
            plantingDate: plantingDate,
            harvestDate: 0,
            yield: yield,
            isCompleted: false
        }));

        emit RotationExecuted(planId, msg.sender, crop, plantingDate);
        return historyId;
    }

    function completeRotation(
        uint256 planId,
        uint256 historyId,
        uint256 harvestDate,
        uint256 yield
    ) public {
        require(rotationPlans[planId].farmer == msg.sender, "Not the farmer");
        
        RotationHistory[] storage history = rotationHistory[planId];
        for (uint256 i = 0; i < history.length; i++) {
            if (history[i].historyId == historyId) {
                history[i].harvestDate = harvestDate;
                history[i].yield = yield;
                history[i].isCompleted = true;
                break;
            }
        }
    }

    function getRotationPlan(uint256 planId) public view returns (RotationPlan memory) {
        return rotationPlans[planId];
    }

    function getRotationHistory(uint256 planId) public view returns (RotationHistory[] memory) {
        return rotationHistory[planId];
    }

    function getPlansByFarmer(address farmer) public view returns (uint256[] memory) {
        return plansByFarmer[farmer];
    }
}

