// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticsDatabase
 * @dev Livestock genetics database and tracking
 */
contract FarmLivestockGeneticsDatabase is Ownable {
    struct GeneticRecord {
        uint256 recordId;
        address owner;
        uint256 animalId;
        bytes32 geneticHash;
        string breed;
        uint256 timestamp;
    }

    mapping(uint256 => GeneticRecord) public geneticRecords;
    mapping(uint256 => uint256[]) public recordsByAnimal;
    uint256 private _recordIdCounter;

    event GeneticRecordCreated(uint256 indexed recordId, uint256 animalId);

    constructor() Ownable(msg.sender) {}

    function recordGenetics(
        uint256 animalId,
        bytes32 geneticHash,
        string memory breed
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        geneticRecords[recordId] = GeneticRecord({
            recordId: recordId,
            owner: msg.sender,
            animalId: animalId,
            geneticHash: geneticHash,
            breed: breed,
            timestamp: block.timestamp
        });
        recordsByAnimal[animalId].push(recordId);
        emit GeneticRecordCreated(recordId, animalId);
        return recordId;
    }
}

