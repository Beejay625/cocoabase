// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropDroughtResistance
 * @dev Track crop drought resistance levels
 */
contract FarmCropDroughtResistance is Ownable {
    struct ResistanceRecord {
        uint256 recordId;
        uint256 plantationId;
        string cropType;
        uint256 resistanceLevel;
        uint256 testDuration;
        uint256 testDate;
        address tester;
    }

    mapping(uint256 => ResistanceRecord) public records;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event ResistanceRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 plantationId,
        uint256 resistanceLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordResistance(
        uint256 plantationId,
        string memory cropType,
        uint256 resistanceLevel,
        uint256 testDuration
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ResistanceRecord({
            recordId: recordId,
            plantationId: plantationId,
            cropType: cropType,
            resistanceLevel: resistanceLevel,
            testDuration: testDuration,
            testDate: block.timestamp,
            tester: msg.sender
        });

        recordsByOwner[msg.sender].push(recordId);

        emit ResistanceRecorded(recordId, msg.sender, plantationId, resistanceLevel);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ResistanceRecord memory) {
        return records[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}


