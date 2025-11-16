// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterQualityMonitoring
 * @dev Onchain continuous water quality monitoring and alerts
 */
contract FarmWaterQualityMonitoring is Ownable {
    struct QualityRecord {
        uint256 recordId;
        address farmer;
        string waterSource;
        uint256 phLevel;
        uint256 turbidity;
        uint256 dissolvedOxygen;
        uint256 recordDate;
        string qualityStatus;
        bool requiresAction;
    }

    mapping(uint256 => QualityRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event QualityRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string waterSource,
        string qualityStatus
    );

    constructor() Ownable(msg.sender) {}

    function recordQuality(
        string memory waterSource,
        uint256 phLevel,
        uint256 turbidity,
        uint256 dissolvedOxygen
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        string memory qualityStatus = "Good";
        bool requiresAction = false;

        if (phLevel < 6 || phLevel > 8 || turbidity > 5 || dissolvedOxygen < 5) {
            qualityStatus = "Poor";
            requiresAction = true;
        }

        records[recordId] = QualityRecord({
            recordId: recordId,
            farmer: msg.sender,
            waterSource: waterSource,
            phLevel: phLevel,
            turbidity: turbidity,
            dissolvedOxygen: dissolvedOxygen,
            recordDate: block.timestamp,
            qualityStatus: qualityStatus,
            requiresAction: requiresAction
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit QualityRecorded(recordId, msg.sender, waterSource, qualityStatus);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (QualityRecord memory) {
        return records[recordId];
    }
}
