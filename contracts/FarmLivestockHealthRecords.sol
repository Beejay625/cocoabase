// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockHealthRecords
 * @dev Comprehensive health records for livestock
 */
contract FarmLivestockHealthRecords is Ownable {
    struct HealthRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string condition;
        string treatment;
        uint256 recordDate;
        bool recovered;
    }

    mapping(uint256 => HealthRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId
    );

    constructor() Ownable(msg.sender) {}

    function createRecord(
        string memory livestockId,
        string memory condition,
        string memory treatment
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = HealthRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            condition: condition,
            treatment: treatment,
            recordDate: block.timestamp,
            recovered: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit RecordCreated(recordId, msg.sender, livestockId);
        return recordId;
    }

    function markRecovered(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not authorized");
        records[recordId].recovered = true;
    }

    function getRecord(uint256 recordId) public view returns (HealthRecord memory) {
        return records[recordId];
    }
}