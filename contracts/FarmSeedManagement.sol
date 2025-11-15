// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSeedManagement
 * @dev Onchain system for managing seed inventory and quality
 */
contract FarmSeedManagement is Ownable {
    struct SeedBatch {
        uint256 batchId;
        string seedType;
        uint256 quantity;
        uint256 purchaseDate;
        string quality;
        uint256 germinationRate;
        address manager;
    }

    mapping(uint256 => SeedBatch) public seedBatches;
    mapping(address => uint256[]) public batchesByManager;
    uint256 private _batchIdCounter;

    event SeedBatchAdded(
        uint256 indexed batchId,
        address indexed manager,
        string seedType
    );

    constructor() Ownable(msg.sender) {}

    function addSeedBatch(
        string memory seedType,
        uint256 quantity,
        string memory quality,
        uint256 germinationRate
    ) public returns (uint256) {
        uint256 batchId = _batchIdCounter++;
        seedBatches[batchId] = SeedBatch({
            batchId: batchId,
            seedType: seedType,
            quantity: quantity,
            purchaseDate: block.timestamp,
            quality: quality,
            germinationRate: germinationRate,
            manager: msg.sender
        });

        batchesByManager[msg.sender].push(batchId);

        emit SeedBatchAdded(batchId, msg.sender, seedType);
        return batchId;
    }

    function getBatch(uint256 batchId) public view returns (SeedBatch memory) {
        return seedBatches[batchId];
    }
}



