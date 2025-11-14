// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedOptimization
 * @dev Optimize feed rations for livestock based on nutritional requirements
 */
contract FarmLivestockFeedOptimization is Ownable {
    struct FeedRation {
        uint256 rationId;
        uint256 livestockId;
        string livestockType;
        uint256 proteinContent;
        uint256 carbohydrateContent;
        uint256 fatContent;
        uint256 fiberContent;
        uint256 dailyAmount;
        address owner;
        uint256 createdAt;
    }

    struct OptimizationResult {
        uint256 resultId;
        uint256 rationId;
        uint256 efficiencyScore;
        uint256 costSavings;
        uint256 nutritionalBalance;
        address optimizer;
        uint256 optimizedAt;
    }

    mapping(uint256 => FeedRation) public feedRations;
    mapping(uint256 => OptimizationResult) public optimizationResults;
    mapping(address => uint256[]) public rationsByOwner;
    uint256 private _rationIdCounter;
    uint256 private _resultIdCounter;

    event FeedRationCreated(
        uint256 indexed rationId,
        address indexed owner,
        uint256 livestockId
    );

    event RationOptimized(
        uint256 indexed resultId,
        uint256 indexed rationId,
        uint256 efficiencyScore
    );

    constructor() Ownable(msg.sender) {}

    function createFeedRation(
        uint256 livestockId,
        string memory livestockType,
        uint256 proteinContent,
        uint256 carbohydrateContent,
        uint256 fatContent,
        uint256 fiberContent,
        uint256 dailyAmount
    ) public returns (uint256) {
        uint256 rationId = _rationIdCounter++;
        feedRations[rationId] = FeedRation({
            rationId: rationId,
            livestockId: livestockId,
            livestockType: livestockType,
            proteinContent: proteinContent,
            carbohydrateContent: carbohydrateContent,
            fatContent: fatContent,
            fiberContent: fiberContent,
            dailyAmount: dailyAmount,
            owner: msg.sender,
            createdAt: block.timestamp
        });

        rationsByOwner[msg.sender].push(rationId);

        emit FeedRationCreated(rationId, msg.sender, livestockId);
        return rationId;
    }

    function optimizeRation(
        uint256 rationId,
        uint256 efficiencyScore,
        uint256 costSavings,
        uint256 nutritionalBalance
    ) public returns (uint256) {
        require(feedRations[rationId].owner == msg.sender, "Not owner");
        
        uint256 resultId = _resultIdCounter++;
        optimizationResults[resultId] = OptimizationResult({
            resultId: resultId,
            rationId: rationId,
            efficiencyScore: efficiencyScore,
            costSavings: costSavings,
            nutritionalBalance: nutritionalBalance,
            optimizer: msg.sender,
            optimizedAt: block.timestamp
        });

        emit RationOptimized(resultId, rationId, efficiencyScore);
        return resultId;
    }

    function getFeedRation(uint256 rationId) public view returns (FeedRation memory) {
        return feedRations[rationId];
    }

    function getRationsByOwner(address owner) public view returns (uint256[] memory) {
        return rationsByOwner[owner];
    }
}

