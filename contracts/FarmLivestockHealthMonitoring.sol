// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockHealthMonitoring
 * @dev Onchain comprehensive livestock health monitoring
 */
contract FarmLivestockHealthMonitoring is Ownable {
    struct HealthRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string healthStatus;
        uint256 temperature;
        uint256 weight;
        uint256 recordDate;
        string observations;
    }

    mapping(uint256 => HealthRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event HealthRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string healthStatus
    );

    constructor() Ownable(msg.sender) {}

    function recordHealth(
        string memory livestockId,
        string memory healthStatus,
        uint256 temperature,
        uint256 weight,
        string memory observations
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = HealthRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            healthStatus: healthStatus,
            temperature: temperature,
            weight: weight,
            recordDate: block.timestamp,
            observations: observations
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit HealthRecorded(recordId, msg.sender, livestockId, healthStatus);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (HealthRecord memory) {
        return records[recordId];
    }
}

