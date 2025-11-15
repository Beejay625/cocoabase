// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropDiseaseResistance
 * @dev Track disease resistance in crops
 */
contract FarmCropDiseaseResistance is Ownable {
    struct DiseaseResistanceRecord {
        uint256 recordId;
        uint256 plantationId;
        string cropType;
        string diseaseType;
        uint256 resistanceLevel;
        uint256 testDate;
        string testMethod;
        address tester;
        bool verified;
    }

    struct DiseaseOutbreak {
        uint256 outbreakId;
        uint256 plantationId;
        string diseaseType;
        uint256 severity;
        uint256 detectedDate;
        address detector;
        bool contained;
    }

    mapping(uint256 => DiseaseResistanceRecord) public resistanceRecords;
    mapping(uint256 => DiseaseOutbreak) public diseaseOutbreaks;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;
    uint256 private _outbreakIdCounter;

    event ResistanceRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 plantationId,
        uint256 resistanceLevel
    );

    event OutbreakDetected(
        uint256 indexed outbreakId,
        uint256 plantationId,
        string diseaseType
    );

    constructor() Ownable(msg.sender) {}

    function recordDiseaseResistance(
        uint256 plantationId,
        string memory cropType,
        string memory diseaseType,
        uint256 resistanceLevel,
        string memory testMethod
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        resistanceRecords[recordId] = DiseaseResistanceRecord({
            recordId: recordId,
            plantationId: plantationId,
            cropType: cropType,
            diseaseType: diseaseType,
            resistanceLevel: resistanceLevel,
            testDate: block.timestamp,
            testMethod: testMethod,
            tester: msg.sender,
            verified: false
        });

        recordsByOwner[msg.sender].push(recordId);

        emit ResistanceRecorded(recordId, msg.sender, plantationId, resistanceLevel);
        return recordId;
    }

    function detectOutbreak(
        uint256 plantationId,
        string memory diseaseType,
        uint256 severity
    ) public returns (uint256) {
        uint256 outbreakId = _outbreakIdCounter++;
        diseaseOutbreaks[outbreakId] = DiseaseOutbreak({
            outbreakId: outbreakId,
            plantationId: plantationId,
            diseaseType: diseaseType,
            severity: severity,
            detectedDate: block.timestamp,
            detector: msg.sender,
            contained: false
        });

        emit OutbreakDetected(outbreakId, plantationId, diseaseType);
        return outbreakId;
    }

    function containOutbreak(uint256 outbreakId) public {
        require(diseaseOutbreaks[outbreakId].detector == msg.sender, "Not detector");
        diseaseOutbreaks[outbreakId].contained = true;
    }

    function getResistanceRecord(uint256 recordId) public view returns (DiseaseResistanceRecord memory) {
        return resistanceRecords[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}


