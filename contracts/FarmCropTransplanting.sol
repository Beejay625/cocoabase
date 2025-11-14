// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropTransplanting
 * @dev Onchain system for tracking crop transplanting activities
 */
contract FarmCropTransplanting is Ownable {
    struct TransplantRecord {
        uint256 recordId;
        uint256 sourcePlantationId;
        uint256 targetPlantationId;
        uint256 plantsTransplanted;
        uint256 transplantDate;
        address transplanter;
    }

    mapping(uint256 => TransplantRecord) public transplantRecords;
    mapping(address => uint256[]) public recordsByTransplanter;
    uint256 private _recordIdCounter;

    event TransplantRecorded(
        uint256 indexed recordId,
        address indexed transplanter,
        uint256 plantsTransplanted
    );

    constructor() Ownable(msg.sender) {}

    function recordTransplant(
        uint256 sourcePlantationId,
        uint256 targetPlantationId,
        uint256 plantsTransplanted
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        transplantRecords[recordId] = TransplantRecord({
            recordId: recordId,
            sourcePlantationId: sourcePlantationId,
            targetPlantationId: targetPlantationId,
            plantsTransplanted: plantsTransplanted,
            transplantDate: block.timestamp,
            transplanter: msg.sender
        });

        recordsByTransplanter[msg.sender].push(recordId);

        emit TransplantRecorded(recordId, msg.sender, plantsTransplanted);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (TransplantRecord memory) {
        return transplantRecords[recordId];
    }
}

