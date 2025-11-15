// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropFertilizerSchedule
 * @dev Onchain fertilizer application scheduling and tracking
 */
contract FarmCropFertilizerSchedule is Ownable {
    struct FertilizerSchedule {
        uint256 scheduleId;
        address farmer;
        string fieldId;
        string fertilizerType;
        uint256 amount;
        uint256 scheduledDate;
        uint256 appliedDate;
        bool isApplied;
    }

    mapping(uint256 => FertilizerSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string fieldId
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory fieldId,
        string memory fertilizerType,
        uint256 amount,
        uint256 scheduledDate
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = FertilizerSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            fieldId: fieldId,
            fertilizerType: fertilizerType,
            amount: amount,
            scheduledDate: scheduledDate,
            appliedDate: 0,
            isApplied: false
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, fieldId);
        return scheduleId;
    }

    function recordApplication(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not schedule owner");
        schedules[scheduleId].appliedDate = block.timestamp;
        schedules[scheduleId].isApplied = true;
    }

    function getSchedule(uint256 scheduleId) public view returns (FertilizerSchedule memory) {
        return schedules[scheduleId];
    }
}

