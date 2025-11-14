// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmHarvestScheduling
 * @dev Onchain harvest scheduling system
 */
contract FarmHarvestScheduling is Ownable {
    struct HarvestSchedule {
        uint256 scheduleId;
        address farmer;
        uint256 cropId;
        string cropType;
        uint256 scheduledDate;
        uint256 estimatedYield;
        string location;
        bool isCompleted;
        bool isCancelled;
        uint256 actualYield;
        uint256 completionDate;
    }

    mapping(uint256 => HarvestSchedule) public harvestSchedules;
    mapping(address => uint256[]) public schedulesByFarmer;
    mapping(uint256 => uint256[]) public schedulesByCrop;
    uint256 private _scheduleIdCounter;

    event HarvestScheduled(
        uint256 indexed scheduleId,
        address indexed farmer,
        uint256 indexed cropId,
        uint256 scheduledDate
    );

    event HarvestCompleted(
        uint256 indexed scheduleId,
        address indexed farmer,
        uint256 actualYield
    );

    event HarvestCancelled(
        uint256 indexed scheduleId,
        address indexed farmer
    );

    constructor() Ownable(msg.sender) {}

    function scheduleHarvest(
        uint256 cropId,
        string memory cropType,
        uint256 scheduledDate,
        uint256 estimatedYield,
        string memory location
    ) public returns (uint256) {
        require(scheduledDate > block.timestamp, "Invalid scheduled date");
        require(estimatedYield > 0, "Estimated yield must be greater than 0");

        uint256 scheduleId = _scheduleIdCounter++;
        harvestSchedules[scheduleId] = HarvestSchedule({
            scheduleId: scheduleId,
            farmer: msg.sender,
            cropId: cropId,
            cropType: cropType,
            scheduledDate: scheduledDate,
            estimatedYield: estimatedYield,
            location: location,
            isCompleted: false,
            isCancelled: false,
            actualYield: 0,
            completionDate: 0
        });

        schedulesByFarmer[msg.sender].push(scheduleId);
        schedulesByCrop[cropId].push(scheduleId);

        emit HarvestScheduled(scheduleId, msg.sender, cropId, scheduledDate);
        return scheduleId;
    }

    function completeHarvest(uint256 scheduleId, uint256 actualYield) public {
        require(harvestSchedules[scheduleId].farmer == msg.sender, "Not the farmer");
        require(harvestSchedules[scheduleId].isCompleted == false, "Already completed");
        require(harvestSchedules[scheduleId].isCancelled == false, "Schedule is cancelled");

        harvestSchedules[scheduleId].isCompleted = true;
        harvestSchedules[scheduleId].actualYield = actualYield;
        harvestSchedules[scheduleId].completionDate = block.timestamp;

        emit HarvestCompleted(scheduleId, msg.sender, actualYield);
    }

    function cancelHarvest(uint256 scheduleId) public {
        require(harvestSchedules[scheduleId].farmer == msg.sender, "Not the farmer");
        require(harvestSchedules[scheduleId].isCompleted == false, "Already completed");
        require(harvestSchedules[scheduleId].isCancelled == false, "Already cancelled");

        harvestSchedules[scheduleId].isCancelled = true;

        emit HarvestCancelled(scheduleId, msg.sender);
    }

    function getHarvestSchedule(uint256 scheduleId) public view returns (HarvestSchedule memory) {
        return harvestSchedules[scheduleId];
    }

    function getSchedulesByFarmer(address farmer) public view returns (uint256[] memory) {
        return schedulesByFarmer[farmer];
    }

    function getSchedulesByCrop(uint256 cropId) public view returns (uint256[] memory) {
        return schedulesByCrop[cropId];
    }
}
