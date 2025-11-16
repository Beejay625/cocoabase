// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmDeforestationMonitoring
 * @dev Onchain alerts and tracking for deforestation and forest buffer changes
 */
contract FarmDeforestationMonitoring is Ownable {
    struct DeforestationEvent {
        uint256 eventId;
        address reporter;
        string regionId;
        uint256 areaAffected;
        string cause;
        bool alertRaised;
        uint256 timestamp;
    }

    mapping(uint256 => DeforestationEvent) public events;
    mapping(string => uint256[]) public eventsByRegion;
    uint256 private _eventIdCounter;

    event DeforestationReported(
        uint256 indexed eventId,
        string regionId,
        uint256 areaAffected,
        bool alertRaised
    );

    constructor() Ownable(msg.sender) {}

    function reportDeforestation(
        string memory regionId,
        uint256 areaAffected,
        string memory cause,
        bool alertRaised
    ) public returns (uint256) {
        uint256 eventId = _eventIdCounter++;
        events[eventId] = DeforestationEvent({
            eventId: eventId,
            reporter: msg.sender,
            regionId: regionId,
            areaAffected: areaAffected,
            cause: cause,
            alertRaised: alertRaised,
            timestamp: block.timestamp
        });

        eventsByRegion[regionId].push(eventId);
        emit DeforestationReported(eventId, regionId, areaAffected, alertRaised);
        return eventId;
    }

    function getEvent(uint256 eventId) public view returns (DeforestationEvent memory) {
        return events[eventId];
    }
}


