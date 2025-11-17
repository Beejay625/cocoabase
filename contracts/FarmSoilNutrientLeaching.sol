// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilNutrientLeaching
 * @dev Nutrient leaching prevention and tracking
 */
contract FarmSoilNutrientLeaching is Ownable {
    struct LeachingRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 nutrientLoss;
        uint256 preventionMeasure;
        uint256 recordDate;
        bool reduced;
    }

    mapping(uint256 => LeachingRecord) public records;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 nutrientLoss
    );

    constructor() Ownable(msg.sender) {}

    function recordLeaching(
        string memory fieldId,
        uint256 nutrientLoss,
        uint256 preventionMeasure
    ) public returns (uint256) {
        bool reduced = preventionMeasure > 0;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = LeachingRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            nutrientLoss: nutrientLoss,
            preventionMeasure: preventionMeasure,
            recordDate: block.timestamp,
            reduced: reduced
        });

        emit RecordCreated(recordId, msg.sender, nutrientLoss);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (LeachingRecord memory) {
        return records[recordId];
    }
}
