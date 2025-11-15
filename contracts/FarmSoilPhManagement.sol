// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilPhManagement
 * @dev Manage soil pH levels for optimal crop growth
 */
contract FarmSoilPhManagement is Ownable {
    struct PhReading {
        uint256 readingId;
        uint256 fieldId;
        uint256 phLevel;
        uint256 depth;
        uint256 readingDate;
        address reader;
    }

    struct PhAdjustment {
        uint256 adjustmentId;
        uint256 readingId;
        string adjustmentMethod;
        uint256 targetPh;
        uint256 applicationDate;
        address applicator;
        bool completed;
    }

    mapping(uint256 => PhReading) public phReadings;
    mapping(uint256 => PhAdjustment) public phAdjustments;
    mapping(address => uint256[]) public readingsByOwner;
    uint256 private _readingIdCounter;
    uint256 private _adjustmentIdCounter;

    event PhRecorded(
        uint256 indexed readingId,
        address indexed owner,
        uint256 fieldId,
        uint256 phLevel
    );

    event PhAdjusted(
        uint256 indexed adjustmentId,
        uint256 indexed readingId,
        uint256 targetPh
    );

    constructor() Ownable(msg.sender) {}

    function recordPh(
        uint256 fieldId,
        uint256 phLevel,
        uint256 depth
    ) public returns (uint256) {
        uint256 readingId = _readingIdCounter++;
        phReadings[readingId] = PhReading({
            readingId: readingId,
            fieldId: fieldId,
            phLevel: phLevel,
            depth: depth,
            readingDate: block.timestamp,
            reader: msg.sender
        });

        readingsByOwner[msg.sender].push(readingId);

        emit PhRecorded(readingId, msg.sender, fieldId, phLevel);
        return readingId;
    }

    function adjustPh(
        uint256 readingId,
        string memory adjustmentMethod,
        uint256 targetPh
    ) public returns (uint256) {
        require(phReadings[readingId].reader == msg.sender, "Not reader");
        
        uint256 adjustmentId = _adjustmentIdCounter++;
        phAdjustments[adjustmentId] = PhAdjustment({
            adjustmentId: adjustmentId,
            readingId: readingId,
            adjustmentMethod: adjustmentMethod,
            targetPh: targetPh,
            applicationDate: block.timestamp,
            applicator: msg.sender,
            completed: false
        });

        emit PhAdjusted(adjustmentId, readingId, targetPh);
        return adjustmentId;
    }

    function completeAdjustment(uint256 adjustmentId) public {
        require(phAdjustments[adjustmentId].applicator == msg.sender, "Not applicator");
        phAdjustments[adjustmentId].completed = true;
    }

    function getPhReading(uint256 readingId) public view returns (PhReading memory) {
        return phReadings[readingId];
    }

    function getReadingsByOwner(address owner) public view returns (uint256[] memory) {
        return readingsByOwner[owner];
    }
}


