// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyConsumption
 * @dev Energy consumption tracking and optimization system
 */
contract FarmEnergyConsumption is Ownable {
    struct EnergyRecord {
        uint256 recordId;
        address farmer;
        string sourceType;
        uint256 consumption;
        uint256 cost;
        uint256 timestamp;
    }

    mapping(uint256 => EnergyRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event EnergyRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 consumption
    );

    constructor() Ownable(msg.sender) {}

    function recordEnergy(
        string memory sourceType,
        uint256 consumption,
        uint256 cost
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = EnergyRecord({
            recordId: recordId,
            farmer: msg.sender,
            sourceType: sourceType,
            consumption: consumption,
            cost: cost,
            timestamp: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit EnergyRecorded(recordId, msg.sender, consumption);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (EnergyRecord memory) {
        return records[recordId];
    }
}