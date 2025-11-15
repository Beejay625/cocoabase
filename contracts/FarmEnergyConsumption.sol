// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyConsumption
 * @dev Onchain system for tracking energy consumption across farm operations
 */
contract FarmEnergyConsumption is Ownable {
    struct EnergyConsumptionRecord {
        uint256 recordId;
        uint256 facilityId;
        uint256 energyConsumed;
        string energyType;
        string operationType;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => EnergyConsumptionRecord) public energyConsumptionRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event EnergyConsumptionRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        uint256 energyConsumed
    );

    constructor() Ownable(msg.sender) {}

    function recordEnergyConsumption(
        uint256 facilityId,
        uint256 energyConsumed,
        string memory energyType,
        string memory operationType,
        uint256 recordDate
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        energyConsumptionRecords[recordId] = EnergyConsumptionRecord({
            recordId: recordId,
            facilityId: facilityId,
            energyConsumed: energyConsumed,
            energyType: energyType,
            operationType: operationType,
            recordDate: recordDate,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit EnergyConsumptionRecorded(recordId, msg.sender, energyConsumed);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (EnergyConsumptionRecord memory) {
        return energyConsumptionRecords[recordId];
    }
}

