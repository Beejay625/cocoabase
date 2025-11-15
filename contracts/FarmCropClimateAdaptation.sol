// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropClimateAdaptation
 * @dev Track climate adaptation strategies for crops
 */
contract FarmCropClimateAdaptation is Ownable {
    struct AdaptationStrategy {
        uint256 strategyId;
        uint256 plantationId;
        string cropType;
        string strategyType;
        uint256 implementationDate;
        uint256 effectivenessScore;
        address implementer;
        bool active;
    }

    mapping(uint256 => AdaptationStrategy) public strategies;
    mapping(address => uint256[]) public strategiesByOwner;
    uint256 private _strategyIdCounter;

    event StrategyCreated(
        uint256 indexed strategyId,
        address indexed owner,
        uint256 plantationId
    );

    constructor() Ownable(msg.sender) {}

    function createStrategy(
        uint256 plantationId,
        string memory cropType,
        string memory strategyType,
        uint256 effectivenessScore
    ) public returns (uint256) {
        uint256 strategyId = _strategyIdCounter++;
        strategies[strategyId] = AdaptationStrategy({
            strategyId: strategyId,
            plantationId: plantationId,
            cropType: cropType,
            strategyType: strategyType,
            implementationDate: block.timestamp,
            effectivenessScore: effectivenessScore,
            implementer: msg.sender,
            active: true
        });

        strategiesByOwner[msg.sender].push(strategyId);

        emit StrategyCreated(strategyId, msg.sender, plantationId);
        return strategyId;
    }

    function getStrategy(uint256 strategyId) public view returns (AdaptationStrategy memory) {
        return strategies[strategyId];
    }

    function getStrategiesByOwner(address owner) public view returns (uint256[] memory) {
        return strategiesByOwner[owner];
    }
}


