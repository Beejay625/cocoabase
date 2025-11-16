// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockVaccinationSchedule
 * @dev Automated vaccination scheduling for livestock
 */
contract FarmLivestockVaccinationSchedule is Ownable {
    struct VaccinationSchedule {
        uint256 scheduleId;
        address farmer;
        string livestockId;
        string vaccineType;
        uint256 scheduledDate;
        uint256 administeredDate;
        bool completed;
    }

    mapping(uint256 => VaccinationSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string vaccineType
    );

    event VaccinationAdministered(
        uint256 indexed scheduleId,
        uint256 administeredDate
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory livestockId,
        string memory vaccineType,
        uint256 scheduledDate
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = VaccinationSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            livestockId: livestockId,
            vaccineType: vaccineType,
            scheduledDate: scheduledDate,
            administeredDate: 0,
            completed: false
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, vaccineType);
        return scheduleId;
    }

    function administerVaccination(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not authorized");
        require(!schedules[scheduleId].completed, "Already completed");
        schedules[scheduleId].completed = true;
        schedules[scheduleId].administeredDate = block.timestamp;
        emit VaccinationAdministered(scheduleId, block.timestamp);
    }

    function getSchedule(uint256 scheduleId) public view returns (VaccinationSchedule memory) {
        return schedules[scheduleId];
    }
}