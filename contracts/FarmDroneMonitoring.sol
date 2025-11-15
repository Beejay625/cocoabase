// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmDroneMonitoring
 * @dev Onchain system for storing drone monitoring data and aerial imagery analysis
 */
contract FarmDroneMonitoring is Ownable {
    struct DroneMonitoringData {
        uint256 dataId;
        uint256 fieldId;
        string monitoringType;
        string imageHash;
        string analysisResults;
        uint256 flightDate;
        address operator;
    }

    mapping(uint256 => DroneMonitoringData) public droneMonitoringData;
    mapping(address => uint256[]) public dataByOperator;
    uint256 private _dataIdCounter;

    event DroneMonitoringRecorded(
        uint256 indexed dataId,
        address indexed operator,
        string monitoringType
    );

    constructor() Ownable(msg.sender) {}

    function recordDroneMonitoring(
        uint256 fieldId,
        string memory monitoringType,
        string memory imageHash,
        string memory analysisResults,
        uint256 flightDate
    ) public returns (uint256) {
        uint256 dataId = _dataIdCounter++;
        droneMonitoringData[dataId] = DroneMonitoringData({
            dataId: dataId,
            fieldId: fieldId,
            monitoringType: monitoringType,
            imageHash: imageHash,
            analysisResults: analysisResults,
            flightDate: flightDate,
            operator: msg.sender
        });

        dataByOperator[msg.sender].push(dataId);

        emit DroneMonitoringRecorded(dataId, msg.sender, monitoringType);
        return dataId;
    }

    function getData(uint256 dataId) public view returns (DroneMonitoringData memory) {
        return droneMonitoringData[dataId];
    }
}
