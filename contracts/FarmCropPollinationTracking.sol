// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPollinationTracking
 * @dev Onchain pollination activity tracking and success monitoring
 */
contract FarmCropPollinationTracking is Ownable {
    struct PollinationRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string pollinatorType;
        uint256 activityLevel;
        uint256 recordDate;
        uint256 successRate;
    }

    mapping(uint256 => PollinationRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event PollinationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string pollinatorType
    );

    constructor() Ownable(msg.sender) {}

    function recordPollination(
        string memory fieldId,
        string memory pollinatorType,
        uint256 activityLevel,
        uint256 successRate
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = PollinationRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            pollinatorType: pollinatorType,
            activityLevel: activityLevel,
            recordDate: block.timestamp,
            successRate: successRate
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit PollinationRecorded(recordId, msg.sender, fieldId, pollinatorType);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PollinationRecord memory) {
        return records[recordId];
    }
}
