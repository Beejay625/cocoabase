// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropRipeningMonitoring
 * @dev Onchain ripening process monitoring and harvest readiness
 */
contract FarmCropRipeningMonitoring is Ownable {
    struct RipeningRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string cropType;
        uint256 ripenessPercentage;
        string color;
        string texture;
        uint256 recordDate;
        bool isReadyForHarvest;
    }

    mapping(uint256 => RipeningRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event RipeningRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 ripenessPercentage
    );

    constructor() Ownable(msg.sender) {}

    function recordRipening(
        string memory fieldId,
        string memory cropType,
        uint256 ripenessPercentage,
        string memory color,
        string memory texture
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        bool isReadyForHarvest = ripenessPercentage >= 85;

        records[recordId] = RipeningRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            cropType: cropType,
            ripenessPercentage: ripenessPercentage,
            color: color,
            texture: texture,
            recordDate: block.timestamp,
            isReadyForHarvest: isReadyForHarvest
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit RipeningRecorded(recordId, msg.sender, fieldId, ripenessPercentage);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (RipeningRecord memory) {
        return records[recordId];
    }
}

