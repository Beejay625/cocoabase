// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWoolProductionQuality
 * @dev Onchain wool production and fiber quality tracking
 */
contract FarmLivestockWoolProductionQuality is Ownable {
    struct ProductionRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 woolWeight;
        uint256 fiberDiameter;
        uint256 stapleLength;
        uint256 productionDate;
        string grade;
    }

    mapping(uint256 => ProductionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ProductionRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        uint256 woolWeight,
        string grade
    );

    constructor() Ownable(msg.sender) {}

    function recordProduction(
        string memory livestockId,
        uint256 woolWeight,
        uint256 fiberDiameter,
        uint256 stapleLength,
        string memory grade
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ProductionRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            woolWeight: woolWeight,
            fiberDiameter: fiberDiameter,
            stapleLength: stapleLength,
            productionDate: block.timestamp,
            grade: grade
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ProductionRecorded(recordId, msg.sender, livestockId, woolWeight, grade);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ProductionRecord memory) {
        return records[recordId];
    }
}

