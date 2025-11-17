// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropNutrientDeficiencyDetection
 * @dev Onchain nutrient deficiency detection and recommendations
 */
contract FarmCropNutrientDeficiencyDetection is Ownable {
    struct DeficiencyRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string nutrientType;
        uint256 deficiencyLevel;
        uint256 detectionDate;
        string recommendations;
        bool isResolved;
    }

    mapping(uint256 => DeficiencyRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event DeficiencyDetected(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string nutrientType
    );

    constructor() Ownable(msg.sender) {}

    function recordDeficiency(
        string memory fieldId,
        string memory nutrientType,
        uint256 deficiencyLevel,
        string memory recommendations
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = DeficiencyRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            nutrientType: nutrientType,
            deficiencyLevel: deficiencyLevel,
            detectionDate: block.timestamp,
            recommendations: recommendations,
            isResolved: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit DeficiencyDetected(recordId, msg.sender, fieldId, nutrientType);
        return recordId;
    }

    function resolveDeficiency(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].isResolved = true;
    }

    function getRecord(uint256 recordId) public view returns (DeficiencyRecord memory) {
        return records[recordId];
    }
}

