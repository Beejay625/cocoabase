// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropTraceabilitySystem
 * @dev Onchain complete traceability from seed to consumer
 */
contract FarmCropTraceabilitySystem is Ownable {
    struct TraceabilityRecord {
        uint256 recordId;
        address farmer;
        string productId;
        string stage;
        string location;
        uint256 timestamp;
        string data;
        address handler;
    }

    mapping(uint256 => TraceabilityRecord) public records;
    mapping(string => uint256[]) public recordsByProductId;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event TraceabilityRecorded(
        uint256 indexed recordId,
        string indexed productId,
        string stage,
        address indexed handler
    );

    constructor() Ownable(msg.sender) {}

    function recordTraceability(
        string memory productId,
        string memory stage,
        string memory location,
        string memory data
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = TraceabilityRecord({
            recordId: recordId,
            farmer: msg.sender,
            productId: productId,
            stage: stage,
            location: location,
            timestamp: block.timestamp,
            data: data,
            handler: msg.sender
        });

        recordsByProductId[productId].push(recordId);
        recordsByFarmer[msg.sender].push(recordId);
        emit TraceabilityRecorded(recordId, productId, stage, msg.sender);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (TraceabilityRecord memory) {
        return records[recordId];
    }
}

