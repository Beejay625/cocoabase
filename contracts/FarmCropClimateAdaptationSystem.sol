// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropClimateAdaptationSystem
 * @dev Onchain climate adaptation strategies system
 */
contract FarmCropClimateAdaptationSystem is Ownable {
    struct AdaptationRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string adaptationStrategy;
        uint256 implementationDate;
        uint256 effectiveness;
        string climateCondition;
        uint256 impact;
    }

    mapping(uint256 => AdaptationRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event AdaptationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string adaptationStrategy
    );

    constructor() Ownable(msg.sender) {}

    function recordAdaptation(
        string memory fieldId,
        string memory adaptationStrategy,
        uint256 effectiveness,
        string memory climateCondition,
        uint256 impact
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = AdaptationRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            adaptationStrategy: adaptationStrategy,
            implementationDate: block.timestamp,
            effectiveness: effectiveness,
            climateCondition: climateCondition,
            impact: impact
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit AdaptationRecorded(recordId, msg.sender, fieldId, adaptationStrategy);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (AdaptationRecord memory) {
        return records[recordId];
    }
}

