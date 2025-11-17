// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilSalinityMonitoring
 * @dev Soil salinity monitoring and alert system
 */
contract FarmSoilSalinityMonitoring is Ownable {
    struct SalinityMeasurement {
        uint256 measurementId;
        address farmer;
        string fieldId;
        uint256 salinityLevel;
        uint256 measurementDate;
        bool requiresAction;
    }

    mapping(uint256 => SalinityMeasurement) public measurements;
    uint256 private _measurementIdCounter;

    event MeasurementRecorded(
        uint256 indexed measurementId,
        address indexed farmer,
        uint256 salinityLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordMeasurement(
        string memory fieldId,
        uint256 salinityLevel
    ) public returns (uint256) {
        bool requiresAction = salinityLevel > 4000;
        uint256 measurementId = _measurementIdCounter++;
        measurements[measurementId] = SalinityMeasurement({
            measurementId: measurementId,
            farmer: msg.sender,
            fieldId: fieldId,
            salinityLevel: salinityLevel,
            measurementDate: block.timestamp,
            requiresAction: requiresAction
        });

        emit MeasurementRecorded(measurementId, msg.sender, salinityLevel);
        return measurementId;
    }

    function getMeasurement(uint256 measurementId) public view returns (SalinityMeasurement memory) {
        return measurements[measurementId];
    }
}
