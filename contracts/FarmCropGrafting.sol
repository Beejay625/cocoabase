// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropGrafting
 * @dev Onchain system for tracking crop grafting activities
 */
contract FarmCropGrafting is Ownable {
    struct GraftingRecord {
        uint256 recordId;
        uint256 plantationId;
        string rootstockType;
        string scionType;
        uint256 graftsPerformed;
        uint256 graftingDate;
        address grafter;
    }

    mapping(uint256 => GraftingRecord) public graftingRecords;
    mapping(address => uint256[]) public recordsByGrafter;
    uint256 private _recordIdCounter;

    event GraftingRecorded(
        uint256 indexed recordId,
        address indexed grafter,
        uint256 graftsPerformed
    );

    constructor() Ownable(msg.sender) {}

    function recordGrafting(
        uint256 plantationId,
        string memory rootstockType,
        string memory scionType,
        uint256 graftsPerformed
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        graftingRecords[recordId] = GraftingRecord({
            recordId: recordId,
            plantationId: plantationId,
            rootstockType: rootstockType,
            scionType: scionType,
            graftsPerformed: graftsPerformed,
            graftingDate: block.timestamp,
            grafter: msg.sender
        });

        recordsByGrafter[msg.sender].push(recordId);

        emit GraftingRecorded(recordId, msg.sender, graftsPerformed);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (GraftingRecord memory) {
        return graftingRecords[recordId];
    }
}

