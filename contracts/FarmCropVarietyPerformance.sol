// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropVarietyPerformance
 * @dev Onchain crop variety management and performance tracking
 */
contract FarmCropVarietyPerformance is Ownable {
    struct VarietyPerformance {
        uint256 recordId;
        address farmer;
        string varietyName;
        string fieldId;
        uint256 expectedYield;
        uint256 actualYield;
        uint256 performanceScore;
        uint256 recordDate;
        string characteristics;
    }

    mapping(uint256 => VarietyPerformance) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event PerformanceRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string varietyName,
        uint256 performanceScore
    );

    constructor() Ownable(msg.sender) {}

    function recordPerformance(
        string memory varietyName,
        string memory fieldId,
        uint256 expectedYield,
        uint256 actualYield,
        string memory characteristics
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 performanceScore = (actualYield * 100) / expectedYield;

        records[recordId] = VarietyPerformance({
            recordId: recordId,
            farmer: msg.sender,
            varietyName: varietyName,
            fieldId: fieldId,
            expectedYield: expectedYield,
            actualYield: actualYield,
            performanceScore: performanceScore,
            recordDate: block.timestamp,
            characteristics: characteristics
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit PerformanceRecorded(recordId, msg.sender, varietyName, performanceScore);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (VarietyPerformance memory) {
        return records[recordId];
    }
}

