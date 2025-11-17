// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWeatherBasedIrrigation
 * @dev Weather-based irrigation decision system
 */
contract FarmWeatherBasedIrrigation is Ownable {
    struct IrrigationDecision {
        uint256 decisionId;
        address farmer;
        string fieldId;
        uint256 rainfallAmount;
        uint256 temperature;
        bool irrigationNeeded;
        uint256 decisionDate;
    }

    mapping(uint256 => IrrigationDecision) public decisions;
    mapping(address => uint256[]) public decisionsByFarmer;
    uint256 private _decisionIdCounter;

    event DecisionMade(
        uint256 indexed decisionId,
        address indexed farmer,
        bool irrigationNeeded
    );

    constructor() Ownable(msg.sender) {}

    function makeDecision(
        string memory fieldId,
        uint256 rainfallAmount,
        uint256 temperature
    ) public returns (uint256) {
        bool irrigationNeeded = rainfallAmount < 10 && temperature > 25;
        uint256 decisionId = _decisionIdCounter++;
        decisions[decisionId] = IrrigationDecision({
            decisionId: decisionId,
            farmer: msg.sender,
            fieldId: fieldId,
            rainfallAmount: rainfallAmount,
            temperature: temperature,
            irrigationNeeded: irrigationNeeded,
            decisionDate: block.timestamp
        });

        decisionsByFarmer[msg.sender].push(decisionId);
        emit DecisionMade(decisionId, msg.sender, irrigationNeeded);
        return decisionId;
    }

    function getDecision(uint256 decisionId) public view returns (IrrigationDecision memory) {
        return decisions[decisionId];
    }
}
