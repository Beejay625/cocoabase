// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPostHarvestManagement
 * @dev Manage post-harvest crop handling
 */
contract FarmCropPostHarvestManagement is Ownable {
    struct PostHarvestRecord {
        uint256 recordId;
        uint256 harvestId;
        string handlingMethod;
        uint256 storageDuration;
        uint256 qualityMaintained;
        uint256 recordedDate;
        address handler;
    }

    mapping(uint256 => PostHarvestRecord) public records;
    mapping(address => uint256[]) public recordsByOwner;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        address indexed owner,
        uint256 harvestId
    );

    constructor() Ownable(msg.sender) {}

    function createRecord(
        uint256 harvestId,
        string memory handlingMethod,
        uint256 storageDuration,
        uint256 qualityMaintained
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = PostHarvestRecord({
            recordId: recordId,
            harvestId: harvestId,
            handlingMethod: handlingMethod,
            storageDuration: storageDuration,
            qualityMaintained: qualityMaintained,
            recordedDate: block.timestamp,
            handler: msg.sender
        });

        recordsByOwner[msg.sender].push(recordId);

        emit RecordCreated(recordId, msg.sender, harvestId);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PostHarvestRecord memory) {
        return records[recordId];
    }

    function getRecordsByOwner(address owner) public view returns (uint256[] memory) {
        return recordsByOwner[owner];
    }
}


