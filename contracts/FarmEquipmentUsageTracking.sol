// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentUsageTracking
 * @dev Onchain equipment usage hours and efficiency tracking
 */
contract FarmEquipmentUsageTracking is Ownable {
    struct UsageRecord {
        uint256 recordId;
        address farmer;
        string equipmentId;
        uint256 hoursUsed;
        string taskType;
        uint256 fuelConsumed;
        uint256 timestamp;
    }

    mapping(uint256 => UsageRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    mapping(string => uint256) public totalHoursByEquipment;
    uint256 private _recordIdCounter;

    event UsageRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string equipmentId,
        uint256 hoursUsed
    );

    constructor() Ownable(msg.sender) {}

    function recordUsage(
        string memory equipmentId,
        uint256 hoursUsed,
        string memory taskType,
        uint256 fuelConsumed
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = UsageRecord({
            recordId: recordId,
            farmer: msg.sender,
            equipmentId: equipmentId,
            hoursUsed: hoursUsed,
            taskType: taskType,
            fuelConsumed: fuelConsumed,
            timestamp: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        totalHoursByEquipment[equipmentId] += hoursUsed;

        emit UsageRecorded(recordId, msg.sender, equipmentId, hoursUsed);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (UsageRecord memory) {
        return records[recordId];
    }
}

