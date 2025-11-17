// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropYieldAnalysis
 * @dev Yield analysis and comparative reporting
 */
contract FarmCropYieldAnalysis is Ownable {
    struct YieldAnalysis {
        uint256 analysisId;
        address farmer;
        string fieldId;
        uint256 actualYield;
        uint256 expectedYield;
        uint256 yieldEfficiency;
        uint256 analysisDate;
    }

    mapping(uint256 => YieldAnalysis) public analyses;
    mapping(address => uint256[]) public analysesByFarmer;
    uint256 private _analysisIdCounter;

    event AnalysisCreated(
        uint256 indexed analysisId,
        address indexed farmer,
        uint256 yieldEfficiency
    );

    constructor() Ownable(msg.sender) {}

    function createAnalysis(
        string memory fieldId,
        uint256 actualYield,
        uint256 expectedYield
    ) public returns (uint256) {
        require(expectedYield > 0, "Invalid expected yield");
        uint256 yieldEfficiency = (actualYield * 10000) / expectedYield;
        uint256 analysisId = _analysisIdCounter++;
        analyses[analysisId] = YieldAnalysis({
            analysisId: analysisId,
            farmer: msg.sender,
            fieldId: fieldId,
            actualYield: actualYield,
            expectedYield: expectedYield,
            yieldEfficiency: yieldEfficiency,
            analysisDate: block.timestamp
        });

        analysesByFarmer[msg.sender].push(analysisId);
        emit AnalysisCreated(analysisId, msg.sender, yieldEfficiency);
        return analysisId;
    }

    function getAnalysis(uint256 analysisId) public view returns (YieldAnalysis memory) {
        return analyses[analysisId];
    }
}