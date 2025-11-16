// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropGerminationRateTracking
 * @dev Onchain germination rate tracking and seed viability assessment
 */
contract FarmCropGerminationRateTracking is Ownable {
    struct GerminationRecord {
        uint256 recordId;
        address farmer;
        string seedBatchId;
        uint256 seedsPlanted;
        uint256 seedsGerminated;
        uint256 germinationRate;
        uint256 testDate;
        string conditions;
    }

    mapping(uint256 => GerminationRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event GerminationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string seedBatchId,
        uint256 germinationRate
    );

    constructor() Ownable(msg.sender) {}

    function recordGermination(
        string memory seedBatchId,
        uint256 seedsPlanted,
        uint256 seedsGerminated,
        string memory conditions
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 germinationRate = (seedsGerminated * 100) / seedsPlanted;

        records[recordId] = GerminationRecord({
            recordId: recordId,
            farmer: msg.sender,
            seedBatchId: seedBatchId,
            seedsPlanted: seedsPlanted,
            seedsGerminated: seedsGerminated,
            germinationRate: germinationRate,
            testDate: block.timestamp,
            conditions: conditions
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit GerminationRecorded(recordId, msg.sender, seedBatchId, germinationRate);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (GerminationRecord memory) {
        return records[recordId];
    }
}

