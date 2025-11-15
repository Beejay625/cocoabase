// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockTraceability
 * @dev Onchain livestock traceability from birth to processing
 */
contract FarmLivestockTraceability is Ownable {
    struct TraceabilityRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string eventType;
        string location;
        uint256 timestamp;
        string data;
        address handler;
    }

    mapping(uint256 => TraceabilityRecord) public records;
    mapping(string => uint256[]) public recordsByLivestockId;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event TraceabilityRecorded(
        uint256 indexed recordId,
        string indexed livestockId,
        string eventType,
        address indexed handler
    );

    constructor() Ownable(msg.sender) {}

    function recordTraceability(
        string memory livestockId,
        string memory eventType,
        string memory location,
        string memory data
    ) public returns (uint256) {
        require(bytes(livestockId).length > 0, "Livestock ID required");
        require(bytes(eventType).length > 0, "Event type required");

        uint256 recordId = _recordIdCounter++;
        records[recordId] = TraceabilityRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            eventType: eventType,
            location: location,
            timestamp: block.timestamp,
            data: data,
            handler: msg.sender
        });

        recordsByLivestockId[livestockId].push(recordId);
        recordsByFarmer[msg.sender].push(recordId);

        emit TraceabilityRecorded(recordId, livestockId, eventType, msg.sender);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (TraceabilityRecord memory) {
        return records[recordId];
    }

    function getRecordsByLivestockId(string memory livestockId) public view returns (uint256[] memory) {
        return recordsByLivestockId[livestockId];
    }
}

