// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterRecycling
 * @dev Water recycling and reuse tracking system
 */
contract FarmWaterRecycling is Ownable {
    struct RecyclingSystem {
        uint256 systemId;
        address farmer;
        string systemType;
        uint256 waterRecycled;
        uint256 efficiencyPercentage;
        uint256 installationDate;
    }

    mapping(uint256 => RecyclingSystem) public systems;
    mapping(address => uint256[]) public systemsByFarmer;
    uint256 private _systemIdCounter;

    event SystemInstalled(
        uint256 indexed systemId,
        address indexed farmer,
        string systemType
    );

    event WaterRecycled(
        uint256 indexed systemId,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function installSystem(
        string memory systemType,
        uint256 efficiencyPercentage
    ) public returns (uint256) {
        uint256 systemId = _systemIdCounter++;
        systems[systemId] = RecyclingSystem({
            systemId: systemId,
            farmer: msg.sender,
            systemType: systemType,
            waterRecycled: 0,
            efficiencyPercentage: efficiencyPercentage,
            installationDate: block.timestamp
        });

        systemsByFarmer[msg.sender].push(systemId);
        emit SystemInstalled(systemId, msg.sender, systemType);
        return systemId;
    }

    function recordRecycling(uint256 systemId, uint256 amount) public {
        require(systems[systemId].farmer == msg.sender, "Not authorized");
        systems[systemId].waterRecycled += amount;
        emit WaterRecycled(systemId, amount);
    }

    function getSystem(uint256 systemId) public view returns (RecyclingSystem memory) {
        return systems[systemId];
    }
}
