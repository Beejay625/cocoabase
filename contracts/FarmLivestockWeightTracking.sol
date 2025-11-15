// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWeightTracking
 * @dev Onchain weight tracking and growth monitoring for livestock
 */
contract FarmLivestockWeightTracking is Ownable {
    struct WeightRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 weight;
        uint256 measurementDate;
        uint256 age;
        string notes;
    }

    mapping(uint256 => WeightRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    mapping(string => uint256[]) public recordsByLivestock;
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
        uint256 age,
        string memory notes
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = WeightRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            weight: weight,
            measurementDate: block.timestamp,
            age: age,
            notes: notes
        });

        recordsByFarmer[msg.sender].push(recordId);
        recordsByLivestock[livestockId].push(recordId);

        emit WeightRecorded(recordId, msg.sender, livestockId, weight);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (WeightRecord memory) {
        return records[recordId];
    }
}

