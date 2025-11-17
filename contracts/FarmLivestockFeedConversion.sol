// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedConversion
 * @dev Feed conversion efficiency tracking
 */
contract FarmLivestockFeedConversion is Ownable {
    struct Conversion {
        uint256 conversionId;
        address farmer;
        uint256 animalId;
        uint256 feedAmount;
        uint256 weightGain;
        uint256 efficiency;
        uint256 timestamp;
    }

    mapping(uint256 => Conversion) public conversions;
    mapping(address => uint256[]) public conversionsByFarmer;
    uint256 private _conversionIdCounter;

    event ConversionRecorded(uint256 indexed conversionId, uint256 efficiency);

    constructor() Ownable(msg.sender) {}

    function recordConversion(
        uint256 animalId,
        uint256 feedAmount,
        uint256 weightGain
    ) public returns (uint256) {
        require(feedAmount > 0, "Invalid feed amount");
        uint256 efficiency = (weightGain * 100) / feedAmount;
        uint256 conversionId = _conversionIdCounter++;
        conversions[conversionId] = Conversion({
            conversionId: conversionId,
            farmer: msg.sender,
            animalId: animalId,
            feedAmount: feedAmount,
            weightGain: weightGain,
            efficiency: efficiency,
            timestamp: block.timestamp
        });
        conversionsByFarmer[msg.sender].push(conversionId);
        emit ConversionRecorded(conversionId, efficiency);
        return conversionId;
    }
}
