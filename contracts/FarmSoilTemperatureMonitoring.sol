// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilTemperatureMonitoring
 * @dev Soil temperature monitoring and alert system
 */
contract FarmSoilTemperatureMonitoring is Ownable {
    struct TemperatureRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        int256 temperature;
        uint256 depth;
        uint256 recordDate;
        bool optimal;
    }

    mapping(uint256 => TemperatureRecord) public records;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        address indexed farmer,
        int256 temperature
    );

    constructor() Ownable(msg.sender) {}

    function recordTemperature(
        string memory fieldId,
        int256 temperature,
        uint256 depth
    ) public returns (uint256) {
        bool optimal = temperature >= 15 && temperature <= 25;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = TemperatureRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            temperature: temperature,
            depth: depth,
            recordDate: block.timestamp,
            optimal: optimal
        });

        emit RecordCreated(recordId, msg.sender, temperature);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (TemperatureRecord memory) {
        return records[recordId];
    }
}
