// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWeight
 * @dev Onchain system for tracking livestock weight measurements
 */
contract FarmLivestockWeight is Ownable {
    struct WeightRecord {
        uint256 recordId;
        uint256 livestockId;
        uint256 weight;
        uint256 measurementDate;
        address measurer;
    }

    mapping(uint256 => WeightRecord) public weightRecords;
    mapping(address => uint256[]) public recordsByMeasurer;
    uint256 private _recordIdCounter;

    event WeightRecorded(
        uint256 indexed recordId,
        address indexed measurer,
        uint256 weight
    );

    constructor() Ownable(msg.sender) {}

    function recordWeight(
        uint256 livestockId,
        uint256 weight
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        weightRecords[recordId] = WeightRecord({
            recordId: recordId,
            livestockId: livestockId,
            weight: weight,
            measurementDate: block.timestamp,
            measurer: msg.sender
        });

        recordsByMeasurer[msg.sender].push(recordId);

        emit WeightRecorded(recordId, msg.sender, weight);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (WeightRecord memory) {
        return weightRecords[recordId];
    }
}



