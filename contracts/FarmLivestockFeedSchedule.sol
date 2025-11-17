// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedSchedule
 * @dev Feed scheduling and ration management
 */
contract FarmLivestockFeedSchedule is Ownable {
    struct FeedSchedule {
        uint256 scheduleId;
        address farmer;
        string livestockId;
        string feedType;
        uint256 rationAmount;
        uint256 feedingTime;
        bool fed;
    }

    mapping(uint256 => FeedSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        uint256 feedingTime
    );

    event FeedingCompleted(
        uint256 indexed scheduleId,
        uint256 feedTime
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory livestockId,
        string memory feedType,
        uint256 rationAmount,
        uint256 feedingTime
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = FeedSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            livestockId: livestockId,
            feedType: feedType,
            rationAmount: rationAmount,
            feedingTime: feedingTime,
            fed: false
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, feedingTime);
        return scheduleId;
    }

    function completeFeeding(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not authorized");
        schedules[scheduleId].fed = true;
        emit FeedingCompleted(scheduleId, block.timestamp);
    }

    function getSchedule(uint256 scheduleId) public view returns (FeedSchedule memory) {
        return schedules[scheduleId];
    }
}