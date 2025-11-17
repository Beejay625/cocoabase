// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterSourceQuality
 * @dev Water source quality tracking and certification
 */
contract FarmWaterSourceQuality is Ownable {
    struct QualityRecord {
        uint256 recordId;
        address farmer;
        string waterSourceId;
        uint256 qualityScore;
        string contaminants;
        uint256 recordDate;
        bool certified;
    }

    mapping(uint256 => QualityRecord) public records;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 qualityScore
    );

    constructor() Ownable(msg.sender) {}

    function recordQuality(
        string memory waterSourceId,
        uint256 qualityScore,
        string memory contaminants
    ) public returns (uint256) {
        bool certified = qualityScore >= 90;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = QualityRecord({
            recordId: recordId,
            farmer: msg.sender,
            waterSourceId: waterSourceId,
            qualityScore: qualityScore,
            contaminants: contaminants,
            recordDate: block.timestamp,
            certified: certified
        });

        emit RecordCreated(recordId, msg.sender, qualityScore);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (QualityRecord memory) {
        return records[recordId];
    }
}
