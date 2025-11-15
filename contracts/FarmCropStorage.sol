// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStorage
 * @dev Onchain system for tracking crop storage
 */
contract FarmCropStorage is Ownable {
    struct StorageRecord {
        uint256 recordId;
        uint256 harvestId;
        string storageType;
        uint256 quantity;
        uint256 storageDate;
        uint256 expiryDate;
        address manager;
    }

    mapping(uint256 => StorageRecord) public storageRecords;
    mapping(address => uint256[]) public recordsByManager;
    uint256 private _recordIdCounter;

    event CropStored(
        uint256 indexed recordId,
        address indexed manager,
        uint256 quantity
    );

    constructor() Ownable(msg.sender) {}

    function recordStorage(
        uint256 harvestId,
        string memory storageType,
        uint256 quantity,
        uint256 expiryDate
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        storageRecords[recordId] = StorageRecord({
            recordId: recordId,
            harvestId: harvestId,
            storageType: storageType,
            quantity: quantity,
            storageDate: block.timestamp,
            expiryDate: expiryDate,
            manager: msg.sender
        });

        recordsByManager[msg.sender].push(recordId);

        emit CropStored(recordId, msg.sender, quantity);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (StorageRecord memory) {
        return storageRecords[recordId];
    }
}



