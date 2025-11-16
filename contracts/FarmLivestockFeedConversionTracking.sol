// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedConversionTracking
 * @dev Onchain feed conversion ratio tracking for livestock efficiency
 */
contract FarmLivestockFeedConversionTracking is Ownable {
    struct ConversionRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 feedConsumed;
        uint256 weightGained;
        uint256 conversionRatio;
        uint256 periodStart;
        uint256 periodEnd;
    }

    mapping(uint256 => ConversionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ConversionRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        uint256 conversionRatio
    );

    constructor() Ownable(msg.sender) {}

    function recordConversion(
        string memory livestockId,
        uint256 feedConsumed,
        uint256 weightGained,
        uint256 periodStart,
        uint256 periodEnd
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 conversionRatio = (feedConsumed * 100) / weightGained;

        records[recordId] = ConversionRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            feedConsumed: feedConsumed,
            weightGained: weightGained,
            conversionRatio: conversionRatio,
            periodStart: periodStart,
            periodEnd: periodEnd
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ConversionRecorded(recordId, msg.sender, livestockId, conversionRatio);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ConversionRecord memory) {
        return records[recordId];
    }
}

