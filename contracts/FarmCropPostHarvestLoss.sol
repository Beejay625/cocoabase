// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPostHarvestLoss
 * @dev Post-harvest loss tracking and reduction
 */
contract FarmCropPostHarvestLoss is Ownable {
    struct LossRecord {
        uint256 lossId;
        address farmer;
        uint256 harvestId;
        uint256 lossAmount;
        string cause;
        uint256 timestamp;
    }

    mapping(uint256 => LossRecord) public lossRecords;
    mapping(address => uint256[]) public lossesByFarmer;
    mapping(uint256 => uint256) public totalLossByHarvest;
    uint256 private _lossIdCounter;

    event LossRecorded(uint256 indexed lossId, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function recordLoss(
        uint256 harvestId,
        uint256 lossAmount,
        string memory cause
    ) public returns (uint256) {
        uint256 lossId = _lossIdCounter++;
        lossRecords[lossId] = LossRecord({
            lossId: lossId,
            farmer: msg.sender,
            harvestId: harvestId,
            lossAmount: lossAmount,
            cause: cause,
            timestamp: block.timestamp
        });
        lossesByFarmer[msg.sender].push(lossId);
        totalLossByHarvest[harvestId] += lossAmount;
        emit LossRecorded(lossId, lossAmount);
        return lossId;
    }

    function getTotalLoss(uint256 harvestId) public view returns (uint256) {
        return totalLossByHarvest[harvestId];
    }
}

