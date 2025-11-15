// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilNutrientAnalysis
 * @dev Onchain system for comprehensive soil nutrient analysis
 */
contract FarmSoilNutrientAnalysis is Ownable {
    struct NutrientAnalysis {
        uint256 analysisId;
        uint256 fieldId;
        uint256 nitrogen;
        uint256 phosphorus;
        uint256 potassium;
        uint256 calcium;
        uint256 magnesium;
        uint256 analysisDate;
        address analyst;
    }

    mapping(uint256 => NutrientAnalysis) public nutrientAnalyses;
    mapping(address => uint256[]) public analysesByAnalyst;
    uint256 private _analysisIdCounter;

    event NutrientAnalysisRecorded(
        uint256 indexed analysisId,
        address indexed analyst,
        uint256 fieldId
    );

    constructor() Ownable(msg.sender) {}

    function recordNutrientAnalysis(
        uint256 fieldId,
        uint256 nitrogen,
        uint256 phosphorus,
        uint256 potassium,
        uint256 calcium,
        uint256 magnesium,
        uint256 analysisDate
    ) public returns (uint256) {
        uint256 analysisId = _analysisIdCounter++;
        nutrientAnalyses[analysisId] = NutrientAnalysis({
            analysisId: analysisId,
            fieldId: fieldId,
            nitrogen: nitrogen,
            phosphorus: phosphorus,
            potassium: potassium,
            calcium: calcium,
            magnesium: magnesium,
            analysisDate: analysisDate,
            analyst: msg.sender
        });

        analysesByAnalyst[msg.sender].push(analysisId);

        emit NutrientAnalysisRecorded(analysisId, msg.sender, fieldId);
        return analysisId;
    }

    function getAnalysis(uint256 analysisId) public view returns (NutrientAnalysis memory) {
        return nutrientAnalyses[analysisId];
    }
}

