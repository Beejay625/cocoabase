// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropFruitingTracking
 * @dev Onchain system for tracking fruit development and yield potential
 */
contract FarmCropFruitingTracking is Ownable {
    struct FruitingRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 fruitSetDate;
        uint256 fruitCount;
        uint256 estimatedYield;
        string fruitStage;
        address tracker;
    }

    mapping(uint256 => FruitingRecord) public fruitingRecords;
    mapping(address => uint256[]) public recordsByTracker;
    uint256 private _recordIdCounter;

    event FruitingRecorded(
        uint256 indexed recordId,
        address indexed tracker,
        uint256 fruitCount
    );

    constructor() Ownable(msg.sender) {}

    function recordFruiting(
        uint256 plantationId,
        uint256 fruitSetDate,
        uint256 fruitCount,
        uint256 estimatedYield,
        string memory fruitStage
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        fruitingRecords[recordId] = FruitingRecord({
            recordId: recordId,
            plantationId: plantationId,
            fruitSetDate: fruitSetDate,
            fruitCount: fruitCount,
            estimatedYield: estimatedYield,
            fruitStage: fruitStage,
            tracker: msg.sender
        });

        recordsByTracker[msg.sender].push(recordId);

        emit FruitingRecorded(recordId, msg.sender, fruitCount);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (FruitingRecord memory) {
        return fruitingRecords[recordId];
    }
}

