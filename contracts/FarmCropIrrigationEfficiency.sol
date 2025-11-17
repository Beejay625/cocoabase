// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropIrrigationEfficiency
 * @dev Irrigation efficiency tracking and optimization
 */
contract FarmCropIrrigationEfficiency is Ownable {
    struct EfficiencyRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 waterApplied;
        uint256 cropResponse;
        uint256 efficiencyPercentage;
        uint256 recordDate;
    }

    mapping(uint256 => EfficiencyRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event EfficiencyRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 efficiencyPercentage
    );

    constructor() Ownable(msg.sender) {}

    function recordEfficiency(
        string memory fieldId,
        uint256 waterApplied,
        uint256 cropResponse
    ) public returns (uint256) {
        require(waterApplied > 0, "Invalid water amount");
        uint256 efficiencyPercentage = (cropResponse * 10000) / waterApplied;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = EfficiencyRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            waterApplied: waterApplied,
            cropResponse: cropResponse,
            efficiencyPercentage: efficiencyPercentage,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit EfficiencyRecorded(recordId, msg.sender, efficiencyPercentage);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (EfficiencyRecord memory) {
        return records[recordId];
    }
}