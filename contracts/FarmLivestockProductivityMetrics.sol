// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockProductivityMetrics
 * @dev Onchain productivity metrics and performance tracking
 */
contract FarmLivestockProductivityMetrics is Ownable {
    struct ProductivityRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 productionOutput;
        uint256 periodStart;
        uint256 periodEnd;
        string metricType;
        uint256 efficiency;
    }

    mapping(uint256 => ProductivityRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ProductivityRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        uint256 productionOutput
    );

    constructor() Ownable(msg.sender) {}

    function recordProductivity(
        string memory livestockId,
        uint256 productionOutput,
        uint256 periodStart,
        uint256 periodEnd,
        string memory metricType,
        uint256 inputCost
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 efficiency = inputCost > 0 ? (productionOutput * 100) / inputCost : 0;

        records[recordId] = ProductivityRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            productionOutput: productionOutput,
            periodStart: periodStart,
            periodEnd: periodEnd,
            metricType: metricType,
            efficiency: efficiency
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ProductivityRecorded(recordId, msg.sender, livestockId, productionOutput);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ProductivityRecord memory) {
        return records[recordId];
    }
}
