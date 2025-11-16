// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPollinatorHabitatTracking
 * @dev Pollinator habitat creation and management tracking
 */
contract FarmPollinatorHabitatTracking is Ownable {
    struct Habitat {
        uint256 habitatId;
        address farmer;
        string habitatType;
        uint256 areaCovered;
        uint256 establishmentDate;
        uint256 pollinatorCount;
        bool verified;
    }

    mapping(uint256 => Habitat) public habitats;
    mapping(address => uint256[]) public habitatsByFarmer;
    uint256 private _habitatIdCounter;

    event HabitatCreated(
        uint256 indexed habitatId,
        address indexed farmer,
        string habitatType
    );

    event PollinatorCountUpdated(
        uint256 indexed habitatId,
        uint256 pollinatorCount
    );

    constructor() Ownable(msg.sender) {}

    function createHabitat(
        string memory habitatType,
        uint256 areaCovered
    ) public returns (uint256) {
        uint256 habitatId = _habitatIdCounter++;
        habitats[habitatId] = Habitat({
            habitatId: habitatId,
            farmer: msg.sender,
            habitatType: habitatType,
            areaCovered: areaCovered,
            establishmentDate: block.timestamp,
            pollinatorCount: 0,
            verified: false
        });

        habitatsByFarmer[msg.sender].push(habitatId);
        emit HabitatCreated(habitatId, msg.sender, habitatType);
        return habitatId;
    }

    function updatePollinatorCount(uint256 habitatId, uint256 pollinatorCount) public {
        require(habitats[habitatId].farmer == msg.sender, "Not authorized");
        habitats[habitatId].pollinatorCount = pollinatorCount;
        emit PollinatorCountUpdated(habitatId, pollinatorCount);
    }

    function verifyHabitat(uint256 habitatId) public onlyOwner {
        habitats[habitatId].verified = true;
    }

    function getHabitat(uint256 habitatId) public view returns (Habitat memory) {
        return habitats[habitatId];
    }
}
