// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockProductivityTracking
 * @dev Track livestock productivity metrics
 */
contract FarmLivestockProductivityTracking is Ownable {
    struct ProductivityRecord {
        uint256 recordId;
        uint256 livestockId;
        string productivityType;
        uint256 amount;
        uint256 period;
        uint256 recordedDate;
        address recorder;
    }

    mapping(uint256 => ProductivityRecord) public records;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event ProductivityRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 livestockId,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function recordProductivity(
        uint256 livestockId,
        string memory productivityType,
        uint256 amount,
        uint256 period
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ProductivityRecord({
            recordId: recordId,
            livestockId: livestockId,
            productivityType: productivityType,
            amount: amount,
            period: period,
            recordedDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByOwner[msg.sender].push(recordId);

        emit ProductivityRecorded(recordId, msg.sender, livestockId, amount);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ProductivityRecord memory) {
        return records[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}

