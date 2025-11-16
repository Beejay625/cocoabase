// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmClimateRiskAnalytics
 * @dev Onchain registry for climate risk scores, scenarios, and yield sensitivity analysis
 */
contract FarmClimateRiskAnalytics is Ownable {
    struct ClimateRiskRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 climateRiskScore;
        string scenarioName;
        uint256 projectedYieldImpact;
        uint256 timestamp;
    }

    mapping(uint256 => ClimateRiskRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ClimateRiskRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 climateRiskScore
    );

    constructor() Ownable(msg.sender) {}

    function recordClimateRisk(
        string memory fieldId,
        uint256 climateRiskScore,
        string memory scenarioName,
        uint256 projectedYieldImpact
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ClimateRiskRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            climateRiskScore: climateRiskScore,
            scenarioName: scenarioName,
            projectedYieldImpact: projectedYieldImpact,
            timestamp: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ClimateRiskRecorded(recordId, msg.sender, fieldId, climateRiskScore);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ClimateRiskRecord memory) {
        return records[recordId];
    }
}


