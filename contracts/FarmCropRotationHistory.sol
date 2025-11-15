// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropRotationHistory
 * @dev Onchain historical tracking of crop rotation patterns
 */
contract FarmCropRotationHistory is Ownable {
    struct RotationRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string cropType;
        uint256 plantingDate;
        uint256 harvestDate;
        uint256 yield;
        string notes;
    }

    mapping(uint256 => RotationRecord) public records;
    mapping(string => uint256[]) public recordsByFieldId;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event RotationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string cropType
    );

    constructor() Ownable(msg.sender) {}

    function recordRotation(
        string memory fieldId,
        string memory cropType,
        uint256 plantingDate,
        uint256 harvestDate,
        uint256 yield,
        string memory notes
    ) public returns (uint256) {
        require(bytes(fieldId).length > 0, "Field ID required");
        require(bytes(cropType).length > 0, "Crop type required");

        uint256 recordId = _recordIdCounter++;
        records[recordId] = RotationRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            cropType: cropType,
            plantingDate: plantingDate,
            harvestDate: harvestDate,
            yield: yield,
            notes: notes
        });

        recordsByFieldId[fieldId].push(recordId);
        recordsByFarmer[msg.sender].push(recordId);

        emit RotationRecorded(recordId, msg.sender, fieldId, cropType);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (RotationRecord memory) {
        return records[recordId];
    }

    function getRotationHistory(string memory fieldId) public view returns (uint256[] memory) {
        return recordsByFieldId[fieldId];
    }
}

