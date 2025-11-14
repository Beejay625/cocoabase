// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockHousingManagement
 * @dev Manage livestock housing conditions
 */
contract FarmLivestockHousingManagement is Ownable {
    struct HousingAssessment {
        uint256 assessmentId;
        uint256 housingId;
        uint256 spaceScore;
        uint256 ventilationScore;
        uint256 cleanlinessScore;
        uint256 overallScore;
        uint256 assessedDate;
        address assessor;
    }

    mapping(uint256 => HousingAssessment) public assessments;
    mapping(address => uint256[]) public assessmentsByOwner;
    uint256 private _assessmentIdCounter;

    event HousingAssessed(
        uint256 indexed assessmentId,
        address indexed owner,
        uint256 housingId,
        uint256 overallScore
    );

    constructor() Ownable(msg.sender) {}

    function assessHousing(
        uint256 housingId,
        uint256 spaceScore,
        uint256 ventilationScore,
        uint256 cleanlinessScore
    ) public returns (uint256) {
        uint256 overallScore = (spaceScore + ventilationScore + cleanlinessScore) / 3;
        
        uint256 assessmentId = _assessmentIdCounter++;
        assessments[assessmentId] = HousingAssessment({
            assessmentId: assessmentId,
            housingId: housingId,
            spaceScore: spaceScore,
            ventilationScore: ventilationScore,
            cleanlinessScore: cleanlinessScore,
            overallScore: overallScore,
            assessedDate: block.timestamp,
            assessor: msg.sender
        });

        assessmentsByOwner[msg.sender].push(assessmentId);

        emit HousingAssessed(assessmentId, msg.sender, housingId, overallScore);
        return assessmentId;
    }

    function getAssessment(uint256 assessmentId) public view returns (HousingAssessment memory) {
        return assessments[assessmentId];
    }

    function getAssessmentsByOwner(address owner) public view returns (uint256[] memory) {
        return assessmentsByOwner[owner];
    }
}

