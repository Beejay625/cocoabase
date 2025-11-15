// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmIoTDeviceIntegration
 * @dev Onchain system for integrating and storing IoT device sensor data
 */
contract FarmIoTDeviceIntegration is Ownable {
    struct IoTDeviceData {
        uint256 dataId;
        uint256 deviceId;
        string deviceType;
        string sensorType;
        string sensorReading;
        uint256 timestamp;
        address deviceOwner;
    }

    mapping(uint256 => IoTDeviceData) public iotDeviceData;
    mapping(address => uint256[]) public dataByDeviceOwner;
    uint256 private _dataIdCounter;

    event IoTDataRecorded(
        uint256 indexed dataId,
        address indexed deviceOwner,
        string sensorType
    );

    constructor() Ownable(msg.sender) {}

    function recordIoTData(
        uint256 deviceId,
        string memory deviceType,
        string memory sensorType,
        string memory sensorReading,
        uint256 timestamp
    ) public returns (uint256) {
        uint256 dataId = _dataIdCounter++;
        iotDeviceData[dataId] = IoTDeviceData({
            dataId: dataId,
            deviceId: deviceId,
            deviceType: deviceType,
            sensorType: sensorType,
            sensorReading: sensorReading,
            timestamp: timestamp,
            deviceOwner: msg.sender
        });

        dataByDeviceOwner[msg.sender].push(dataId);

        emit IoTDataRecorded(dataId, msg.sender, sensorType);
        return dataId;
    }

    function getData(uint256 dataId) public view returns (IoTDeviceData memory) {
        return iotDeviceData[dataId];
    }
}

