// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWeatherData
 * @dev Onchain weather data oracle and tracking
 */
contract FarmWeatherData is Ownable {
    struct WeatherRecord {
        uint256 recordId;
        string location;
        uint256 timestamp;
        int256 temperature;
        uint256 humidity;
        uint256 rainfall;
        uint256 windSpeed;
        string conditions;
        address reporter;
    }

    mapping(uint256 => WeatherRecord) public weatherRecords;
    mapping(string => uint256[]) public recordsByLocation;
    uint256 private _recordIdCounter;

    event WeatherDataRecorded(
        uint256 indexed recordId,
        string indexed location,
        uint256 timestamp,
        int256 temperature,
        uint256 rainfall
    );

    constructor() Ownable(msg.sender) {}

    function recordWeatherData(
        string memory location,
        int256 temperature,
        uint256 humidity,
        uint256 rainfall,
        uint256 windSpeed,
        string memory conditions
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        weatherRecords[recordId] = WeatherRecord({
            recordId: recordId,
            location: location,
            timestamp: block.timestamp,
            temperature: temperature,
            humidity: humidity,
            rainfall: rainfall,
            windSpeed: windSpeed,
            conditions: conditions,
            reporter: msg.sender
        });

        recordsByLocation[location].push(recordId);

        emit WeatherDataRecorded(recordId, location, block.timestamp, temperature, rainfall);
        return recordId;
    }

    function getWeatherRecord(uint256 recordId) public view returns (WeatherRecord memory) {
        return weatherRecords[recordId];
    }

    function getRecordsByLocation(string memory location) public view returns (uint256[] memory) {
        return recordsByLocation[location];
    }

    function getLatestWeatherRecord(string memory location) public view returns (WeatherRecord memory) {
        uint256[] memory records = recordsByLocation[location];
        require(records.length > 0, "No records found");
        uint256 latestRecordId = records[records.length - 1];
        return weatherRecords[latestRecordId];
    }
}

