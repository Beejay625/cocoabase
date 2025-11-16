// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmColdChainLogistics
 * @dev Cold chain temperature logs, routes, and spoilage incident tracking
 */
contract FarmColdChainLogistics is Ownable {
    struct ColdChainEvent {
        uint256 eventId;
        string shipmentId;
        address handler;
        int256 temperatureMilliC; // temperature in milli-degrees Celsius
        string location;
        bool spoilageDetected;
        uint256 timestamp;
    }

    mapping(uint256 => ColdChainEvent) public events;
    mapping(string => uint256[]) public eventsByShipment;
    uint256 private _eventIdCounter;

    event ColdChainEventRecorded(
        uint256 indexed eventId,
        string shipmentId,
        int256 temperatureMilliC,
        bool spoilageDetected
    );

    constructor() Ownable(msg.sender) {}

    function recordColdChainEvent(
        string memory shipmentId,
        int256 temperatureMilliC,
        string memory location,
        bool spoilageDetected
    ) public returns (uint256) {
        uint256 eventId = _eventIdCounter++;
        events[eventId] = ColdChainEvent({
            eventId: eventId,
            shipmentId: shipmentId,
            handler: msg.sender,
            temperatureMilliC: temperatureMilliC,
            location: location,
            spoilageDetected: spoilageDetected,
            timestamp: block.timestamp
        });

        eventsByShipment[shipmentId].push(eventId);
        emit ColdChainEventRecorded(
            eventId,
            shipmentId,
            temperatureMilliC,
            spoilageDetected
        );
        return eventId;
    }

    function getEvent(uint256 eventId) public view returns (ColdChainEvent memory) {
        return events[eventId];
    }
}


