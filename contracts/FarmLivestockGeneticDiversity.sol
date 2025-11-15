// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticDiversity
 * @dev Track genetic diversity in livestock populations
 */
contract FarmLivestockGeneticDiversity is Ownable {
    struct DiversityRecord {
        uint256 recordId;
        uint256 populationId;
        uint256 diversityIndex;
        uint256 uniqueGenotypes;
        uint256 recordedDate;
        address recorder;
    }

    mapping(uint256 => DiversityRecord) public records;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event DiversityRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 populationId,
        uint256 diversityIndex
    );

    constructor() Ownable(msg.sender) {}

    function recordDiversity(
        uint256 populationId,
        uint256 diversityIndex,
        uint256 uniqueGenotypes
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = DiversityRecord({
            recordId: recordId,
            populationId: populationId,
            diversityIndex: diversityIndex,
            uniqueGenotypes: uniqueGenotypes,
            recordedDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByOwner[msg.sender].push(recordId);

        emit DiversityRecorded(recordId, msg.sender, populationId, diversityIndex);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (DiversityRecord memory) {
        return records[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}


