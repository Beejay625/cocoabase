// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterUsageTracking
 * @dev Water usage tracking and monitoring
 */
contract FarmWaterUsageTracking is Ownable {
    struct WaterUsage {
        uint256 usageId;
        address farmer;
        uint256 fieldId;
        uint256 amount;
        uint256 timestamp;
        string source;
    }

    mapping(uint256 => WaterUsage) public usageRecords;
    mapping(address => uint256[]) public usageByFarmer;
    mapping(uint256 => uint256) public totalUsageByField;
    uint256 private _usageIdCounter;

    event WaterUsageRecorded(
        uint256 indexed usageId,
        address indexed farmer,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function recordUsage(
        uint256 fieldId,
        uint256 amount,
        string memory source
    ) public returns (uint256) {
        require(amount > 0, "Invalid amount");
        uint256 usageId = _usageIdCounter++;
        usageRecords[usageId] = WaterUsage({
            usageId: usageId,
            farmer: msg.sender,
            fieldId: fieldId,
            amount: amount,
            timestamp: block.timestamp,
            source: source
        });
        usageByFarmer[msg.sender].push(usageId);
        totalUsageByField[fieldId] += amount;
        emit WaterUsageRecorded(usageId, msg.sender, amount);
        return usageId;
    }

    function getTotalUsage(uint256 fieldId) public view returns (uint256) {
        return totalUsageByField[fieldId];
    }
}
