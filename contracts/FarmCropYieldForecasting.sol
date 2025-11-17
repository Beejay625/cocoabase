// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropYieldForecasting
 * @dev Advanced crop yield forecasting system
 */
contract FarmCropYieldForecasting is Ownable {
    struct Forecast {
        uint256 forecastId;
        address farmer;
        uint256 fieldId;
        uint256 predictedYield;
        uint256 confidence;
        uint256 forecastDate;
    }

    mapping(uint256 => Forecast) public forecasts;
    mapping(address => uint256[]) public forecastsByFarmer;
    uint256 private _forecastIdCounter;

    event ForecastCreated(uint256 indexed forecastId, uint256 predictedYield);

    constructor() Ownable(msg.sender) {}

    function createForecast(
        uint256 fieldId,
        uint256 predictedYield,
        uint256 confidence
    ) public returns (uint256) {
        require(confidence <= 100, "Invalid confidence");
        uint256 forecastId = _forecastIdCounter++;
        forecasts[forecastId] = Forecast({
            forecastId: forecastId,
            farmer: msg.sender,
            fieldId: fieldId,
            predictedYield: predictedYield,
            confidence: confidence,
            forecastDate: block.timestamp
        });
        forecastsByFarmer[msg.sender].push(forecastId);
        emit ForecastCreated(forecastId, predictedYield);
        return forecastId;
    }
}

