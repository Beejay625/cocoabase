// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropSeedlingManagement
 * @dev Onchain seedling management and nursery tracking
 */
contract FarmCropSeedlingManagement is Ownable {
    struct SeedlingBatch {
        uint256 batchId;
        address farmer;
        string cropType;
        uint256 quantity;
        uint256 plantingDate;
        uint256 germinationRate;
        string nurseryLocation;
    }

    mapping(uint256 => SeedlingBatch) public batches;
    mapping(address => uint256[]) public batchesByFarmer;
    uint256 private _batchIdCounter;

    event BatchCreated(
        uint256 indexed batchId,
        address indexed farmer,
        string cropType,
        uint256 quantity
    );

    constructor() Ownable(msg.sender) {}

    function createBatch(
        string memory cropType,
        uint256 quantity,
        uint256 plantingDate,
        uint256 germinationRate,
        string memory nurseryLocation
    ) public returns (uint256) {
        uint256 batchId = _batchIdCounter++;
        batches[batchId] = SeedlingBatch({
            batchId: batchId,
            farmer: msg.sender,
            cropType: cropType,
            quantity: quantity,
            plantingDate: plantingDate,
            germinationRate: germinationRate,
            nurseryLocation: nurseryLocation
        });

        batchesByFarmer[msg.sender].push(batchId);
        emit BatchCreated(batchId, msg.sender, cropType, quantity);
        return batchId;
    }

    function getBatch(uint256 batchId) public view returns (SeedlingBatch memory) {
        return batches[batchId];
    }
}

