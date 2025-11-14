// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeeding
 * @dev Onchain system for tracking livestock feeding schedules
 */
contract FarmLivestockFeeding is Ownable {
    struct FeedingRecord {
        uint256 recordId;
        uint256 livestockId;
        string feedType;
        uint256 quantity;
        uint256 feedingDate;
        address feeder;
    }

    mapping(uint256 => FeedingRecord) public feedingRecords;
    mapping(address => uint256[]) public recordsByFeeder;
    uint256 private _recordIdCounter;

    event FeedingRecorded(
        uint256 indexed recordId,
        address indexed feeder,
        uint256 livestockId
    );

    constructor() Ownable(msg.sender) {}

    function recordFeeding(
        uint256 livestockId,
        string memory feedType,
        uint256 quantity
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        feedingRecords[recordId] = FeedingRecord({
            recordId: recordId,
            livestockId: livestockId,
            feedType: feedType,
            quantity: quantity,
            feedingDate: block.timestamp,
            feeder: msg.sender
        });

        recordsByFeeder[msg.sender].push(recordId);

        emit FeedingRecorded(recordId, msg.sender, livestockId);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (FeedingRecord memory) {
        return feedingRecords[recordId];
    }
}

