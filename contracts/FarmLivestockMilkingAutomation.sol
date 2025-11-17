// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkingAutomation
 * @dev Onchain automated milking records and production tracking
 */
contract FarmLivestockMilkingAutomation is Ownable {
    struct MilkingRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 milkVolume;
        uint256 milkingDate;
        string qualityGrade;
        uint256 fatContent;
    }

    mapping(uint256 => MilkingRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event MilkingRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        uint256 milkVolume
    );

    constructor() Ownable(msg.sender) {}

    function recordMilking(
        string memory livestockId,
        uint256 milkVolume,
        string memory qualityGrade,
        uint256 fatContent
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = MilkingRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            milkVolume: milkVolume,
            milkingDate: block.timestamp,
            qualityGrade: qualityGrade,
            fatContent: fatContent
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit MilkingRecorded(recordId, msg.sender, livestockId, milkVolume);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MilkingRecord memory) {
        return records[recordId];
    }
}

