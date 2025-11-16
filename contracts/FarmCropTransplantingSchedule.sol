// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropTransplantingSchedule
 * @dev Onchain transplanting schedule and seedling management
 */
contract FarmCropTransplantingSchedule is Ownable {
    struct TransplantSchedule {
        uint256 scheduleId;
        address farmer;
        string seedlingBatchId;
        string targetFieldId;
        uint256 scheduledDate;
        uint256 transplantedDate;
        uint256 quantity;
        bool isCompleted;
    }

    mapping(uint256 => TransplantSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string targetFieldId
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory seedlingBatchId,
        string memory targetFieldId,
        uint256 scheduledDate,
        uint256 quantity
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = TransplantSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            seedlingBatchId: seedlingBatchId,
            targetFieldId: targetFieldId,
            scheduledDate: scheduledDate,
            transplantedDate: 0,
            quantity: quantity,
            isCompleted: false
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, targetFieldId);
        return scheduleId;
    }

    function completeTransplant(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not schedule owner");
        schedules[scheduleId].transplantedDate = block.timestamp;
        schedules[scheduleId].isCompleted = true;
    }

    function getSchedule(uint256 scheduleId) public view returns (TransplantSchedule memory) {
        return schedules[scheduleId];
    }
}

