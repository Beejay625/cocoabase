// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWelfareMonitoring
 * @dev Monitor animal welfare indicators
 */
contract FarmLivestockWelfareMonitoring is Ownable {
    struct WelfareAssessment {
        uint256 assessmentId;
        uint256 livestockId;
        uint256 healthScore;
        uint256 behaviorScore;
        uint256 environmentScore;
        uint256 nutritionScore;
        uint256 overallScore;
        uint256 assessedDate;
        address assessor;
    }

    struct WelfareAlert {
        uint256 alertId;
        uint256 livestockId;
        string alertType;
        uint256 severity;
        uint256 detectedDate;
        address detector;
        bool resolved;
    }

    mapping(uint256 => WelfareAssessment) public welfareAssessments;
    mapping(uint256 => WelfareAlert) public welfareAlerts;
    mapping(address => uint256[]) public assessmentsByOwner;
    uint256 private _assessmentIdCounter;
    uint256 private _alertIdCounter;

    event WelfareAssessed(
        uint256 indexed assessmentId,
        address indexed owner,
        uint256 livestockId,
        uint256 overallScore
    );

    event WelfareAlertRaised(
        uint256 indexed alertId,
        uint256 livestockId,
        string alertType
    );

    constructor() Ownable(msg.sender) {}

    function assessWelfare(
        uint256 livestockId,
        uint256 healthScore,
        uint256 behaviorScore,
        uint256 environmentScore,
        uint256 nutritionScore
    ) public returns (uint256) {
        uint256 overallScore = (healthScore + behaviorScore + environmentScore + nutritionScore) / 4;
        
        uint256 assessmentId = _assessmentIdCounter++;
        welfareAssessments[assessmentId] = WelfareAssessment({
            assessmentId: assessmentId,
            livestockId: livestockId,
            healthScore: healthScore,
            behaviorScore: behaviorScore,
            environmentScore: environmentScore,
            nutritionScore: nutritionScore,
            overallScore: overallScore,
            assessedDate: block.timestamp,
            assessor: msg.sender
        });

        assessmentsByOwner[msg.sender].push(assessmentId);

        if (overallScore < 50) {
            raiseAlert(livestockId, "Low Welfare Score", 100 - overallScore);
        }

        emit WelfareAssessed(assessmentId, msg.sender, livestockId, overallScore);
        return assessmentId;
    }

    function raiseAlert(
        uint256 livestockId,
        string memory alertType,
        uint256 severity
    ) internal returns (uint256) {
        uint256 alertId = _alertIdCounter++;
        welfareAlerts[alertId] = WelfareAlert({
            alertId: alertId,
            livestockId: livestockId,
            alertType: alertType,
            severity: severity,
            detectedDate: block.timestamp,
            detector: msg.sender,
            resolved: false
        });

        emit WelfareAlertRaised(alertId, livestockId, alertType);
        return alertId;
    }

    function resolveAlert(uint256 alertId) public {
        require(welfareAlerts[alertId].detector == msg.sender, "Not detector");
        welfareAlerts[alertId].resolved = true;
    }

    function getWelfareAssessment(uint256 assessmentId) public view returns (WelfareAssessment memory) {
        return welfareAssessments[assessmentId];
    }

    function getAssessmentsByOwner(address owner) public view returns (uint256[] memory) {
        return assessmentsByOwner[owner];
    }
}

