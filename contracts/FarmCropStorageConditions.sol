// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStorageConditions
 * @dev Onchain storage conditions monitoring for quality preservation
 */
contract FarmCropStorageConditions is Ownable {
    struct ConditionRecord {
        uint256 recordId;
        address farmer;
        string storageId;
        uint256 temperature;
        uint256 humidity;
        uint256 recordDate;
        string conditionStatus;
        bool isOptimal;
    }

    mapping(uint256 => ConditionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ConditionRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string storageId,
        string conditionStatus
    );

    constructor() Ownable(msg.sender) {}

    function recordConditions(
        string memory storageId,
        uint256 temperature,
        uint256 humidity
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        string memory conditionStatus = "Optimal";
        bool isOptimal = true;

        if (temperature > 25 || temperature < 10 || humidity > 70 || humidity < 40) {
            conditionStatus = "Suboptimal";
            isOptimal = false;
        }

        records[recordId] = ConditionRecord({
            recordId: recordId,
            farmer: msg.sender,
            storageId: storageId,
            temperature: temperature,
            humidity: humidity,
            recordDate: block.timestamp,
            conditionStatus: conditionStatus,
            isOptimal: isOptimal
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ConditionRecorded(recordId, msg.sender, storageId, conditionStatus);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ConditionRecord memory) {
        return records[recordId];
    }
}
