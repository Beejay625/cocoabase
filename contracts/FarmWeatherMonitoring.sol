// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWeatherMonitoring
 * @dev Onchain system for recording weather data
 */
contract FarmWeatherMonitoring is Ownable {
    struct WeatherRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 temperature;
        uint256 humidity;
        uint256 rainfall;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => WeatherRecord) public weatherRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event WeatherRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        uint256 temperature
    );

    constructor() Ownable(msg.sender) {}

    function recordWeather(
        uint256 plantationId,
        uint256 temperature,
        uint256 humidity,
        uint256 rainfall
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        weatherRecords[recordId] = WeatherRecord({
            recordId: recordId,
            plantationId: plantationId,
            temperature: temperature,
            humidity: humidity,
            rainfall: rainfall,
            recordDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit WeatherRecorded(recordId, msg.sender, temperature);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (WeatherRecord memory) {
        return weatherRecords[recordId];
    }
}



