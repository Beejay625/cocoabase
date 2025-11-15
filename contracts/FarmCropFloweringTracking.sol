// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropFloweringTracking
 * @dev Onchain system for tracking crop flowering stages and timing
 */
contract FarmCropFloweringTracking is Ownable {
    struct FloweringRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 floweringStartDate;
        uint256 floweringPeakDate;
        uint256 floweringEndDate;
        uint256 flowerCount;
        string floweringStage;
        address tracker;
    }

    mapping(uint256 => FloweringRecord) public floweringRecords;
    mapping(address => uint256[]) public recordsByTracker;
    uint256 private _recordIdCounter;

    event FloweringRecorded(
        uint256 indexed recordId,
        address indexed tracker,
        string floweringStage
    );

    constructor() Ownable(msg.sender) {}

    function recordFlowering(
        uint256 plantationId,
        uint256 floweringStartDate,
        uint256 flowerCount,
        string memory floweringStage
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        floweringRecords[recordId] = FloweringRecord({
            recordId: recordId,
            plantationId: plantationId,
            floweringStartDate: floweringStartDate,
            floweringPeakDate: 0,
            floweringEndDate: 0,
            flowerCount: flowerCount,
            floweringStage: floweringStage,
            tracker: msg.sender
        });

        recordsByTracker[msg.sender].push(recordId);

        emit FloweringRecorded(recordId, msg.sender, floweringStage);
        return recordId;
    }

    function updateFloweringPeak(uint256 recordId, uint256 peakDate) public {
        require(floweringRecords[recordId].tracker == msg.sender, "Not authorized");
        floweringRecords[recordId].floweringPeakDate = peakDate;
    }

    function getRecord(uint256 recordId) public view returns (FloweringRecord memory) {
        return floweringRecords[recordId];
    }
}

