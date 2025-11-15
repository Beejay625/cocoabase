// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticsTracking
 * @dev Track livestock genetics and breeding lines
 */
contract FarmLivestockGeneticsTracking is Ownable {
    struct GeneticProfile {
        uint256 profileId;
        uint256 livestockId;
        string breed;
        string[] geneticMarkers;
        uint256 parent1Id;
        uint256 parent2Id;
        address owner;
        uint256 recordedAt;
    }

    struct BreedingRecord {
        uint256 recordId;
        uint256 parent1Id;
        uint256 parent2Id;
        uint256 offspringId;
        uint256 breedingDate;
        address breeder;
        bool successful;
    }

    mapping(uint256 => GeneticProfile) public geneticProfiles;
    mapping(uint256 => BreedingRecord) public breedingRecords;
    mapping(address => uint256[]) public profilesByOwner;
    uint256 private _profileIdCounter;
    uint256 private _recordIdCounter;

    event GeneticProfileCreated(
        uint256 indexed profileId,
        address indexed owner,
        uint256 livestockId
    );

    event BreedingRecorded(
        uint256 indexed recordId,
        uint256 parent1Id,
        uint256 parent2Id
    );

    constructor() Ownable(msg.sender) {}

    function createGeneticProfile(
        uint256 livestockId,
        string memory breed,
        string[] memory geneticMarkers,
        uint256 parent1Id,
        uint256 parent2Id
    ) public returns (uint256) {
        uint256 profileId = _profileIdCounter++;
        geneticProfiles[profileId] = GeneticProfile({
            profileId: profileId,
            livestockId: livestockId,
            breed: breed,
            geneticMarkers: geneticMarkers,
            parent1Id: parent1Id,
            parent2Id: parent2Id,
            owner: msg.sender,
            recordedAt: block.timestamp
        });

        profilesByOwner[msg.sender].push(profileId);

        emit GeneticProfileCreated(profileId, msg.sender, livestockId);
        return profileId;
    }

    function recordBreeding(
        uint256 parent1Id,
        uint256 parent2Id,
        uint256 offspringId,
        bool successful
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        breedingRecords[recordId] = BreedingRecord({
            recordId: recordId,
            parent1Id: parent1Id,
            parent2Id: parent2Id,
            offspringId: offspringId,
            breedingDate: block.timestamp,
            breeder: msg.sender,
            successful: successful
        });

        emit BreedingRecorded(recordId, parent1Id, parent2Id);
        return recordId;
    }

    function getGeneticProfile(uint256 profileId) public view returns (GeneticProfile memory) {
        return geneticProfiles[profileId];
    }

    function getProfilesByOwner(address owner) public view returns (uint256[] memory) {
        return profilesByOwner[owner];
    }
}


