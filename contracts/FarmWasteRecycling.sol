// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWasteRecycling
 * @dev Onchain waste recycling and composting tracking
 */
contract FarmWasteRecycling is Ownable {
    struct RecyclingRecord {
        uint256 recordId;
        address farmer;
        string wasteType;
        uint256 quantity;
        string recyclingMethod;
        uint256 recordDate;
        uint256 compostProduced;
        string quality;
    }

    mapping(uint256 => RecyclingRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event RecyclingRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string wasteType,
        uint256 compostProduced
    );

    constructor() Ownable(msg.sender) {}

    function recordRecycling(
        string memory wasteType,
        uint256 quantity,
        string memory recyclingMethod,
        uint256 compostProduced,
        string memory quality
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = RecyclingRecord({
            recordId: recordId,
            farmer: msg.sender,
            wasteType: wasteType,
            quantity: quantity,
            recyclingMethod: recyclingMethod,
            recordDate: block.timestamp,
            compostProduced: compostProduced,
            quality: quality
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit RecyclingRecorded(recordId, msg.sender, wasteType, compostProduced);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (RecyclingRecord memory) {
        return records[recordId];
    }
}
