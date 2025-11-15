// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropWeatherImpact
 * @dev Onchain weather impact assessment on crops
 */
contract FarmCropWeatherImpact is Ownable {
    struct WeatherImpact {
        uint256 impactId;
        address farmer;
        string fieldId;
        string weatherEvent;
        uint256 impactDate;
        uint256 severity;
        string cropDamage;
        uint256 estimatedLoss;
    }

    mapping(uint256 => WeatherImpact) public impacts;
    mapping(address => uint256[]) public impactsByFarmer;
    uint256 private _impactIdCounter;

    event ImpactRecorded(
        uint256 indexed impactId,
        address indexed farmer,
        string weatherEvent,
        uint256 severity
    );

    constructor() Ownable(msg.sender) {}

    function recordImpact(
        string memory fieldId,
        string memory weatherEvent,
        uint256 impactDate,
        uint256 severity,
        string memory cropDamage,
        uint256 estimatedLoss
    ) public returns (uint256) {
        uint256 impactId = _impactIdCounter++;
        impacts[impactId] = WeatherImpact({
            impactId: impactId,
            farmer: msg.sender,
            fieldId: fieldId,
            weatherEvent: weatherEvent,
            impactDate: impactDate,
            severity: severity,
            cropDamage: cropDamage,
            estimatedLoss: estimatedLoss
        });

        impactsByFarmer[msg.sender].push(impactId);
        emit ImpactRecorded(impactId, msg.sender, weatherEvent, severity);
        return impactId;
    }

    function getImpact(uint256 impactId) public view returns (WeatherImpact memory) {
        return impacts[impactId];
    }
}

