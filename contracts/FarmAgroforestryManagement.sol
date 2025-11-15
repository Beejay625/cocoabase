// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAgroforestryManagement
 * @dev Onchain agroforestry system management and tracking
 */
contract FarmAgroforestryManagement is Ownable {
    struct AgroforestrySystem {
        uint256 systemId;
        address farmer;
        string fieldId;
        string treeSpecies;
        string cropSpecies;
        uint256 treeCount;
        uint256 cropArea;
        uint256 establishmentDate;
        string managementPlan;
        bool isActive;
    }

    mapping(uint256 => AgroforestrySystem) public systems;
    mapping(address => uint256[]) public systemsByFarmer;
    uint256 private _systemIdCounter;

    event SystemEstablished(
        uint256 indexed systemId,
        address indexed farmer,
        string treeSpecies,
        string cropSpecies
    );

    event SystemUpdated(
        uint256 indexed systemId,
        string managementPlan
    );

    constructor() Ownable(msg.sender) {}

    function establishSystem(
        string memory fieldId,
        string memory treeSpecies,
        string memory cropSpecies,
        uint256 treeCount,
        uint256 cropArea,
        string memory managementPlan
    ) public returns (uint256) {
        require(bytes(fieldId).length > 0, "Field ID required");
        require(treeCount > 0, "Tree count must be greater than 0");
        require(cropArea > 0, "Crop area must be greater than 0");

        uint256 systemId = _systemIdCounter++;
        systems[systemId] = AgroforestrySystem({
            systemId: systemId,
            farmer: msg.sender,
            fieldId: fieldId,
            treeSpecies: treeSpecies,
            cropSpecies: cropSpecies,
            treeCount: treeCount,
            cropArea: cropArea,
            establishmentDate: block.timestamp,
            managementPlan: managementPlan,
            isActive: true
        });

        systemsByFarmer[msg.sender].push(systemId);

        emit SystemEstablished(systemId, msg.sender, treeSpecies, cropSpecies);
        return systemId;
    }

    function updateManagementPlan(uint256 systemId, string memory managementPlan) public {
        require(systems[systemId].farmer == msg.sender, "Not system owner");
        require(systems[systemId].isActive, "System not active");

        systems[systemId].managementPlan = managementPlan;
        emit SystemUpdated(systemId, managementPlan);
    }

    function getSystem(uint256 systemId) public view returns (AgroforestrySystem memory) {
        return systems[systemId];
    }

    function getSystemsByFarmer(address farmer) public view returns (uint256[] memory) {
        return systemsByFarmer[farmer];
    }
}
