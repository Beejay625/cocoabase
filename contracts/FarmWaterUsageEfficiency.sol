// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterUsageEfficiency
 * @dev Onchain water usage efficiency metrics tracking
 */
contract FarmWaterUsageEfficiency is Ownable {
    struct EfficiencyRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 waterUsed;
        uint256 cropYield;
        uint256 efficiencyRatio;
        uint256 recordDate;
        string improvementMeasures;
    }

    mapping(uint256 => EfficiencyRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event EfficiencyRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 efficiencyRatio
    );

    constructor() Ownable(msg.sender) {}

    function recordEfficiency(
        string memory fieldId,
        uint256 waterUsed,
        uint256 cropYield,
        string memory improvementMeasures
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 efficiencyRatio = (cropYield * 100) / waterUsed;

        records[recordId] = EfficiencyRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            waterUsed: waterUsed,
            cropYield: cropYield,
            efficiencyRatio: efficiencyRatio,
            recordDate: block.timestamp,
            improvementMeasures: improvementMeasures
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit EfficiencyRecorded(recordId, msg.sender, fieldId, efficiencyRatio);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (EfficiencyRecord memory) {
        return records[recordId];
    }
}
