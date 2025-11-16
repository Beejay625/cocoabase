// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropRotationHistory
 * @dev Crop rotation history tracking
 */
contract FarmCropRotationHistory is Ownable {
    struct RotationRecord {
        uint256 recordId;
        address farmer;
        uint256 fieldId;
        string previousCrop;
        string currentCrop;
        uint256 rotationDate;
    }

    mapping(uint256 => RotationRecord) public rotationRecords;
    mapping(uint256 => uint256[]) public recordsByField;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event RotationRecorded(
        uint256 indexed recordId,
        uint256 fieldId,
        string currentCrop
    );

    constructor() Ownable(msg.sender) {}

    function recordRotation(
        uint256 fieldId,
        string memory previousCrop,
        string memory currentCrop
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        rotationRecords[recordId] = RotationRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            previousCrop: previousCrop,
            currentCrop: currentCrop,
            rotationDate: block.timestamp
        });
        recordsByField[fieldId].push(recordId);
        recordsByFarmer[msg.sender].push(recordId);
        emit RotationRecorded(recordId, fieldId, currentCrop);
        return recordId;
    }

    function getRotationHistory(uint256 fieldId) public view returns (uint256[] memory) {
        return recordsByField[fieldId];
    }
}
