// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMortalityTracking
 * @dev Track livestock mortality and causes
 */
contract FarmLivestockMortalityTracking is Ownable {
    struct MortalityRecord {
        uint256 recordId;
        uint256 livestockId;
        string cause;
        uint256 age;
        uint256 deathDate;
        address recorder;
    }

    mapping(uint256 => MortalityRecord) public records;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event MortalityRecorded(
        uint256 indexed recordId,
        address indexed owner,
        uint256 livestockId,
        string cause
    );

    constructor() Ownable(msg.sender) {}

    function recordMortality(
        uint256 livestockId,
        string memory cause,
        uint256 age
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = MortalityRecord({
            recordId: recordId,
            livestockId: livestockId,
            cause: cause,
            age: age,
            deathDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByOwner[msg.sender].push(recordId);

        emit MortalityRecorded(recordId, msg.sender, livestockId, cause);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MortalityRecord memory) {
        return records[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}


