// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkQualitySystem
 * @dev Onchain milk quality metrics and standards tracking system
 */
contract FarmLivestockMilkQualitySystem is Ownable {
    struct QualityRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 fatContent;
        uint256 proteinContent;
        uint256 somaticCellCount;
        uint256 recordDate;
        string grade;
        bool meetsStandard;
    }

    mapping(uint256 => QualityRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event QualityRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string grade
    );

    constructor() Ownable(msg.sender) {}

    function recordQuality(
        string memory livestockId,
        uint256 fatContent,
        uint256 proteinContent,
        uint256 somaticCellCount,
        string memory grade
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        bool meetsStandard = somaticCellCount < 400000;

        records[recordId] = QualityRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            fatContent: fatContent,
            proteinContent: proteinContent,
            somaticCellCount: somaticCellCount,
            recordDate: block.timestamp,
            grade: grade,
            meetsStandard: meetsStandard
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit QualityRecorded(recordId, msg.sender, livestockId, grade);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (QualityRecord memory) {
        return records[recordId];
    }
}

