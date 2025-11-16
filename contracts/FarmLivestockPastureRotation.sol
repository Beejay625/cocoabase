// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockPastureRotation
 * @dev Onchain pasture rotation scheduling system
 */
contract FarmLivestockPastureRotation is Ownable {
    struct RotationSchedule {
        uint256 scheduleId;
        address farmer;
        string livestockGroupId;
        string currentPasture;
        string nextPasture;
        uint256 rotationDate;
        uint256 restPeriod;
        bool isActive;
    }

    mapping(uint256 => RotationSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string livestockGroupId,
        string nextPasture
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory livestockGroupId,
        string memory currentPasture,
        string memory nextPasture,
        uint256 rotationDate,
        uint256 restPeriod
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = RotationSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            livestockGroupId: livestockGroupId,
            currentPasture: currentPasture,
            nextPasture: nextPasture,
            rotationDate: rotationDate,
            restPeriod: restPeriod,
            isActive: true
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, livestockGroupId, nextPasture);
        return scheduleId;
    }

    function completeRotation(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not schedule owner");
        schedules[scheduleId].isActive = false;
    }

    function getSchedule(uint256 scheduleId) public view returns (RotationSchedule memory) {
        return schedules[scheduleId];
    }
}
