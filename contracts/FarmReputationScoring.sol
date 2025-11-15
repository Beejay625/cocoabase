// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmReputationScoring
 * @dev Onchain reputation scoring based on transaction history
 */
contract FarmReputationScoring is Ownable {
    struct ReputationScore {
        address farmer;
        uint256 score;
        uint256 totalTransactions;
        uint256 successfulTransactions;
        uint256 lastUpdated;
    }

    mapping(address => ReputationScore) public reputationScores;
    mapping(address => mapping(address => bool)) public hasRated;
    uint256 public baseScore = 1000;
    uint256 public scoreMultiplier = 10;

    event ReputationUpdated(address indexed farmer, uint256 newScore);
    event TransactionRated(
        address indexed farmer,
        address indexed rater,
        bool positive
    );

    constructor() Ownable(msg.sender) {}

    function recordTransaction(address farmer, bool successful) public {
        ReputationScore storage score = reputationScores[farmer];
        if (score.farmer == address(0)) {
            score.farmer = farmer;
            score.score = baseScore;
        }
        
        score.totalTransactions++;
        if (successful) {
            score.successfulTransactions++;
            score.score += scoreMultiplier;
        } else {
            score.score = score.score > scoreMultiplier 
                ? score.score - scoreMultiplier 
                : 0;
        }
        score.lastUpdated = block.timestamp;
        emit ReputationUpdated(farmer, score.score);
    }

    function rateTransaction(address farmer, bool positive) public {
        require(!hasRated[farmer][msg.sender], "Already rated");
        hasRated[farmer][msg.sender] = true;
        
        ReputationScore storage score = reputationScores[farmer];
        if (score.farmer == address(0)) {
            score.farmer = farmer;
            score.score = baseScore;
        }
        
        if (positive) {
            score.score += scoreMultiplier * 2;
        } else {
            score.score = score.score > scoreMultiplier * 2
                ? score.score - scoreMultiplier * 2
                : 0;
        }
        score.lastUpdated = block.timestamp;
        emit TransactionRated(farmer, msg.sender, positive);
        emit ReputationUpdated(farmer, score.score);
    }

    function getReputationScore(address farmer) public view returns (ReputationScore memory) {
        return reputationScores[farmer];
    }
}

