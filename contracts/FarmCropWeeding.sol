// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropWeeding
 * @dev Onchain system for tracking crop weeding activities
 */
contract FarmCropWeeding is Ownable {
    struct WeedingRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 areaWeeded;
        uint256 weedingDate;
        string method;
        address weeder;
    }

    mapping(uint256 => WeedingRecord) public weedingRecords;
    mapping(address => uint256[]) public recordsByWeeder;
    uint256 private _recordIdCounter;

    event WeedingRecorded(
        uint256 indexed recordId,
        address indexed weeder,
        uint256 areaWeeded
    );

    constructor() Ownable(msg.sender) {}

    function recordWeeding(
        uint256 plantationId,
        uint256 areaWeeded,
        string memory method
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        weedingRecords[recordId] = WeedingRecord({
            recordId: recordId,
            plantationId: plantationId,
            areaWeeded: areaWeeded,
            weedingDate: block.timestamp,
            method: method,
            weeder: msg.sender
        });

        recordsByWeeder[msg.sender].push(recordId);

        emit WeedingRecorded(recordId, msg.sender, areaWeeded);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (WeedingRecord memory) {
        return weedingRecords[recordId];
    }
}

