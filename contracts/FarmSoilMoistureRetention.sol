// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilMoistureRetention
 * @dev Soil moisture retention tracking and improvement
 */
contract FarmSoilMoistureRetention is Ownable {
    struct RetentionMeasurement {
        uint256 measurementId;
        address farmer;
        string fieldId;
        uint256 retentionRate;
        uint256 measurementDate;
        bool improved;
    }

    mapping(uint256 => RetentionMeasurement) public measurements;
    uint256 private _measurementIdCounter;

    event MeasurementRecorded(
        uint256 indexed measurementId,
        address indexed farmer,
        uint256 retentionRate
    );

    constructor() Ownable(msg.sender) {}

    function recordMeasurement(
        string memory fieldId,
        uint256 retentionRate
    ) public returns (uint256) {
        uint256 measurementId = _measurementIdCounter++;
        measurements[measurementId] = RetentionMeasurement({
            measurementId: measurementId,
            farmer: msg.sender,
            fieldId: fieldId,
            retentionRate: retentionRate,
            measurementDate: block.timestamp,
            improved: false
        });

        emit MeasurementRecorded(measurementId, msg.sender, retentionRate);
        return measurementId;
    }

    function markImproved(uint256 measurementId) public {
        require(measurements[measurementId].farmer == msg.sender, "Not authorized");
        measurements[measurementId].improved = true;
    }

    function getMeasurement(uint256 measurementId) public view returns (RetentionMeasurement memory) {
        return measurements[measurementId];
    }
}
