// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPestResistanceTracking
 * @dev Track pest resistance levels in crops
 */
contract FarmCropPestResistanceTracking is Ownable {
    struct ResistanceRecord {
        uint256 recordId;
        uint256 plantationId;
        string cropType;
        string pestType;
        uint256 resistanceLevel;
        uint256 testDate;
        string testMethod;
        address tester;
        bool verified;
    }

    struct ResistanceHistory {
        uint256 plantationId;
        uint256[] recordIds;
        uint256 averageResistance;
    }

    mapping(uint256 => ResistanceRecord) public resistanceRecords;
    mapping(uint256 => ResistanceHistory) public resistanceHistory;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event ResistanceRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 plantationId,
        uint256 resistanceLevel
    );

    event ResistanceVerified(
        uint256 indexed recordId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function recordResistance(
        uint256 plantationId,
        string memory cropType,
        string memory pestType,
        uint256 resistanceLevel,
        string memory testMethod
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        resistanceRecords[recordId] = ResistanceRecord({
            recordId: recordId,
            plantationId: plantationId,
            cropType: cropType,
            pestType: pestType,
            resistanceLevel: resistanceLevel,
            testDate: block.timestamp,
            testMethod: testMethod,
            tester: msg.sender,
            verified: false
        });

        recordsByOwner[msg.sender].push(recordId);

        if (resistanceHistory[plantationId].plantationId == 0) {
            resistanceHistory[plantationId] = ResistanceHistory({
                plantationId: plantationId,
                recordIds: new uint256[](0),
                averageResistance: 0
            });
        }
        resistanceHistory[plantationId].recordIds.push(recordId);

        emit ResistanceRecorded(recordId, msg.sender, plantationId, resistanceLevel);
        return recordId;
    }

    function verifyResistance(uint256 recordId) public {
        require(resistanceRecords[recordId].tester == msg.sender, "Not tester");
        resistanceRecords[recordId].verified = true;
        emit ResistanceVerified(recordId, msg.sender);
    }

    function getResistanceRecord(uint256 recordId) public view returns (ResistanceRecord memory) {
        return resistanceRecords[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}

