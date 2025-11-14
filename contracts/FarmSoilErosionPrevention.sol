// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilErosionPrevention
 * @dev Track and prevent soil erosion
 */
contract FarmSoilErosionPrevention is Ownable {
    struct ErosionAssessment {
        uint256 assessmentId;
        uint256 fieldId;
        uint256 erosionRate;
        uint256 soilLoss;
        uint256 slopeAngle;
        uint256 assessedDate;
        address assessor;
    }

    struct PreventionMeasure {
        uint256 measureId;
        uint256 assessmentId;
        string measureType;
        uint256 implementationDate;
        uint256 expectedReduction;
        address implementer;
        bool completed;
    }

    mapping(uint256 => ErosionAssessment) public erosionAssessments;
    mapping(uint256 => PreventionMeasure) public preventionMeasures;
    mapping(address => uint256[]) public assessmentsByOwner;
    uint256 private _assessmentIdCounter;
    uint256 private _measureIdCounter;

    event ErosionAssessed(
        uint256 indexed assessmentId,
        address indexed owner,
        uint256 fieldId,
        uint256 erosionRate
    );

    event PreventionMeasureImplemented(
        uint256 indexed measureId,
        uint256 indexed assessmentId
    );

    constructor() Ownable(msg.sender) {}

    function assessErosion(
        uint256 fieldId,
        uint256 erosionRate,
        uint256 soilLoss,
        uint256 slopeAngle
    ) public returns (uint256) {
        uint256 assessmentId = _assessmentIdCounter++;
        erosionAssessments[assessmentId] = ErosionAssessment({
            assessmentId: assessmentId,
            fieldId: fieldId,
            erosionRate: erosionRate,
            soilLoss: soilLoss,
            slopeAngle: slopeAngle,
            assessedDate: block.timestamp,
            assessor: msg.sender
        });

        assessmentsByOwner[msg.sender].push(assessmentId);

        emit ErosionAssessed(assessmentId, msg.sender, fieldId, erosionRate);
        return assessmentId;
    }

    function implementPreventionMeasure(
        uint256 assessmentId,
        string memory measureType,
        uint256 expectedReduction
    ) public returns (uint256) {
        require(erosionAssessments[assessmentId].assessor == msg.sender, "Not assessor");
        
        uint256 measureId = _measureIdCounter++;
        preventionMeasures[measureId] = PreventionMeasure({
            measureId: measureId,
            assessmentId: assessmentId,
            measureType: measureType,
            implementationDate: block.timestamp,
            expectedReduction: expectedReduction,
            implementer: msg.sender,
            completed: false
        });

        emit PreventionMeasureImplemented(measureId, assessmentId);
        return measureId;
    }

    function completeMeasure(uint256 measureId) public {
        require(preventionMeasures[measureId].implementer == msg.sender, "Not implementer");
        preventionMeasures[measureId].completed = true;
    }

    function getErosionAssessment(uint256 assessmentId) public view returns (ErosionAssessment memory) {
        return erosionAssessments[assessmentId];
    }

    function getAssessmentsByOwner(address owner) public view returns (uint256[] memory) {
        return assessmentsByOwner[owner];
    }
}

