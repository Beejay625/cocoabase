// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPackagingSustainability
 * @dev Track packaging materials, recycled content, and plastic reduction metrics
 */
contract FarmPackagingSustainability is Ownable {
    struct PackagingRecord {
        uint256 recordId;
        address producer;
        string productBatchId;
        string materialType;
        uint256 recycledContentPercent;
        uint256 plasticWeightGrams;
        uint256 timestamp;
    }

    mapping(uint256 => PackagingRecord) public records;
    mapping(string => uint256[]) public recordsByBatch;
    uint256 private _recordIdCounter;

    event PackagingRecorded(
        uint256 indexed recordId,
        string productBatchId,
        uint256 recycledContentPercent,
        uint256 plasticWeightGrams
    );

    constructor() Ownable(msg.sender) {}

    function recordPackaging(
        string memory productBatchId,
        string memory materialType,
        uint256 recycledContentPercent,
        uint256 plasticWeightGrams
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = PackagingRecord({
            recordId: recordId,
            producer: msg.sender,
            productBatchId: productBatchId,
            materialType: materialType,
            recycledContentPercent: recycledContentPercent,
            plasticWeightGrams: plasticWeightGrams,
            timestamp: block.timestamp
        });

        recordsByBatch[productBatchId].push(recordId);
        emit PackagingRecorded(
            recordId,
            productBatchId,
            recycledContentPercent,
            plasticWeightGrams
        );
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PackagingRecord memory) {
        return records[recordId];
    }
}


