// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropWaterEfficiency
 * @dev Track water efficiency metrics for crops
 */
contract FarmCropWaterEfficiency is Ownable {
    struct EfficiencyRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 waterUsed;
        uint256 yieldProduced;
        uint256 efficiencyRatio;
        uint256 recordedDate;
        address recorder;
    }

    mapping(uint256 => EfficiencyRecord) public records;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event EfficiencyRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 plantationId,
        uint256 efficiencyRatio
    );

    constructor() Ownable(msg.sender) {}

    function recordEfficiency(
        uint256 plantationId,
        uint256 waterUsed,
        uint256 yieldProduced
    ) public returns (uint256) {
        uint256 efficiencyRatio = (yieldProduced * 100) / waterUsed;
        
        uint256 recordId = _recordIdCounter++;
        records[recordId] = EfficiencyRecord({
            recordId: recordId,
            plantationId: plantationId,
            waterUsed: waterUsed,
            yieldProduced: yieldProduced,
            efficiencyRatio: efficiencyRatio,
            recordedDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByOwner[msg.sender].push(recordId);

        emit EfficiencyRecorded(recordId, msg.sender, plantationId, efficiencyRatio);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (EfficiencyRecord memory) {
        return records[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}

