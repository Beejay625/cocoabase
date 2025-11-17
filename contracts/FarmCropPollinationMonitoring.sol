// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPollinationMonitoring
 * @dev Pollination activity monitoring and tracking
 */
contract FarmCropPollinationMonitoring is Ownable {
    struct PollinationEvent {
        uint256 eventId;
        address farmer;
        string fieldId;
        uint256 pollinatorCount;
        uint256 activityLevel;
        uint256 eventDate;
        bool sufficient;
    }

    mapping(uint256 => PollinationEvent) public events;
    uint256 private _eventIdCounter;

    event EventRecorded(
        uint256 indexed eventId,
        address indexed farmer,
        uint256 activityLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordPollination(
        string memory fieldId,
        uint256 pollinatorCount,
        uint256 activityLevel
    ) public returns (uint256) {
        bool sufficient = pollinatorCount >= 50 && activityLevel >= 70;
        uint256 eventId = _eventIdCounter++;
        events[eventId] = PollinationEvent({
            eventId: eventId,
            farmer: msg.sender,
            fieldId: fieldId,
            pollinatorCount: pollinatorCount,
            activityLevel: activityLevel,
            eventDate: block.timestamp,
            sufficient: sufficient
        });

        emit EventRecorded(eventId, msg.sender, activityLevel);
        return eventId;
    }

    function getEvent(uint256 eventId) public view returns (PollinationEvent memory) {
        return events[eventId];
    }
}
