// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPollinationManagement
 * @dev Manage crop pollination activities
 */
contract FarmCropPollinationManagement is Ownable {
    struct PollinationEvent {
        uint256 eventId;
        uint256 plantationId;
        string cropType;
        string pollinatorType;
        uint256 pollinatorCount;
        uint256 eventDate;
        uint256 successRate;
        address manager;
    }

    struct PollinationPlan {
        uint256 planId;
        uint256 plantationId;
        string cropType;
        uint256 requiredPollinators;
        uint256 scheduledDate;
        address planner;
        bool executed;
    }

    mapping(uint256 => PollinationEvent) public pollinationEvents;
    mapping(uint256 => PollinationPlan) public pollinationPlans;
    mapping(address => uint256[]) public eventsByOwner;
    uint256 private _eventIdCounter;
    uint256 private _planIdCounter;

    event PollinationEventRecorded(
        uint256 indexed eventId,
        address indexed owner,
        uint256 plantationId
    );

    event PollinationPlanned(
        uint256 indexed planId,
        address indexed owner,
        uint256 plantationId
    );

    constructor() Ownable(msg.sender) {}

    function recordPollinationEvent(
        uint256 plantationId,
        string memory cropType,
        string memory pollinatorType,
        uint256 pollinatorCount,
        uint256 successRate
    ) public returns (uint256) {
        uint256 eventId = _eventIdCounter++;
        pollinationEvents[eventId] = PollinationEvent({
            eventId: eventId,
            plantationId: plantationId,
            cropType: cropType,
            pollinatorType: pollinatorType,
            pollinatorCount: pollinatorCount,
            eventDate: block.timestamp,
            successRate: successRate,
            manager: msg.sender
        });

        eventsByOwner[msg.sender].push(eventId);

        emit PollinationEventRecorded(eventId, msg.sender, plantationId);
        return eventId;
    }

    function createPollinationPlan(
        uint256 plantationId,
        string memory cropType,
        uint256 requiredPollinators,
        uint256 scheduledDate
    ) public returns (uint256) {
        uint256 planId = _planIdCounter++;
        pollinationPlans[planId] = PollinationPlan({
            planId: planId,
            plantationId: plantationId,
            cropType: cropType,
            requiredPollinators: requiredPollinators,
            scheduledDate: scheduledDate,
            planner: msg.sender,
            executed: false
        });

        emit PollinationPlanned(planId, msg.sender, plantationId);
        return planId;
    }

    function executePlan(uint256 planId) public {
        require(pollinationPlans[planId].planner == msg.sender, "Not planner");
        pollinationPlans[planId].executed = true;
    }

    function getPollinationEvent(uint256 eventId) public view returns (PollinationEvent memory) {
        return pollinationEvents[eventId];
    }

    function getEventsByOwner(address owner) public view returns (uint256[] memory) {
        return eventsByOwner[owner];
    }
}

