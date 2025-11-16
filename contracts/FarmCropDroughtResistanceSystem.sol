// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropDroughtResistanceSystem
 * @dev Onchain drought resistance tracking system
 */
contract FarmCropDroughtResistanceSystem is Ownable {
    struct ResistanceRecord {
        uint256 recordId;
        address farmer;
        string cropVariety;
        uint256 resistanceScore;
        uint256 waterEfficiency;
        uint256 assessmentDate;
        string adaptationMeasures;
    }

    mapping(uint256 => ResistanceRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ResistanceRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string cropVariety,
        uint256 resistanceScore
    );

    constructor() Ownable(msg.sender) {}

    function recordResistance(
        string memory cropVariety,
        uint256 resistanceScore,
        uint256 waterEfficiency,
        string memory adaptationMeasures
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ResistanceRecord({
            recordId: recordId,
            farmer: msg.sender,
            cropVariety: cropVariety,
            resistanceScore: resistanceScore,
            waterEfficiency: waterEfficiency,
            assessmentDate: block.timestamp,
            adaptationMeasures: adaptationMeasures
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ResistanceRecorded(recordId, msg.sender, cropVariety, resistanceScore);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ResistanceRecord memory) {
        return records[recordId];
    }
}

