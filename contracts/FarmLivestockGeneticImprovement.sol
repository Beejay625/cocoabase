// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticImprovement
 * @dev Genetic improvement program tracking
 */
contract FarmLivestockGeneticImprovement is Ownable {
    struct Improvement {
        uint256 improvementId;
        address breeder;
        uint256 animalId;
        string trait;
        uint256 improvementScore;
        uint256 timestamp;
    }

    mapping(uint256 => Improvement) public improvements;
    mapping(address => uint256[]) public improvementsByBreeder;
    uint256 private _improvementIdCounter;

    event ImprovementRecorded(uint256 indexed improvementId, string trait);

    constructor() Ownable(msg.sender) {}

    function recordImprovement(
        uint256 animalId,
        string memory trait,
        uint256 improvementScore
    ) public returns (uint256) {
        uint256 improvementId = _improvementIdCounter++;
        improvements[improvementId] = Improvement({
            improvementId: improvementId,
            breeder: msg.sender,
            animalId: animalId,
            trait: trait,
            improvementScore: improvementScore,
            timestamp: block.timestamp
        });
        improvementsByBreeder[msg.sender].push(improvementId);
        emit ImprovementRecorded(improvementId, trait);
        return improvementId;
    }
}

