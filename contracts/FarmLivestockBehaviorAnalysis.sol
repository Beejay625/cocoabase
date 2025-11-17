// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockBehaviorAnalysis
 * @dev Onchain livestock behavior observation and analysis
 */
contract FarmLivestockBehaviorAnalysis is Ownable {
    struct BehaviorRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string behaviorType;
        string observations;
        uint256 recordDate;
        string healthIndicator;
    }

    mapping(uint256 => BehaviorRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event BehaviorRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string behaviorType
    );

    constructor() Ownable(msg.sender) {}

    function recordBehavior(
        string memory livestockId,
        string memory behaviorType,
        string memory observations,
        string memory healthIndicator
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = BehaviorRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            behaviorType: behaviorType,
            observations: observations,
            recordDate: block.timestamp,
            healthIndicator: healthIndicator
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit BehaviorRecorded(recordId, msg.sender, livestockId, behaviorType);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (BehaviorRecord memory) {
        return records[recordId];
    }
}
