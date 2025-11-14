// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropSeedQualityTracking
 * @dev Track seed quality and germination rates
 */
contract FarmCropSeedQualityTracking is Ownable {
    struct SeedQualityRecord {
        uint256 recordId;
        uint256 seedBatchId;
        string seedType;
        uint256 germinationRate;
        uint256 purity;
        uint256 moistureContent;
        uint256 testDate;
        address tester;
        bool approved;
    }

    struct SeedBatch {
        uint256 batchId;
        string seedType;
        uint256 quantity;
        uint256 receivedDate;
        address supplier;
    }

    mapping(uint256 => SeedQualityRecord) public qualityRecords;
    mapping(uint256 => SeedBatch) public seedBatches;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;
    uint256 private _batchIdCounter;

    event QualityRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 seedBatchId,
        uint256 germinationRate
    );

    event SeedBatchApproved(
        uint256 indexed batchId,
        address indexed approver
    );

    constructor() Ownable(msg.sender) {}

    function createSeedBatch(
        string memory seedType,
        uint256 quantity,
        address supplier
    ) public returns (uint256) {
        uint256 batchId = _batchIdCounter++;
        seedBatches[batchId] = SeedBatch({
            batchId: batchId,
            seedType: seedType,
            quantity: quantity,
            receivedDate: block.timestamp,
            supplier: supplier
        });

        return batchId;
    }

    function recordSeedQuality(
        uint256 seedBatchId,
        uint256 germinationRate,
        uint256 purity,
        uint256 moistureContent
    ) public returns (uint256) {
        bool approved = germinationRate >= 85 && purity >= 98 && moistureContent <= 8;
        
        uint256 recordId = _recordIdCounter++;
        qualityRecords[recordId] = SeedQualityRecord({
            recordId: recordId,
            seedBatchId: seedBatchId,
            seedType: seedBatches[seedBatchId].seedType,
            germinationRate: germinationRate,
            purity: purity,
            moistureContent: moistureContent,
            testDate: block.timestamp,
            tester: msg.sender,
            approved: approved
        });

        recordsByOwner[msg.sender].push(recordId);

        if (approved) {
            emit SeedBatchApproved(seedBatchId, msg.sender);
        }

        emit QualityRecorded(recordId, msg.sender, seedBatchId, germinationRate);
        return recordId;
    }

    function getQualityRecord(uint256 recordId) public view returns (SeedQualityRecord memory) {
        return qualityRecords[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}

