// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmIoTDeviceIntegration
 * @dev Integrate and store IoT device sensor data
 */
contract FarmIoTDeviceIntegration is Ownable {
    struct SensorReading {
        uint256 readingId;
        address deviceOwner;
        string deviceId;
        string sensorType;
        uint256 value;
        uint256 timestamp;
    }

    mapping(uint256 => SensorReading) public readings;
    mapping(string => uint256[]) public readingsByDevice;
    mapping(address => string[]) public devicesByOwner;
    uint256 private _readingIdCounter;

    event SensorReadingRecorded(
        uint256 indexed readingId,
        string indexed deviceId,
        string sensorType
    );
    event DeviceRegistered(address indexed owner, string deviceId);

    constructor() Ownable(msg.sender) {}

    function registerDevice(string memory deviceId) public {
        devicesByOwner[msg.sender].push(deviceId);
        emit DeviceRegistered(msg.sender, deviceId);
    }

    function recordReading(
        string memory deviceId,
        string memory sensorType,
        uint256 value
    ) public returns (uint256) {
        uint256 readingId = _readingIdCounter++;
        readings[readingId] = SensorReading({
            readingId: readingId,
            deviceOwner: msg.sender,
            deviceId: deviceId,
            sensorType: sensorType,
            value: value,
            timestamp: block.timestamp
        });
        readingsByDevice[deviceId].push(readingId);
        emit SensorReadingRecorded(readingId, deviceId, sensorType);
        return readingId;
    }

    function getDeviceReadings(string memory deviceId) public view returns (uint256[] memory) {
        return readingsByDevice[deviceId];
    }
}
