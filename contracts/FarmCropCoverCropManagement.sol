// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropCoverCropManagement
 * @dev Manage cover crop systems
 */
contract FarmCropCoverCropManagement is Ownable {
    struct CoverCropSystem {
        uint256 systemId;
        uint256 fieldId;
        string coverCropType;
        uint256 plantingDate;
        uint256 terminationDate;
        address manager;
    }

    mapping(uint256 => CoverCropSystem) public systems;
    mapping(address => uint256[]) public systemsByOwner;
    uint256 private _systemIdCounter;

    event SystemCreated(
        uint256 indexed systemId,
        address indexed owner,
        uint256 fieldId
    );

    constructor() Ownable(msg.sender) {}

    function createSystem(
        uint256 fieldId,
        string memory coverCropType,
        uint256 terminationDate
    ) public returns (uint256) {
        uint256 systemId = _systemIdCounter++;
        systems[systemId] = CoverCropSystem({
            systemId: systemId,
            fieldId: fieldId,
            coverCropType: coverCropType,
            plantingDate: block.timestamp,
            terminationDate: terminationDate,
            manager: msg.sender
        });

        systemsByOwner[msg.sender].push(systemId);

        emit SystemCreated(systemId, msg.sender, fieldId);
        return systemId;
    }

    function getSystem(uint256 systemId) public view returns (CoverCropSystem memory) {
        return systems[systemId];
    }

    function getSystemsByOwner(address owner) public view returns (uint256[] memory) {
        return systemsByOwner[owner];
    }
}


