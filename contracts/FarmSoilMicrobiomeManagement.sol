// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilMicrobiomeManagement
 * @dev Manage soil microbiome health and diversity
 */
contract FarmSoilMicrobiomeManagement is Ownable {
    struct MicrobiomeAssessment {
        uint256 assessmentId;
        uint256 fieldId;
        uint256 diversityScore;
        uint256 healthScore;
        string[] microorganismTypes;
        uint256 assessedDate;
        address assessor;
    }

    mapping(uint256 => MicrobiomeAssessment) public assessments;
    mapping(address => uint256[]) public assessmentsByOwner;
    uint256 private _assessmentIdCounter;

    event MicrobiomeAssessed(
        uint256 indexed assessmentId,
        address indexed owner,
        uint256 fieldId,
        uint256 diversityScore
    );

    constructor() Ownable(msg.sender) {}

    function assessMicrobiome(
        uint256 fieldId,
        uint256 diversityScore,
        uint256 healthScore,
        string[] memory microorganismTypes
    ) public returns (uint256) {
        uint256 assessmentId = _assessmentIdCounter++;
        assessments[assessmentId] = MicrobiomeAssessment({
            assessmentId: assessmentId,
            fieldId: fieldId,
            diversityScore: diversityScore,
            healthScore: healthScore,
            microorganismTypes: microorganismTypes,
            assessedDate: block.timestamp,
            assessor: msg.sender
        });

        assessmentsByOwner[msg.sender].push(assessmentId);

        emit MicrobiomeAssessed(assessmentId, msg.sender, fieldId, diversityScore);
        return assessmentId;
    }

    function getAssessment(uint256 assessmentId) public view returns (MicrobiomeAssessment memory) {
        return assessments[assessmentId];
    }

    function getAssessmentsByOwner(address owner) public view returns (uint256[] memory) {
        return assessmentsByOwner[owner];
    }
}


