// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPrecisionAgriculture
 * @dev Onchain system for storing precision agriculture data and analytics
 */
contract FarmPrecisionAgriculture is Ownable {
    struct PrecisionData {
        uint256 dataId;
        uint256 fieldId;
        string dataType;
        string coordinates;
        string sensorData;
        uint256 timestamp;
        address recorder;
    }

    mapping(uint256 => PrecisionData) public precisionDataRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _dataIdCounter;

    event PrecisionDataRecorded(
        uint256 indexed dataId,
        address indexed recorder,
        string dataType
    );

    constructor() Ownable(msg.sender) {}

    function recordPrecisionData(
        uint256 fieldId,
        string memory dataType,
        string memory coordinates,
        string memory sensorData,
        uint256 timestamp
    ) public returns (uint256) {
        uint256 dataId = _dataIdCounter++;
        precisionDataRecords[dataId] = PrecisionData({
            dataId: dataId,
            fieldId: fieldId,
            dataType: dataType,
            coordinates: coordinates,
            sensorData: sensorData,
            timestamp: timestamp,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(dataId);

        emit PrecisionDataRecorded(dataId, msg.sender, dataType);
        return dataId;
    }

    function getData(uint256 dataId) public view returns (PrecisionData memory) {
        return precisionDataRecords[dataId];
    }
}

