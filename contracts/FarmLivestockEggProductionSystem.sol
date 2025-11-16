// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockEggProductionSystem
 * @dev Onchain egg production and quality grading tracking system
 */
contract FarmLivestockEggProductionSystem is Ownable {
    struct ProductionRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 eggsProduced;
        uint256 productionDate;
        string qualityGrade;
        uint256 averageWeight;
        string notes;
    }

    mapping(uint256 => ProductionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ProductionRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        uint256 eggsProduced
    );

    constructor() Ownable(msg.sender) {}

    function recordProduction(
        string memory livestockId,
        uint256 eggsProduced,
        string memory qualityGrade,
        uint256 averageWeight,
        string memory notes
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ProductionRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            eggsProduced: eggsProduced,
            productionDate: block.timestamp,
            qualityGrade: qualityGrade,
            averageWeight: averageWeight,
            notes: notes
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ProductionRecorded(recordId, msg.sender, livestockId, eggsProduced);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ProductionRecord memory) {
        return records[recordId];
    }
}

