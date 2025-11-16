// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyStorageManagement
 * @dev Onchain energy storage system management and capacity tracking
 */
contract FarmEnergyStorageManagement is Ownable {
    struct StorageSystem {
        uint256 systemId;
        address farmer;
        string systemType;
        uint256 capacity;
        uint256 currentCharge;
        uint256 efficiency;
        uint256 recordDate;
        string status;
    }

    mapping(uint256 => StorageSystem) public systems;
    mapping(address => uint256[]) public systemsByFarmer;
    uint256 private _systemIdCounter;

    event SystemRecorded(
        uint256 indexed systemId,
        address indexed farmer,
        string systemType,
        uint256 capacity
    );

    constructor() Ownable(msg.sender) {}

    function recordSystem(
        string memory systemType,
        uint256 capacity,
        uint256 currentCharge,
        uint256 efficiency,
        string memory status
    ) public returns (uint256) {
        uint256 systemId = _systemIdCounter++;
        systems[systemId] = StorageSystem({
            systemId: systemId,
            farmer: msg.sender,
            systemType: systemType,
            capacity: capacity,
            currentCharge: currentCharge,
            efficiency: efficiency,
            recordDate: block.timestamp,
            status: status
        });

        systemsByFarmer[msg.sender].push(systemId);
        emit SystemRecorded(systemId, msg.sender, systemType, capacity);
        return systemId;
    }

    function getSystem(uint256 systemId) public view returns (StorageSystem memory) {
        return systems[systemId];
    }
}

