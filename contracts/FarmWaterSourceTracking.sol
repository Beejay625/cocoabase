// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterSourceTracking
 * @dev Track water sources and usage patterns
 */
contract FarmWaterSourceTracking is Ownable {
    struct WaterSource {
        uint256 sourceId;
        address farmer;
        string sourceType;
        uint256 capacity;
        uint256 usageThisMonth;
        uint256 lastUpdated;
    }

    mapping(uint256 => WaterSource) public sources;
    mapping(address => uint256[]) public sourcesByFarmer;
    uint256 private _sourceIdCounter;

    event SourceRegistered(
        uint256 indexed sourceId,
        address indexed farmer,
        string sourceType
    );

    event UsageUpdated(
        uint256 indexed sourceId,
        uint256 usageThisMonth
    );

    constructor() Ownable(msg.sender) {}

    function registerSource(
        string memory sourceType,
        uint256 capacity
    ) public returns (uint256) {
        uint256 sourceId = _sourceIdCounter++;
        sources[sourceId] = WaterSource({
            sourceId: sourceId,
            farmer: msg.sender,
            sourceType: sourceType,
            capacity: capacity,
            usageThisMonth: 0,
            lastUpdated: block.timestamp
        });

        sourcesByFarmer[msg.sender].push(sourceId);
        emit SourceRegistered(sourceId, msg.sender, sourceType);
        return sourceId;
    }

    function updateUsage(uint256 sourceId, uint256 usage) public {
        require(sources[sourceId].farmer == msg.sender, "Not authorized");
        sources[sourceId].usageThisMonth += usage;
        sources[sourceId].lastUpdated = block.timestamp;
        emit UsageUpdated(sourceId, sources[sourceId].usageThisMonth);
    }

    function getSource(uint256 sourceId) public view returns (WaterSource memory) {
        return sources[sourceId];
    }
}
