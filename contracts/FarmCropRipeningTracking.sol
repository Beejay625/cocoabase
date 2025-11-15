// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropRipeningTracking
 * @dev Onchain system for monitoring crop ripening process and readiness
 */
contract FarmCropRipeningTracking is Ownable {
    struct RipeningRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 ripeningStartDate;
        uint256 ripeningProgress;
        string ripenessLevel;
        bool harvestReady;
        address tracker;
    }

    mapping(uint256 => RipeningRecord) public ripeningRecords;
    mapping(address => uint256[]) public recordsByTracker;
    uint256 private _recordIdCounter;

    event RipeningRecorded(
        uint256 indexed recordId,
        address indexed tracker,
        string ripenessLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordRipening(
        uint256 plantationId,
        uint256 ripeningStartDate,
        uint256 ripeningProgress,
        string memory ripenessLevel,
        bool harvestReady
    ) public returns (uint256) {
        require(ripeningProgress <= 100, "Invalid progress");
        uint256 recordId = _recordIdCounter++;
        ripeningRecords[recordId] = RipeningRecord({
            recordId: recordId,
            plantationId: plantationId,
            ripeningStartDate: ripeningStartDate,
            ripeningProgress: ripeningProgress,
            ripenessLevel: ripenessLevel,
            harvestReady: harvestReady,
            tracker: msg.sender
        });

        recordsByTracker[msg.sender].push(recordId);

        emit RipeningRecorded(recordId, msg.sender, ripenessLevel);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (RipeningRecord memory) {
        return ripeningRecords[recordId];
    }
}

