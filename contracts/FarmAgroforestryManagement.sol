// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAgroforestryManagement
 * @dev Agroforestry system management and tracking
 */
contract FarmAgroforestryManagement is Ownable {
    struct AgroforestrySystem {
        uint256 systemId;
        address farmer;
        uint256 fieldId;
        string treeSpecies;
        uint256 treeCount;
        uint256 plantingDate;
        bool active;
    }

    mapping(uint256 => AgroforestrySystem) public systems;
    mapping(address => uint256[]) public systemsByFarmer;
    mapping(uint256 => uint256[]) public systemsByField;
    uint256 private _systemIdCounter;

    event SystemCreated(
        uint256 indexed systemId,
        address indexed farmer,
        uint256 fieldId
    );
    event SystemUpdated(uint256 indexed systemId, uint256 treeCount);

    constructor() Ownable(msg.sender) {}

    function createSystem(
        uint256 fieldId,
        string memory treeSpecies,
        uint256 treeCount
    ) public returns (uint256) {
        require(treeCount > 0, "Invalid tree count");
        uint256 systemId = _systemIdCounter++;
        systems[systemId] = AgroforestrySystem({
            systemId: systemId,
            farmer: msg.sender,
            fieldId: fieldId,
            treeSpecies: treeSpecies,
            treeCount: treeCount,
            plantingDate: block.timestamp,
            active: true
        });
        systemsByFarmer[msg.sender].push(systemId);
        systemsByField[fieldId].push(systemId);
        emit SystemCreated(systemId, msg.sender, fieldId);
        return systemId;
    }

    function updateTreeCount(uint256 systemId, uint256 newCount) public {
        require(systems[systemId].farmer == msg.sender, "Not the owner");
        systems[systemId].treeCount = newCount;
        emit SystemUpdated(systemId, newCount);
    }
}
