// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropTraceability
 * @dev Onchain system for complete crop traceability from seed to consumer
 */
contract FarmCropTraceability is Ownable {
    struct TraceabilityRecord {
        uint256 recordId;
        uint256 productId;
        string stage;
        address location;
        uint256 timestamp;
        string data;
        address recorder;
    }

    mapping(uint256 => TraceabilityRecord[]) public traceabilityChain;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event TraceabilityRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        string stage
    );

    constructor() Ownable(msg.sender) {}

    function recordTraceability(
        uint256 productId,
        string memory stage,
        address location,
        string memory data
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        TraceabilityRecord memory record = TraceabilityRecord({
            recordId: recordId,
            productId: productId,
            stage: stage,
            location: location,
            timestamp: block.timestamp,
            data: data,
            recorder: msg.sender
        });

        traceabilityChain[productId].push(record);
        recordsByRecorder[msg.sender].push(recordId);

        emit TraceabilityRecorded(recordId, msg.sender, stage);
        return recordId;
    }

    function getTraceabilityChain(uint256 productId) public view returns (TraceabilityRecord[] memory) {
        return traceabilityChain[productId];
    }
}

