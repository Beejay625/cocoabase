// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropNutrientBalance
 * @dev Track crop nutrient balance and deficiencies
 */
contract FarmCropNutrientBalance is Ownable {
    struct NutrientBalance {
        uint256 recordId;
        address farmer;
        string cropType;
        uint256 nitrogen;
        uint256 phosphorus;
        uint256 potassium;
        uint256 balanceScore;
        uint256 recordDate;
    }

    mapping(uint256 => NutrientBalance) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event BalanceRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 balanceScore
    );

    constructor() Ownable(msg.sender) {}

    function recordBalance(
        string memory cropType,
        uint256 nitrogen,
        uint256 phosphorus,
        uint256 potassium
    ) public returns (uint256) {
        uint256 balanceScore = (nitrogen + phosphorus + potassium) / 3;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = NutrientBalance({
            recordId: recordId,
            farmer: msg.sender,
            cropType: cropType,
            nitrogen: nitrogen,
            phosphorus: phosphorus,
            potassium: potassium,
            balanceScore: balanceScore,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit BalanceRecorded(recordId, msg.sender, balanceScore);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (NutrientBalance memory) {
        return records[recordId];
    }
}
