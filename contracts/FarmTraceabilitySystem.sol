// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmTraceabilitySystem
 * @dev Complete product traceability from farm to consumer
 */
contract FarmTraceabilitySystem is Ownable {
    struct TraceabilityRecord {
        uint256 recordId;
        string productId;
        address currentHandler;
        string location;
        uint256 timestamp;
        string action;
        string metadata;
    }

    mapping(uint256 => TraceabilityRecord) public records;
    mapping(string => uint256[]) public recordsByProduct;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        string productId,
        address indexed handler
    );

    constructor() Ownable(msg.sender) {}

    function createRecord(
        string memory productId,
        string memory location,
        string memory action,
        string memory metadata
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = TraceabilityRecord({
            recordId: recordId,
            productId: productId,
            currentHandler: msg.sender,
            location: location,
            timestamp: block.timestamp,
            action: action,
            metadata: metadata
        });

        recordsByProduct[productId].push(recordId);
        emit RecordCreated(recordId, productId, msg.sender);
        return recordId;
    }

    function getRecordsByProduct(string memory productId) public view returns (uint256[] memory) {
        return recordsByProduct[productId];
    }

    function getRecord(uint256 recordId) public view returns (TraceabilityRecord memory) {
        return records[recordId];
    }
}
