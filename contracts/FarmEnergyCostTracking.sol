// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyCostTracking
 * @dev Track energy costs and consumption patterns
 */
contract FarmEnergyCostTracking is Ownable {
    struct CostRecord {
        uint256 recordId;
        address farmer;
        string energyType;
        uint256 consumption;
        uint256 cost;
        uint256 costPerUnit;
        uint256 recordDate;
    }

    mapping(uint256 => CostRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event CostRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 cost
    );

    constructor() Ownable(msg.sender) {}

    function recordCost(
        string memory energyType,
        uint256 consumption,
        uint256 cost
    ) public returns (uint256) {
        require(consumption > 0, "Invalid consumption");
        uint256 costPerUnit = (cost * 10000) / consumption;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = CostRecord({
            recordId: recordId,
            farmer: msg.sender,
            energyType: energyType,
            consumption: consumption,
            cost: cost,
            costPerUnit: costPerUnit,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit CostRecorded(recordId, msg.sender, cost);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (CostRecord memory) {
        return records[recordId];
    }
}
