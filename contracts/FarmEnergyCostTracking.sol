// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyCostTracking
 * @dev Onchain energy costs and consumption patterns tracking
 */
contract FarmEnergyCostTracking is Ownable {
    struct CostRecord {
        uint256 recordId;
        address farmer;
        uint256 energyConsumed;
        uint256 cost;
        uint256 costPerUnit;
        uint256 recordDate;
        string period;
        string source;
    }

    mapping(uint256 => CostRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event CostRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 cost,
        uint256 costPerUnit
    );

    constructor() Ownable(msg.sender) {}

    function recordCost(
        uint256 energyConsumed,
        uint256 cost,
        string memory period,
        string memory source
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        uint256 costPerUnit = (cost * 100) / energyConsumed;

        records[recordId] = CostRecord({
            recordId: recordId,
            farmer: msg.sender,
            energyConsumed: energyConsumed,
            cost: cost,
            costPerUnit: costPerUnit,
            recordDate: block.timestamp,
            period: period,
            source: source
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit CostRecorded(recordId, msg.sender, cost, costPerUnit);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (CostRecord memory) {
        return records[recordId];
    }
}
