// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterConservation
 * @dev Onchain system for tracking water conservation efforts and efficiency
 */
contract FarmWaterConservation is Ownable {
    struct ConservationRecord {
        uint256 recordId;
        uint256 fieldId;
        uint256 waterSaved;
        string conservationMethod;
        uint256 efficiencyImprovement;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => ConservationRecord) public conservationRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event ConservationRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        uint256 waterSaved
    );

    constructor() Ownable(msg.sender) {}

    function recordConservation(
        uint256 fieldId,
        uint256 waterSaved,
        string memory conservationMethod,
        uint256 efficiencyImprovement,
        uint256 recordDate
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        conservationRecords[recordId] = ConservationRecord({
            recordId: recordId,
            fieldId: fieldId,
            waterSaved: waterSaved,
            conservationMethod: conservationMethod,
            efficiencyImprovement: efficiencyImprovement,
            recordDate: recordDate,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit ConservationRecorded(recordId, msg.sender, waterSaved);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ConservationRecord memory) {
        return conservationRecords[recordId];
    }
}

