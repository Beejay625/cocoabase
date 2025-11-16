// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilOrganicMatterTracking
 * @dev Onchain soil organic matter content tracking
 */
contract FarmSoilOrganicMatterTracking is Ownable {
    struct MatterRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 organicMatterPercentage;
        uint256 recordDate;
        string improvementMeasures;
    }

    mapping(uint256 => MatterRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event MatterRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 organicMatterPercentage
    );

    constructor() Ownable(msg.sender) {}

    function recordMatter(
        string memory fieldId,
        uint256 organicMatterPercentage,
        string memory improvementMeasures
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = MatterRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            organicMatterPercentage: organicMatterPercentage,
            recordDate: block.timestamp,
            improvementMeasures: improvementMeasures
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit MatterRecorded(recordId, msg.sender, fieldId, organicMatterPercentage);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MatterRecord memory) {
        return records[recordId];
    }
}
