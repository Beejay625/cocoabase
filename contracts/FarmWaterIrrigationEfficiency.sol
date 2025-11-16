// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterIrrigationEfficiency
 * @dev Onchain irrigation efficiency tracking and optimization
 */
contract FarmWaterIrrigationEfficiency is Ownable {
    struct EfficiencyRecord {
        uint256 recordId;
        address farmer;
        string irrigationSystemId;
        uint256 waterApplied;
        uint256 waterUsed;
        uint256 efficiency;
        uint256 recordDate;
        string improvements;
    }

    mapping(uint256 => EfficiencyRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event EfficiencyRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string irrigationSystemId,
        uint256 efficiency
    );

    constructor() Ownable(msg.sender) {}

    function recordEfficiency(
        string memory irrigationSystemId,
        uint256 waterApplied,
        uint256 waterUsed,
        string memory improvements
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 efficiency = (waterUsed * 100) / waterApplied;

        records[recordId] = EfficiencyRecord({
            recordId: recordId,
            farmer: msg.sender,
            irrigationSystemId: irrigationSystemId,
            waterApplied: waterApplied,
            waterUsed: waterUsed,
            efficiency: efficiency,
            recordDate: block.timestamp,
            improvements: improvements
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit EfficiencyRecorded(recordId, msg.sender, irrigationSystemId, efficiency);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (EfficiencyRecord memory) {
        return records[recordId];
    }
}

