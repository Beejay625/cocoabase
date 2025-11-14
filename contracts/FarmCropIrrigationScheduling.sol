// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropIrrigationScheduling
 * @dev Schedule and optimize irrigation for crops
 */
contract FarmCropIrrigationScheduling is Ownable {
    struct IrrigationSchedule {
        uint256 scheduleId;
        uint256 plantationId;
        string cropType;
        uint256 waterAmount;
        uint256 frequency;
        uint256 startDate;
        uint256 endDate;
        address owner;
        bool active;
    }

    struct IrrigationExecution {
        uint256 executionId;
        uint256 scheduleId;
        uint256 executedAt;
        uint256 actualWaterAmount;
        address executor;
        bool completed;
    }

    mapping(uint256 => IrrigationSchedule) public irrigationSchedules;
    mapping(uint256 => IrrigationExecution) public irrigationExecutions;
    mapping(address => uint256[]) public schedulesByOwner;
    uint256 private _scheduleIdCounter;
    uint256 private _executionIdCounter;

    event IrrigationScheduled(
        uint256 indexed scheduleId,
        address indexed owner,
        uint256 plantationId
    );

    event IrrigationExecuted(
        uint256 indexed executionId,
        uint256 indexed scheduleId,
        uint256 waterAmount
    );

    constructor() Ownable(msg.sender) {}

    function createIrrigationSchedule(
        uint256 plantationId,
        string memory cropType,
        uint256 waterAmount,
        uint256 frequency,
        uint256 startDate,
        uint256 endDate
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        irrigationSchedules[scheduleId] = IrrigationSchedule({
            scheduleId: scheduleId,
            plantationId: plantationId,
            cropType: cropType,
            waterAmount: waterAmount,
            frequency: frequency,
            startDate: startDate,
            endDate: endDate,
            owner: msg.sender,
            active: true
        });

        schedulesByOwner[msg.sender].push(scheduleId);

        emit IrrigationScheduled(scheduleId, msg.sender, plantationId);
        return scheduleId;
    }

    function executeIrrigation(
        uint256 scheduleId,
        uint256 actualWaterAmount
    ) public returns (uint256) {
        require(irrigationSchedules[scheduleId].active, "Schedule not active");
        
        uint256 executionId = _executionIdCounter++;
        irrigationExecutions[executionId] = IrrigationExecution({
            executionId: executionId,
            scheduleId: scheduleId,
            executedAt: block.timestamp,
            actualWaterAmount: actualWaterAmount,
            executor: msg.sender,
            completed: true
        });

        emit IrrigationExecuted(executionId, scheduleId, actualWaterAmount);
        return executionId;
    }

    function toggleSchedule(uint256 scheduleId, bool active) public {
        require(irrigationSchedules[scheduleId].owner == msg.sender, "Not owner");
        irrigationSchedules[scheduleId].active = active;
    }

    function getIrrigationSchedule(uint256 scheduleId) public view returns (IrrigationSchedule memory) {
        return irrigationSchedules[scheduleId];
    }

    function getSchedulesByOwner(address owner) public view returns (uint256[] memory) {
        return schedulesByOwner[owner];
    }
}

