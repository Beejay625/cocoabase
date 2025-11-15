// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPollination
 * @dev Onchain system for tracking crop pollination activities
 */
contract FarmCropPollination is Ownable {
    struct PollinationRecord {
        uint256 recordId;
        uint256 plantationId;
        string pollinatorType;
        uint256 pollinationDate;
        address recorder;
        bool natural;
    }

    mapping(uint256 => PollinationRecord) public pollinationRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event PollinationRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        string pollinatorType
    );

    constructor() Ownable(msg.sender) {}

    function recordPollination(
        uint256 plantationId,
        string memory pollinatorType,
        bool natural
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        pollinationRecords[recordId] = PollinationRecord({
            recordId: recordId,
            plantationId: plantationId,
            pollinatorType: pollinatorType,
            pollinationDate: block.timestamp,
            recorder: msg.sender,
            natural: natural
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit PollinationRecorded(recordId, msg.sender, pollinatorType);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PollinationRecord memory) {
        return pollinationRecords[recordId];
    }
}



