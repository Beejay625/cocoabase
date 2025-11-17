// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockProductivityOptimization
 * @dev Productivity optimization system
 */
contract FarmLivestockProductivityOptimization is Ownable {
    struct Optimization {
        uint256 optimizationId;
        address farmer;
        uint256 animalId;
        string strategy;
        uint256 improvement;
        uint256 timestamp;
    }

    mapping(uint256 => Optimization) public optimizations;
    mapping(address => uint256[]) public optimizationsByFarmer;
    uint256 private _optimizationIdCounter;

    event OptimizationRecorded(uint256 indexed optimizationId, string strategy);

    constructor() Ownable(msg.sender) {}

    function recordOptimization(
        uint256 animalId,
        string memory strategy,
        uint256 improvement
    ) public returns (uint256) {
        uint256 optimizationId = _optimizationIdCounter++;
        optimizations[optimizationId] = Optimization({
            optimizationId: optimizationId,
            farmer: msg.sender,
            animalId: animalId,
            strategy: strategy,
            improvement: improvement,
            timestamp: block.timestamp
        });
        optimizationsByFarmer[msg.sender].push(optimizationId);
        emit OptimizationRecorded(optimizationId, strategy);
        return optimizationId;
    }
}

