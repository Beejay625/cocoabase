// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropFruitDevelopmentTracking
 * @dev Onchain fruit development tracking and yield prediction
 */
contract FarmCropFruitDevelopmentTracking is Ownable {
    struct FruitDevelopment {
        uint256 recordId;
        address farmer;
        string fieldId;
        string cropType;
        uint256 fruitCount;
        uint256 averageSize;
        uint256 developmentStage;
        uint256 recordDate;
        string qualityIndicators;
    }

    mapping(uint256 => FruitDevelopment) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event DevelopmentRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 fruitCount
    );

    constructor() Ownable(msg.sender) {}

    function recordDevelopment(
        string memory fieldId,
        string memory cropType,
        uint256 fruitCount,
        uint256 averageSize,
        uint256 developmentStage,
        string memory qualityIndicators
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = FruitDevelopment({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            cropType: cropType,
            fruitCount: fruitCount,
            averageSize: averageSize,
            developmentStage: developmentStage,
            recordDate: block.timestamp,
            qualityIndicators: qualityIndicators
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit DevelopmentRecorded(recordId, msg.sender, fieldId, fruitCount);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (FruitDevelopment memory) {
        return records[recordId];
    }
}

