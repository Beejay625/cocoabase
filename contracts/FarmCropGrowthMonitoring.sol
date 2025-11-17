// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropGrowthMonitoring
 * @dev Real-time crop growth monitoring and tracking
 */
contract FarmCropGrowthMonitoring is Ownable {
    struct GrowthMeasurement {
        uint256 measurementId;
        address farmer;
        string fieldId;
        uint256 plantHeight;
        uint256 leafCount;
        uint256 measurementDate;
    }

    mapping(uint256 => GrowthMeasurement) public measurements;
    mapping(address => uint256[]) public measurementsByFarmer;
    uint256 private _measurementIdCounter;

    event MeasurementRecorded(
        uint256 indexed measurementId,
        address indexed farmer,
        uint256 plantHeight
    );

    constructor() Ownable(msg.sender) {}

    function recordMeasurement(
        string memory fieldId,
        uint256 plantHeight,
        uint256 leafCount
    ) public returns (uint256) {
        uint256 measurementId = _measurementIdCounter++;
        measurements[measurementId] = GrowthMeasurement({
            measurementId: measurementId,
            farmer: msg.sender,
            fieldId: fieldId,
            plantHeight: plantHeight,
            leafCount: leafCount,
            measurementDate: block.timestamp
        });

        measurementsByFarmer[msg.sender].push(measurementId);
        emit MeasurementRecorded(measurementId, msg.sender, plantHeight);
        return measurementId;
    }

    function getMeasurement(uint256 measurementId) public view returns (GrowthMeasurement memory) {
        return measurements[measurementId];
    }
}
