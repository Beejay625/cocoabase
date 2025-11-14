// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStressMonitoring
 * @dev Monitor crop stress levels
 */
contract FarmCropStressMonitoring is Ownable {
    struct StressReading {
        uint256 readingId;
        uint256 plantationId;
        string stressType;
        uint256 stressLevel;
        uint256 recordedDate;
        address recorder;
    }

    mapping(uint256 => StressReading) public readings;
    mapping(address => uint256[]) public readingsByOwner;
    uint256 private _readingIdCounter;

    event StressRecorded(
        uint256 indexed readingId,
        address indexed owner,
        uint256 plantationId,
        uint256 stressLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordStress(
        uint256 plantationId,
        string memory stressType,
        uint256 stressLevel
    ) public returns (uint256) {
        uint256 readingId = _readingIdCounter++;
        readings[readingId] = StressReading({
            readingId: readingId,
            plantationId: plantationId,
            stressType: stressType,
            stressLevel: stressLevel,
            recordedDate: block.timestamp,
            recorder: msg.sender
        });

        readingsByOwner[msg.sender].push(readingId);

        emit StressRecorded(readingId, msg.sender, plantationId, stressLevel);
        return readingId;
    }

    function getReading(uint256 readingId) public view returns (StressReading memory) {
        return readings[readingId];
    }

    function getReadingsByOwner(address owner) public view returns (uint256[] memory) {
        return readingsByOwner[owner];
    }
}

