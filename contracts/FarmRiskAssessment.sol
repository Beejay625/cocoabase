// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRiskAssessment
 * @dev Onchain risk assessment system
 */
contract FarmRiskAssessment is Ownable {
    struct RiskAssessment {
        uint256 assessmentId;
        address farmOwner;
        string riskType;
        uint256 riskLevel; // 1-10 scale
        string description;
        string mitigation;
        uint256 date;
        bool mitigated;
    }

    mapping(uint256 => RiskAssessment) public assessments;
    mapping(address => uint256[]) public assessmentsByOwner;
    uint256 private _assessmentIdCounter;

    event AssessmentCreated(
        uint256 indexed assessmentId,
        address indexed farmOwner,
        string riskType,
        uint256 riskLevel
    );

    event RiskMitigated(
        uint256 indexed assessmentId
    );

    constructor() Ownable(msg.sender) {}

    function createAssessment(
        string memory riskType,
        uint256 riskLevel,
        string memory description,
        string memory mitigation
    ) public returns (uint256) {
        require(riskLevel >= 1 && riskLevel <= 10, "Invalid risk level");

        uint256 assessmentId = _assessmentIdCounter++;
        assessments[assessmentId] = RiskAssessment({
            assessmentId: assessmentId,
            farmOwner: msg.sender,
            riskType: riskType,
            riskLevel: riskLevel,
            description: description,
            mitigation: mitigation,
            date: block.timestamp,
            mitigated: false
        });

        assessmentsByOwner[msg.sender].push(assessmentId);

        emit AssessmentCreated(assessmentId, msg.sender, riskType, riskLevel);
        return assessmentId;
    }

    function markAsMitigated(uint256 assessmentId) public {
        RiskAssessment storage assessment = assessments[assessmentId];
        require(assessment.farmOwner == msg.sender, "Not the owner");
        require(!assessment.mitigated, "Already mitigated");

        assessment.mitigated = true;

        emit RiskMitigated(assessmentId);
    }

    function getAssessment(uint256 assessmentId) public view returns (RiskAssessment memory) {
        return assessments[assessmentId];
    }

    function getAssessmentsByOwner(address owner) public view returns (uint256[] memory) {
        return assessmentsByOwner[owner];
    }
}

