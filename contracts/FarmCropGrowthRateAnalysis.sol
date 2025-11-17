// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropGrowthRateAnalysis
 * @dev Crop growth rate analysis and comparison
 */
contract FarmCropGrowthRateAnalysis is Ownable {
    struct GrowthAnalysis {
        uint256 analysisId;
        address farmer;
        string fieldId;
        uint256 growthRate;
        uint256 comparisonPeriod;
        uint256 analysisDate;
    }

    mapping(uint256 => GrowthAnalysis) public analyses;
    uint256 private _analysisIdCounter;

    event AnalysisCreated(
        uint256 indexed analysisId,
        address indexed farmer,
        uint256 growthRate
    );

    constructor() Ownable(msg.sender) {}

    function createAnalysis(
        string memory fieldId,
        uint256 growthRate,
        uint256 comparisonPeriod
    ) public returns (uint256) {
        uint256 analysisId = _analysisIdCounter++;
        analyses[analysisId] = GrowthAnalysis({
            analysisId: analysisId,
            farmer: msg.sender,
            fieldId: fieldId,
            growthRate: growthRate,
            comparisonPeriod: comparisonPeriod,
            analysisDate: block.timestamp
        });

        emit AnalysisCreated(analysisId, msg.sender, growthRate);
        return analysisId;
    }

    function getAnalysis(uint256 analysisId) public view returns (GrowthAnalysis memory) {
        return analyses[analysisId];
    }
}
