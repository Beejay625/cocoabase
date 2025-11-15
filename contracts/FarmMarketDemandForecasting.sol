// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmMarketDemandForecasting
 * @dev Market demand prediction and forecasting system
 */
contract FarmMarketDemandForecasting is Ownable {
    struct DemandForecast {
        uint256 forecastId;
        string cropType;
        uint256 predictedDemand;
        uint256 forecastDate;
        uint256 targetDate;
        uint256 confidenceLevel;
        string marketRegion;
    }

    mapping(uint256 => DemandForecast) public forecasts;
    mapping(string => uint256[]) public forecastsByCrop;
    uint256 private _forecastIdCounter;

    event ForecastCreated(
        uint256 indexed forecastId,
        string cropType,
        uint256 predictedDemand
    );

    constructor() Ownable(msg.sender) {}

    function createForecast(
        string memory cropType,
        uint256 predictedDemand,
        uint256 targetDate,
        uint256 confidenceLevel,
        string memory marketRegion
    ) public returns (uint256) {
        uint256 forecastId = _forecastIdCounter++;
        forecasts[forecastId] = DemandForecast({
            forecastId: forecastId,
            cropType: cropType,
            predictedDemand: predictedDemand,
            forecastDate: block.timestamp,
            targetDate: targetDate,
            confidenceLevel: confidenceLevel,
            marketRegion: marketRegion
        });

        forecastsByCrop[cropType].push(forecastId);
        emit ForecastCreated(forecastId, cropType, predictedDemand);
        return forecastId;
    }

    function getForecast(uint256 forecastId) public view returns (DemandForecast memory) {
        return forecasts[forecastId];
    }
}
