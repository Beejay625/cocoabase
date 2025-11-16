// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilQualityIndex
 * @dev Soil quality index calculation and tracking
 */
contract FarmSoilQualityIndex is Ownable {
    struct QualityIndex {
        uint256 indexId;
        uint256 fieldId;
        uint256 phScore;
        uint256 nutrientScore;
        uint256 organicMatterScore;
        uint256 overallScore;
        uint256 timestamp;
    }

    mapping(uint256 => QualityIndex) public qualityIndices;
    mapping(uint256 => uint256[]) public indicesByField;
    uint256 private _indexIdCounter;

    event QualityIndexCalculated(
        uint256 indexed indexId,
        uint256 fieldId,
        uint256 overallScore
    );

    constructor() Ownable(msg.sender) {}

    function calculateIndex(
        uint256 fieldId,
        uint256 phScore,
        uint256 nutrientScore,
        uint256 organicMatterScore
    ) public returns (uint256) {
        uint256 overallScore = (phScore + nutrientScore + organicMatterScore) / 3;
        uint256 indexId = _indexIdCounter++;
        qualityIndices[indexId] = QualityIndex({
            indexId: indexId,
            fieldId: fieldId,
            phScore: phScore,
            nutrientScore: nutrientScore,
            organicMatterScore: organicMatterScore,
            overallScore: overallScore,
            timestamp: block.timestamp
        });
        indicesByField[fieldId].push(indexId);
        emit QualityIndexCalculated(indexId, fieldId, overallScore);
        return indexId;
    }

    function getLatestIndex(uint256 fieldId) public view returns (QualityIndex memory) {
        require(indicesByField[fieldId].length > 0, "No indices found");
        uint256 latestId = indicesByField[fieldId][indicesByField[fieldId].length - 1];
        return qualityIndices[latestId];
    }
}
