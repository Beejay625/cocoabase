// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFishFarmingManagement
 * @dev Aquaculture and fish farming operations management
 */
contract FarmFishFarmingManagement is Ownable {
    struct FishFarm {
        uint256 farmId;
        address owner;
        string location;
        string fishSpecies;
        uint256 population;
        uint256 tankVolume;
        uint256 waterTemperature;
        uint256 dissolvedOxygen;
        uint256 lastFeeding;
        bool active;
    }

    mapping(uint256 => FishFarm) public farms;
    mapping(address => uint256[]) public farmsByOwner;
    uint256 private _farmIdCounter;

    event FarmRegistered(
        uint256 indexed farmId,
        address indexed owner,
        string fishSpecies
    );

    event FeedingRecorded(
        uint256 indexed farmId,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {}

    function registerFarm(
        string memory location,
        string memory fishSpecies,
        uint256 population,
        uint256 tankVolume,
        uint256 waterTemperature,
        uint256 dissolvedOxygen
    ) public returns (uint256) {
        uint256 farmId = _farmIdCounter++;
        farms[farmId] = FishFarm({
            farmId: farmId,
            owner: msg.sender,
            location: location,
            fishSpecies: fishSpecies,
            population: population,
            tankVolume: tankVolume,
            waterTemperature: waterTemperature,
            dissolvedOxygen: dissolvedOxygen,
            lastFeeding: block.timestamp,
            active: true
        });

        farmsByOwner[msg.sender].push(farmId);
        emit FarmRegistered(farmId, msg.sender, fishSpecies);
        return farmId;
    }

    function recordFeeding(uint256 farmId) public {
        require(farms[farmId].owner == msg.sender, "Not authorized");
        farms[farmId].lastFeeding = block.timestamp;
        emit FeedingRecorded(farmId, block.timestamp);
    }

    function updateWaterConditions(
        uint256 farmId,
        uint256 waterTemperature,
        uint256 dissolvedOxygen
    ) public {
        require(farms[farmId].owner == msg.sender, "Not authorized");
        farms[farmId].waterTemperature = waterTemperature;
        farms[farmId].dissolvedOxygen = dissolvedOxygen;
    }

    function getFarm(uint256 farmId) public view returns (FishFarm memory) {
        return farms[farmId];
    }
}
