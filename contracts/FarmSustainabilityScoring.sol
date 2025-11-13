// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSustainabilityScoring
 * @dev Onchain sustainability scoring system
 */
contract FarmSustainabilityScoring is Ownable {
    struct SustainabilityScore {
        uint256 scoreId;
        address farmOwner;
        uint256 environmentalScore;
        uint256 socialScore;
        uint256 economicScore;
        uint256 overallScore;
        uint256 date;
        bool verified;
    }

    mapping(uint256 => SustainabilityScore) public scores;
    mapping(address => uint256[]) public scoresByOwner;
    uint256 private _scoreIdCounter;

    event ScoreCreated(
        uint256 indexed scoreId,
        address indexed farmOwner,
        uint256 overallScore
    );

    event ScoreVerified(
        uint256 indexed scoreId
    );

    constructor() Ownable(msg.sender) {}

    function createScore(
        uint256 environmentalScore,
        uint256 socialScore,
        uint256 economicScore
    ) public returns (uint256) {
        require(environmentalScore <= 100 && socialScore <= 100 && economicScore <= 100, "Scores must be <= 100");

        uint256 overallScore = (environmentalScore + socialScore + economicScore) / 3;

        uint256 scoreId = _scoreIdCounter++;
        scores[scoreId] = SustainabilityScore({
            scoreId: scoreId,
            farmOwner: msg.sender,
            environmentalScore: environmentalScore,
            socialScore: socialScore,
            economicScore: economicScore,
            overallScore: overallScore,
            date: block.timestamp,
            verified: false
        });

        scoresByOwner[msg.sender].push(scoreId);

        emit ScoreCreated(scoreId, msg.sender, overallScore);
        return scoreId;
    }

    function verifyScore(uint256 scoreId) public onlyOwner {
        require(!scores[scoreId].verified, "Already verified");
        scores[scoreId].verified = true;

        emit ScoreVerified(scoreId);
    }

    function getScore(uint256 scoreId) public view returns (SustainabilityScore memory) {
        return scores[scoreId];
    }

    function getScoresByOwner(address owner) public view returns (uint256[] memory) {
        return scoresByOwner[owner];
    }
}

