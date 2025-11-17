// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropSeedProduction
 * @dev Seed production tracking system
 */
contract FarmCropSeedProduction is Ownable {
    struct SeedProduction {
        uint256 productionId;
        address producer;
        string variety;
        uint256 quantity;
        uint256 quality;
        uint256 timestamp;
    }

    mapping(uint256 => SeedProduction) public productions;
    mapping(address => uint256[]) public productionsByProducer;
    uint256 private _productionIdCounter;

    event ProductionRecorded(uint256 indexed productionId, string variety);

    constructor() Ownable(msg.sender) {}

    function recordProduction(
        string memory variety,
        uint256 quantity,
        uint256 quality
    ) public returns (uint256) {
        require(quantity > 0, "Invalid quantity");
        uint256 productionId = _productionIdCounter++;
        productions[productionId] = SeedProduction({
            productionId: productionId,
            producer: msg.sender,
            variety: variety,
            quantity: quantity,
            quality: quality,
            timestamp: block.timestamp
        });
        productionsByProducer[msg.sender].push(productionId);
        emit ProductionRecorded(productionId, variety);
        return productionId;
    }
}

