// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAgroforestryManagement
 * @dev Onchain system for managing agroforestry practices and tree integration
 */
contract FarmAgroforestryManagement is Ownable {
    struct AgroforestryRecord {
        uint256 recordId;
        uint256 farmId;
        string treeSpecies;
        uint256 treeCount;
        uint256 areaCovered;
        string agroforestryType;
        uint256 plantingDate;
        address manager;
    }

    mapping(uint256 => AgroforestryRecord) public agroforestryRecords;
    mapping(address => uint256[]) public recordsByManager;
    uint256 private _recordIdCounter;

    event AgroforestryRecorded(
        uint256 indexed recordId,
        address indexed manager,
        string treeSpecies
    );

    constructor() Ownable(msg.sender) {}

    function recordAgroforestry(
        uint256 farmId,
        string memory treeSpecies,
        uint256 treeCount,
        uint256 areaCovered,
        string memory agroforestryType,
        uint256 plantingDate
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        agroforestryRecords[recordId] = AgroforestryRecord({
            recordId: recordId,
            farmId: farmId,
            treeSpecies: treeSpecies,
            treeCount: treeCount,
            areaCovered: areaCovered,
            agroforestryType: agroforestryType,
            plantingDate: plantingDate,
            manager: msg.sender
        });

        recordsByManager[msg.sender].push(recordId);

        emit AgroforestryRecorded(recordId, msg.sender, treeSpecies);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (AgroforestryRecord memory) {
        return agroforestryRecords[recordId];
    }
}

