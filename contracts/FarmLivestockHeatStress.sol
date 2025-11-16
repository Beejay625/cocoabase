// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockHeatStress
 * @dev Track heat stress in livestock and mitigation measures
 */
contract FarmLivestockHeatStress is Ownable {
    struct HeatStressRecord {
        uint256 recordId;
        address farmer;
        string livestockType;
        uint256 temperature;
        uint256 humidity;
        uint256 stressLevel;
        uint256 recordDate;
        string mitigationActions;
    }

    mapping(uint256 => HeatStressRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event StressRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 stressLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordStress(
        string memory livestockType,
        uint256 temperature,
        uint256 humidity,
        uint256 stressLevel,
        string memory mitigationActions
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = HeatStressRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockType: livestockType,
            temperature: temperature,
            humidity: humidity,
            stressLevel: stressLevel,
            recordDate: block.timestamp,
            mitigationActions: mitigationActions
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit StressRecorded(recordId, msg.sender, stressLevel);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (HeatStressRecord memory) {
        return records[recordId];
    }
}
