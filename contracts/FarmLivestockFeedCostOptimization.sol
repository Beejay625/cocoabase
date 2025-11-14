// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedCostOptimization
 * @dev Optimize feed costs for livestock
 */
contract FarmLivestockFeedCostOptimization is Ownable {
    struct CostAnalysis {
        uint256 analysisId;
        uint256 livestockId;
        uint256 currentCost;
        uint256 optimizedCost;
        uint256 savings;
        uint256 analysisDate;
        address analyst;
    }

    mapping(uint256 => CostAnalysis) public analyses;
    mapping(address => uint256[]) public analysesByOwner;
    uint256 private _analysisIdCounter;

    event AnalysisCreated(
        uint256 indexed analysisId,
        address indexed owner,
        uint256 livestockId,
        uint256 savings
    );

    constructor() Ownable(msg.sender) {}

    function createAnalysis(
        uint256 livestockId,
        uint256 currentCost,
        uint256 optimizedCost
    ) public returns (uint256) {
        uint256 savings = currentCost > optimizedCost ? currentCost - optimizedCost : 0;
        
        uint256 analysisId = _analysisIdCounter++;
        analyses[analysisId] = CostAnalysis({
            analysisId: analysisId,
            livestockId: livestockId,
            currentCost: currentCost,
            optimizedCost: optimizedCost,
            savings: savings,
            analysisDate: block.timestamp,
            analyst: msg.sender
        });

        analysesByOwner[msg.sender].push(analysisId);

        emit AnalysisCreated(analysisId, msg.sender, livestockId, savings);
        return analysisId;
    }

    function getAnalysis(uint256 analysisId) public view returns (CostAnalysis memory) {
        return analyses[analysisId];
    }

    function getAnalysesByOwner(address owner) public view returns (uint256[] memory) {
        return analysesByOwner[owner];
    }
}

