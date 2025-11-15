// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSeasonalPlanning
 * @dev Automated seasonal planning and scheduling system
 */
contract FarmSeasonalPlanning is Ownable {
    struct SeasonalPlan {
        uint256 planId;
        address farmer;
        string season;
        uint256 startDate;
        uint256 endDate;
        string[] activities;
        uint256[] scheduledDates;
        bool active;
    }

    mapping(uint256 => SeasonalPlan) public plans;
    mapping(address => uint256[]) public plansByFarmer;
    uint256 private _planIdCounter;

    event PlanCreated(
        uint256 indexed planId,
        address indexed farmer,
        string season
    );

    constructor() Ownable(msg.sender) {}

    function createPlan(
        string memory season,
        uint256 startDate,
        uint256 endDate,
        string[] memory activities,
        uint256[] memory scheduledDates
    ) public returns (uint256) {
        require(activities.length == scheduledDates.length, "Array length mismatch");
        uint256 planId = _planIdCounter++;
        plans[planId] = SeasonalPlan({
            planId: planId,
            farmer: msg.sender,
            season: season,
            startDate: startDate,
            endDate: endDate,
            activities: activities,
            scheduledDates: scheduledDates,
            active: true
        });

        plansByFarmer[msg.sender].push(planId);
        emit PlanCreated(planId, msg.sender, season);
        return planId;
    }

    function deactivatePlan(uint256 planId) public {
        require(plans[planId].farmer == msg.sender, "Not authorized");
        plans[planId].active = false;
    }

    function getPlan(uint256 planId) public view returns (SeasonalPlan memory) {
        return plans[planId];
    }
}
