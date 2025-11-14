// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropNutrientRecycling
 * @dev Track nutrient recycling activities
 */
contract FarmCropNutrientRecycling is Ownable {
    struct RecyclingActivity {
        uint256 activityId;
        uint256 fieldId;
        string recyclingMethod;
        uint256 nutrientRecovered;
        uint256 implementationDate;
        address implementer;
    }

    mapping(uint256 => RecyclingActivity) public activities;
    mapping(address => uint256[]) public activitiesByOwner;
    uint256 private _activityIdCounter;

    event ActivityCreated(
        uint256 indexed activityId,
        address indexed owner,
        uint256 fieldId
    );

    constructor() Ownable(msg.sender) {}

    function createActivity(
        uint256 fieldId,
        string memory recyclingMethod,
        uint256 nutrientRecovered
    ) public returns (uint256) {
        uint256 activityId = _activityIdCounter++;
        activities[activityId] = RecyclingActivity({
            activityId: activityId,
            fieldId: fieldId,
            recyclingMethod: recyclingMethod,
            nutrientRecovered: nutrientRecovered,
            implementationDate: block.timestamp,
            implementer: msg.sender
        });

        activitiesByOwner[msg.sender].push(activityId);

        emit ActivityCreated(activityId, msg.sender, fieldId);
        return activityId;
    }

    function getActivity(uint256 activityId) public view returns (RecyclingActivity memory) {
        return activities[activityId];
    }

    function getActivitiesByOwner(address owner) public view returns (uint256[] memory) {
        return activitiesByOwner[owner];
    }
}

