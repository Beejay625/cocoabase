// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropClimateResilience
 * @dev Climate resilience tracking and adaptation
 */
contract FarmCropClimateResilience is Ownable {
    struct Resilience {
        uint256 resilienceId;
        address farmer;
        uint256 fieldId;
        uint256 resilienceScore;
        string adaptationStrategy;
        uint256 timestamp;
    }

    mapping(uint256 => Resilience) public resilienceRecords;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _resilienceIdCounter;

    event ResilienceRecorded(uint256 indexed resilienceId, uint256 score);

    constructor() Ownable(msg.sender) {}

    function recordResilience(
        uint256 fieldId,
        uint256 resilienceScore,
        string memory adaptationStrategy
    ) public returns (uint256) {
        uint256 resilienceId = _resilienceIdCounter++;
        resilienceRecords[resilienceId] = Resilience({
            resilienceId: resilienceId,
            farmer: msg.sender,
            fieldId: fieldId,
            resilienceScore: resilienceScore,
            adaptationStrategy: adaptationStrategy,
            timestamp: block.timestamp
        });
        recordsByFarmer[msg.sender].push(resilienceId);
        emit ResilienceRecorded(resilienceId, resilienceScore);
        return resilienceId;
    }
}

