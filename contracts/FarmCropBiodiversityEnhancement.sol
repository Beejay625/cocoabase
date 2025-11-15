// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropBiodiversityEnhancement
 * @dev Track biodiversity enhancement activities
 */
contract FarmCropBiodiversityEnhancement is Ownable {
    struct EnhancementActivity {
        uint256 activityId;
        uint256 plantationId;
        string activityType;
        string speciesAdded;
        uint256 implementationDate;
        address implementer;
    }

    mapping(uint256 => EnhancementActivity) public activities;
    mapping(address => uint256[]) public activitiesByOwner;
    uint256 private _activityIdCounter;

    event ActivityCreated(
        uint256 indexed activityId,
        address indexed owner,
        uint256 plantationId
    );

    constructor() Ownable(msg.sender) {}

    function createActivity(
        uint256 plantationId,
        string memory activityType,
        string memory speciesAdded
    ) public returns (uint256) {
        uint256 activityId = _activityIdCounter++;
        activities[activityId] = EnhancementActivity({
            activityId: activityId,
            plantationId: plantationId,
            activityType: activityType,
            speciesAdded: speciesAdded,
            implementationDate: block.timestamp,
            implementer: msg.sender
        });

        activitiesByOwner[msg.sender].push(activityId);

        emit ActivityCreated(activityId, msg.sender, plantationId);
        return activityId;
    }

    function getActivity(uint256 activityId) public view returns (EnhancementActivity memory) {
        return activities[activityId];
    }

    function getActivitiesByOwner(address owner) public view returns (uint256[] memory) {
        return activitiesByOwner[owner];
    }
}


