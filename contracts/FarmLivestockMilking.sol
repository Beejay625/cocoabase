// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilking
 * @dev Onchain system for tracking livestock milking records
 */
contract FarmLivestockMilking is Ownable {
    struct MilkingRecord {
        uint256 recordId;
        uint256 livestockId;
        uint256 milkQuantity;
        uint256 milkingDate;
        address milker;
        string quality;
    }

    mapping(uint256 => MilkingRecord) public milkingRecords;
    mapping(address => uint256[]) public recordsByMilker;
    uint256 private _recordIdCounter;

    event MilkingRecorded(
        uint256 indexed recordId,
        address indexed milker,
        uint256 milkQuantity
    );

    constructor() Ownable(msg.sender) {}

    function recordMilking(
        uint256 livestockId,
        uint256 milkQuantity,
        string memory quality
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        milkingRecords[recordId] = MilkingRecord({
            recordId: recordId,
            livestockId: livestockId,
            milkQuantity: milkQuantity,
            milkingDate: block.timestamp,
            milker: msg.sender,
            quality: quality
        });

        recordsByMilker[msg.sender].push(recordId);

        emit MilkingRecorded(recordId, msg.sender, milkQuantity);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MilkingRecord memory) {
        return milkingRecords[recordId];
    }
}

