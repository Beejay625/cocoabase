// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmHarvestOriginTracking
 * @dev Onchain harvest origin and batch tracking
 */
contract FarmHarvestOriginTracking is Ownable {
    struct HarvestOrigin {
        uint256 harvestId;
        address farmer;
        string harvestBatchId;
        string fieldId;
        string cropType;
        uint256 harvestDate;
        uint256 quantity;
        string qualityGrade;
        string coordinates;
        bool isVerified;
    }

    mapping(uint256 => HarvestOrigin) public harvests;
    mapping(string => uint256) public harvestsByBatchId;
    mapping(address => uint256[]) public harvestsByFarmer;
    uint256 private _harvestIdCounter;

    event HarvestRecorded(
        uint256 indexed harvestId,
        address indexed farmer,
        string harvestBatchId
    );

    event HarvestVerified(
        uint256 indexed harvestId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function recordHarvest(
        string memory harvestBatchId,
        string memory fieldId,
        string memory cropType,
        uint256 quantity,
        string memory qualityGrade,
        string memory coordinates
    ) public returns (uint256) {
        require(bytes(harvestBatchId).length > 0, "Harvest batch ID required");
        require(harvestsByBatchId[harvestBatchId] == 0, "Batch already recorded");
        require(quantity > 0, "Quantity must be greater than 0");

        uint256 harvestId = _harvestIdCounter++;
        harvests[harvestId] = HarvestOrigin({
            harvestId: harvestId,
            farmer: msg.sender,
            harvestBatchId: harvestBatchId,
            fieldId: fieldId,
            cropType: cropType,
            harvestDate: block.timestamp,
            quantity: quantity,
            qualityGrade: qualityGrade,
            coordinates: coordinates,
            isVerified: false
        });

        harvestsByBatchId[harvestBatchId] = harvestId;
        harvestsByFarmer[msg.sender].push(harvestId);

        emit HarvestRecorded(harvestId, msg.sender, harvestBatchId);
        return harvestId;
    }

    function verifyHarvest(uint256 harvestId) public onlyOwner {
        require(!harvests[harvestId].isVerified, "Already verified");
        harvests[harvestId].isVerified = true;

        emit HarvestVerified(harvestId, msg.sender);
    }

    function getHarvest(uint256 harvestId) public view returns (HarvestOrigin memory) {
        return harvests[harvestId];
    }

    function getHarvestByBatchId(string memory harvestBatchId) public view returns (HarvestOrigin memory) {
        uint256 harvestId = harvestsByBatchId[harvestBatchId];
        return harvests[harvestId];
    }
}

