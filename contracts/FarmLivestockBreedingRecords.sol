// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockBreedingRecords
 * @dev Onchain breeding records and lineage tracking
 */
contract FarmLivestockBreedingRecords is Ownable {
    struct BreedingRecord {
        uint256 recordId;
        address farmer;
        string sireId;
        string damId;
        string offspringId;
        uint256 breedingDate;
        uint256 birthDate;
        string breed;
    }

    mapping(uint256 => BreedingRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event BreedingRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string offspringId
    );

    constructor() Ownable(msg.sender) {}

    function recordBreeding(
        string memory sireId,
        string memory damId,
        string memory offspringId,
        uint256 breedingDate,
        uint256 birthDate,
        string memory breed
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = BreedingRecord({
            recordId: recordId,
            farmer: msg.sender,
            sireId: sireId,
            damId: damId,
            offspringId: offspringId,
            breedingDate: breedingDate,
            birthDate: birthDate,
            breed: breed
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit BreedingRecorded(recordId, msg.sender, offspringId);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (BreedingRecord memory) {
        return records[recordId];
    }
}

