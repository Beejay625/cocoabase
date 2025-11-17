// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropSeedBank
 * @dev Seed bank management and preservation
 */
contract FarmCropSeedBank is Ownable {
    struct SeedCollection {
        uint256 collectionId;
        address depositor;
        string variety;
        bytes32 seedHash;
        uint256 depositDate;
        bool available;
    }

    mapping(uint256 => SeedCollection) public collections;
    mapping(address => uint256[]) public collectionsByDepositor;
    uint256 private _collectionIdCounter;

    event CollectionDeposited(uint256 indexed collectionId, string variety);
    event CollectionWithdrawn(uint256 indexed collectionId);

    constructor() Ownable(msg.sender) {}

    function depositSeed(
        string memory variety,
        bytes32 seedHash
    ) public returns (uint256) {
        uint256 collectionId = _collectionIdCounter++;
        collections[collectionId] = SeedCollection({
            collectionId: collectionId,
            depositor: msg.sender,
            variety: variety,
            seedHash: seedHash,
            depositDate: block.timestamp,
            available: true
        });
        collectionsByDepositor[msg.sender].push(collectionId);
        emit CollectionDeposited(collectionId, variety);
        return collectionId;
    }

    function withdrawSeed(uint256 collectionId) public {
        require(collections[collectionId].depositor == msg.sender, "Not the depositor");
        require(collections[collectionId].available, "Not available");
        collections[collectionId].available = false;
        emit CollectionWithdrawn(collectionId);
    }
}

