// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilMoistureMonitoring
 * @dev Monitor soil moisture levels across fields
 */
contract FarmSoilMoistureMonitoring is Ownable {
    struct MoistureReading {
        uint256 readingId;
        uint256 fieldId;
        uint256 moistureLevel;
        uint256 depth;
        uint256 temperature;
        uint256 recordedAt;
        address recorder;
        string location;
    }

    struct FieldMoistureHistory {
        uint256 fieldId;
        uint256[] readingIds;
        uint256 averageMoisture;
        uint256 lastReading;
    }

    mapping(uint256 => MoistureReading) public moistureReadings;
    mapping(uint256 => FieldMoistureHistory) public fieldHistory;
    mapping(address => uint256[]) public readingsByOwner;
    uint256 private _readingIdCounter;

    event MoistureRecorded(
        uint256 indexed readingId,
        address indexed owner,
        uint256 fieldId,
        uint256 moistureLevel
    );

    event LowMoistureAlert(
        uint256 indexed fieldId,
        uint256 moistureLevel,
        uint256 threshold
    );

    constructor() Ownable(msg.sender) {}

    function recordMoisture(
        uint256 fieldId,
        uint256 moistureLevel,
        uint256 depth,
        uint256 temperature,
        string memory location
    ) public returns (uint256) {
        uint256 readingId = _readingIdCounter++;
        moistureReadings[readingId] = MoistureReading({
            readingId: readingId,
            fieldId: fieldId,
            moistureLevel: moistureLevel,
            depth: depth,
            temperature: temperature,
            recordedAt: block.timestamp,
            recorder: msg.sender,
            location: location
        });

        readingsByOwner[msg.sender].push(readingId);

        if (fieldHistory[fieldId].fieldId == 0) {
            fieldHistory[fieldId] = FieldMoistureHistory({
                fieldId: fieldId,
                readingIds: new uint256[](0),
                averageMoisture: 0,
                lastReading: 0
            });
        }
        fieldHistory[fieldId].readingIds.push(readingId);
        fieldHistory[fieldId].lastReading = block.timestamp;

        if (moistureLevel < 30) {
            emit LowMoistureAlert(fieldId, moistureLevel, 30);
        }

        emit MoistureRecorded(readingId, msg.sender, fieldId, moistureLevel);
        return readingId;
    }

    function getMoistureReading(uint256 readingId) public view returns (MoistureReading memory) {
        return moistureReadings[readingId];
    }

    function getReadingsByOwner(address owner) public view returns (uint256[] memory) {
        return readingsByOwner[owner];
    }
}


