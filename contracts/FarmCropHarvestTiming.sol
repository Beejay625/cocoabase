// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestTiming
 * @dev Onchain system for optimizing harvest timing based on multiple factors
 */
contract FarmCropHarvestTiming is Ownable {
    struct HarvestTiming {
        uint256 timingId;
        uint256 plantationId;
        uint256 optimalHarvestDate;
        uint256 earliestHarvestDate;
        uint256 latestHarvestDate;
        string factors;
        address planner;
    }

    mapping(uint256 => HarvestTiming) public harvestTimings;
    mapping(address => uint256[]) public timingsByPlanner;
    uint256 private _timingIdCounter;

    event HarvestTimingCalculated(
        uint256 indexed timingId,
        address indexed planner,
        uint256 optimalHarvestDate
    );

    constructor() Ownable(msg.sender) {}

    function calculateHarvestTiming(
        uint256 plantationId,
        uint256 optimalHarvestDate,
        uint256 earliestHarvestDate,
        uint256 latestHarvestDate,
        string memory factors
    ) public returns (uint256) {
        require(earliestHarvestDate <= optimalHarvestDate, "Invalid dates");
        require(optimalHarvestDate <= latestHarvestDate, "Invalid dates");
        
        uint256 timingId = _timingIdCounter++;
        harvestTimings[timingId] = HarvestTiming({
            timingId: timingId,
            plantationId: plantationId,
            optimalHarvestDate: optimalHarvestDate,
            earliestHarvestDate: earliestHarvestDate,
            latestHarvestDate: latestHarvestDate,
            factors: factors,
            planner: msg.sender
        });

        timingsByPlanner[msg.sender].push(timingId);

        emit HarvestTimingCalculated(timingId, msg.sender, optimalHarvestDate);
        return timingId;
    }

    function getTiming(uint256 timingId) public view returns (HarvestTiming memory) {
        return harvestTimings[timingId];
    }
}

