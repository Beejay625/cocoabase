// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterConsumptionTracking
 * @dev Water consumption tracking and efficiency analysis
 */
contract FarmWaterConsumptionTracking is Ownable {
    struct ConsumptionRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 waterUsed;
        uint256 cropArea;
        uint256 consumptionDate;
    }

    mapping(uint256 => ConsumptionRecord) public records;
    uint256 private _recordIdCounter;

    event RecordCreated(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 waterUsed
    );

    constructor() Ownable(msg.sender) {}

    function recordConsumption(
        string memory fieldId,
        uint256 waterUsed,
        uint256 cropArea
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ConsumptionRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            waterUsed: waterUsed,
            cropArea: cropArea,
            consumptionDate: block.timestamp
        });

        emit RecordCreated(recordId, msg.sender, waterUsed);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ConsumptionRecord memory) {
        return records[recordId];
    }
}
