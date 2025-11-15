// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkQuality
 * @dev Onchain system for tracking milk quality metrics and standards
 */
contract FarmLivestockMilkQuality is Ownable {
    struct MilkQualityRecord {
        uint256 recordId;
        uint256 milkingId;
        uint256 fatContent;
        uint256 proteinContent;
        uint256 somaticCellCount;
        uint256 qualityScore;
        address tester;
    }

    mapping(uint256 => MilkQualityRecord) public milkQualityRecords;
    mapping(address => uint256[]) public recordsByTester;
    uint256 private _recordIdCounter;

    event MilkQualityRecorded(
        uint256 indexed recordId,
        address indexed tester,
        uint256 qualityScore
    );

    constructor() Ownable(msg.sender) {}

    function recordMilkQuality(
        uint256 milkingId,
        uint256 fatContent,
        uint256 proteinContent,
        uint256 somaticCellCount
    ) public returns (uint256) {
        uint256 qualityScore = (fatContent + proteinContent) / 2;
        if (somaticCellCount > 400000) {
            qualityScore = qualityScore / 2;
        }
        
        uint256 recordId = _recordIdCounter++;
        milkQualityRecords[recordId] = MilkQualityRecord({
            recordId: recordId,
            milkingId: milkingId,
            fatContent: fatContent,
            proteinContent: proteinContent,
            somaticCellCount: somaticCellCount,
            qualityScore: qualityScore,
            tester: msg.sender
        });

        recordsByTester[msg.sender].push(recordId);

        emit MilkQualityRecorded(recordId, msg.sender, qualityScore);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MilkQualityRecord memory) {
        return milkQualityRecords[recordId];
    }
}

