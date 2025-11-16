// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropIntercroppingSchedule
 * @dev Onchain intercropping schedule and companion planting
 */
contract FarmCropIntercroppingSchedule is Ownable {
    struct IntercroppingSchedule {
        uint256 scheduleId;
        address farmer;
        string fieldId;
        string primaryCrop;
        string companionCrop;
        uint256 plantingDate;
        string spacingPattern;
        string benefits;
    }

    mapping(uint256 => IntercroppingSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string fieldId,
        string primaryCrop,
        string companionCrop
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory fieldId,
        string memory primaryCrop,
        string memory companionCrop,
        uint256 plantingDate,
        string memory spacingPattern,
        string memory benefits
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = IntercroppingSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            fieldId: fieldId,
            primaryCrop: primaryCrop,
            companionCrop: companionCrop,
            plantingDate: plantingDate,
            spacingPattern: spacingPattern,
            benefits: benefits
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, fieldId, primaryCrop, companionCrop);
        return scheduleId;
    }

    function getSchedule(uint256 scheduleId) public view returns (IntercroppingSchedule memory) {
        return schedules[scheduleId];
    }
}

