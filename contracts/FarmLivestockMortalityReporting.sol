// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMortalityReporting
 * @dev Onchain mortality reporting and cause tracking
 */
contract FarmLivestockMortalityReporting is Ownable {
    struct MortalityRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 deathDate;
        string cause;
        string age;
        string notes;
    }

    mapping(uint256 => MortalityRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event MortalityRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string cause
    );

    constructor() Ownable(msg.sender) {}

    function recordMortality(
        string memory livestockId,
        uint256 deathDate,
        string memory cause,
        string memory age,
        string memory notes
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = MortalityRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            deathDate: deathDate,
            cause: cause,
            age: age,
            notes: notes
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit MortalityRecorded(recordId, msg.sender, livestockId, cause);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MortalityRecord memory) {
        return records[recordId];
    }
}
