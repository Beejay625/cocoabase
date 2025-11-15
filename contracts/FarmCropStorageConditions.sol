// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStorageConditions
 * @dev Onchain system for monitoring and maintaining optimal storage conditions
 */
contract FarmCropStorageConditions is Ownable {
    struct StorageCondition {
        uint256 conditionId;
        uint256 storageUnitId;
        uint256 temperature;
        uint256 humidity;
        uint256 timestamp;
        bool conditionsOptimal;
        address monitor;
    }

    mapping(uint256 => StorageCondition) public storageConditions;
    mapping(address => uint256[]) public conditionsByMonitor;
    uint256 private _conditionIdCounter;

    event StorageConditionRecorded(
        uint256 indexed conditionId,
        address indexed monitor,
        bool conditionsOptimal
    );

    constructor() Ownable(msg.sender) {}

    function recordStorageCondition(
        uint256 storageUnitId,
        uint256 temperature,
        uint256 humidity,
        bool conditionsOptimal
    ) public returns (uint256) {
        uint256 conditionId = _conditionIdCounter++;
        storageConditions[conditionId] = StorageCondition({
            conditionId: conditionId,
            storageUnitId: storageUnitId,
            temperature: temperature,
            humidity: humidity,
            timestamp: block.timestamp,
            conditionsOptimal: conditionsOptimal,
            monitor: msg.sender
        });

        conditionsByMonitor[msg.sender].push(conditionId);

        emit StorageConditionRecorded(conditionId, msg.sender, conditionsOptimal);
        return conditionId;
    }

    function getCondition(uint256 conditionId) public view returns (StorageCondition memory) {
        return storageConditions[conditionId];
    }
}

