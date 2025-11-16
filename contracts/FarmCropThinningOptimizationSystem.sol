// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropThinningOptimizationSystem
 * @dev Onchain crop thinning operations optimization for better yields
 */
contract FarmCropThinningOptimizationSystem is Ownable {
    struct OptimizationRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 plantsBefore;
        uint256 plantsAfter;
        uint256 optimalSpacing;
        uint256 expectedYieldIncrease;
        uint256 optimizationDate;
    }

    mapping(uint256 => OptimizationRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event OptimizationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 expectedYieldIncrease
    );

    constructor() Ownable(msg.sender) {}

    function recordOptimization(
        string memory fieldId,
        uint256 plantsBefore,
        uint256 plantsAfter,
        uint256 optimalSpacing,
        uint256 expectedYieldIncrease
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = OptimizationRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            plantsBefore: plantsBefore,
            plantsAfter: plantsAfter,
            optimalSpacing: optimalSpacing,
            expectedYieldIncrease: expectedYieldIncrease,
            optimizationDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit OptimizationRecorded(recordId, msg.sender, fieldId, expectedYieldIncrease);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (OptimizationRecord memory) {
        return records[recordId];
    }
}

