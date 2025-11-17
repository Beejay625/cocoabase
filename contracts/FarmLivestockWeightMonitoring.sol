// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWeightMonitoring
 * @dev Onchain livestock weight tracking and growth monitoring
 */
contract FarmLivestockWeightMonitoring is Ownable {
    struct WeightRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 weight;
        uint256 recordDate;
        uint256 growthRate;
        string healthStatus;
    }

    mapping(uint256 => WeightRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event WeightRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        uint256 weight
    );

    constructor() Ownable(msg.sender) {}

    function recordWeight(
        string memory livestockId,
        uint256 weight,
        uint256 previousWeight,
        uint256 daysSinceLastRecord,
        string memory healthStatus
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 growthRate = 0;
        if (daysSinceLastRecord > 0 && previousWeight > 0) {
            growthRate = ((weight - previousWeight) * 100) / (previousWeight * daysSinceLastRecord);
        }

        records[recordId] = WeightRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            weight: weight,
            recordDate: block.timestamp,
            growthRate: growthRate,
            healthStatus: healthStatus
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit WeightRecorded(recordId, msg.sender, livestockId, weight);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (WeightRecord memory) {
        return records[recordId];
    }
}

