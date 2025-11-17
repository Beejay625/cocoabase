// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentMaintenanceSchedule
 * @dev Equipment maintenance scheduling and tracking
 */
contract FarmEquipmentMaintenanceSchedule is Ownable {
    struct MaintenanceTask {
        uint256 taskId;
        address farmer;
        string equipmentId;
        string maintenanceType;
        uint256 scheduledDate;
        uint256 completedDate;
        bool completed;
    }

    mapping(uint256 => MaintenanceTask) public tasks;
    mapping(address => uint256[]) public tasksByFarmer;
    uint256 private _taskIdCounter;

    event TaskScheduled(
        uint256 indexed taskId,
        address indexed farmer,
        uint256 scheduledDate
    );

    event TaskCompleted(
        uint256 indexed taskId,
        uint256 completedDate
    );

    constructor() Ownable(msg.sender) {}

    function scheduleMaintenance(
        string memory equipmentId,
        string memory maintenanceType,
        uint256 scheduledDate
    ) public returns (uint256) {
        uint256 taskId = _taskIdCounter++;
        tasks[taskId] = MaintenanceTask({
            taskId: taskId,
            farmer: msg.sender,
            equipmentId: equipmentId,
            maintenanceType: maintenanceType,
            scheduledDate: scheduledDate,
            completedDate: 0,
            completed: false
        });

        tasksByFarmer[msg.sender].push(taskId);
        emit TaskScheduled(taskId, msg.sender, scheduledDate);
        return taskId;
    }

    function completeTask(uint256 taskId) public {
        require(tasks[taskId].farmer == msg.sender, "Not authorized");
        tasks[taskId].completed = true;
        tasks[taskId].completedDate = block.timestamp;
        emit TaskCompleted(taskId, block.timestamp);
    }

    function getTask(uint256 taskId) public view returns (MaintenanceTask memory) {
        return tasks[taskId];
    }
}
