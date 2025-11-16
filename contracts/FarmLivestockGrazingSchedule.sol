// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGrazingSchedule
 * @dev Onchain grazing schedule and pasture rotation management
 */
contract FarmLivestockGrazingSchedule is Ownable {
    struct GrazingSchedule {
        uint256 scheduleId;
        address farmer;
        string livestockGroupId;
        string pastureId;
        uint256 startDate;
        uint256 endDate;
        uint256 grazingDuration;
        bool isActive;
    }

    mapping(uint256 => GrazingSchedule) public schedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    uint256 private _scheduleIdCounter;

    event ScheduleCreated(
        uint256 indexed scheduleId,
        address indexed farmer,
        string livestockGroupId,
        string pastureId
    );

    constructor() Ownable(msg.sender) {}

    function createSchedule(
        string memory livestockGroupId,
        string memory pastureId,
        uint256 startDate,
        uint256 grazingDuration
    ) public returns (uint256) {
        uint256 scheduleId = _scheduleIdCounter++;
        schedules[scheduleId] = GrazingSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            livestockGroupId: livestockGroupId,
            pastureId: pastureId,
            startDate: startDate,
            endDate: startDate + grazingDuration,
            grazingDuration: grazingDuration,
            isActive: true
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        emit ScheduleCreated(scheduleId, msg.sender, livestockGroupId, pastureId);
        return scheduleId;
    }

    function endGrazing(uint256 scheduleId) public {
        require(schedules[scheduleId].farmer == msg.sender, "Not schedule owner");
        schedules[scheduleId].isActive = false;
    }

    function getSchedule(uint256 scheduleId) public view returns (GrazingSchedule memory) {
        return schedules[scheduleId];
    }
}

