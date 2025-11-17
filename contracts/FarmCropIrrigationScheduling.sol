// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropIrrigationScheduling
 * @dev Onchain crop-specific irrigation scheduling
 */
contract FarmCropIrrigationScheduling is Ownable {
    struct IrrigationSchedule {
        uint256 scheduleId;
        address farmer;
        string fieldId;
        uint256 scheduledDate;
        uint256 waterAmount;
        string irrigationMethod;
        bool isCompleted;
    }

    mapping(uint256 => IrrigationSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string fieldId,
        uint256 scheduledDate
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory fieldId,
        uint256 scheduledDate,
        uint256 waterAmount,
        string memory irrigationMethod
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = IrrigationSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            fieldId: fieldId,
            scheduledDate: scheduledDate,
            waterAmount: waterAmount,
            irrigationMethod: irrigationMethod,
            isCompleted: false
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, fieldId, scheduledDate);
        return scheduleId;
    }

    function completeIrrigation(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not schedule owner");
        schedules[scheduleId].isCompleted = true;
    }

    function getSchedule(uint256 scheduleId) public view returns (IrrigationSchedule memory) {
        return schedules[scheduleId];
    }
}
