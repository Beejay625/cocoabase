// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmMarketPriceForecasting
 * @dev Price forecasting system
 */
contract FarmMarketPriceForecasting is Ownable {
    struct PriceForecast {
        uint256 forecastId;
        address analyst;
        string commodity;
        uint256 predictedPrice;
        uint256 confidence;
        uint256 timestamp;
    }

    mapping(uint256 => PriceForecast) public forecasts;
    mapping(string => uint256[]) public forecastsByCommodity;
    mapping(address => bool) public isAnalyst;
    uint256 private _forecastIdCounter;

    event ForecastCreated(uint256 indexed forecastId, string commodity);

    constructor() Ownable(msg.sender) {
        isAnalyst[msg.sender] = true;
    }

    function addAnalyst(address analyst) public onlyOwner {
        isAnalyst[analyst] = true;
    }

    function createForecast(
        string memory commodity,
        uint256 predictedPrice,
        uint256 confidence
    ) public returns (uint256) {
        require(isAnalyst[msg.sender], "Not an analyst");
        require(confidence <= 100, "Invalid confidence");
        uint256 forecastId = _forecastIdCounter++;
        forecasts[forecastId] = PriceForecast({
            forecastId: forecastId,
            analyst: msg.sender,
            commodity: commodity,
            predictedPrice: predictedPrice,
            confidence: confidence,
            timestamp: block.timestamp
        });
        forecastsByCommodity[commodity].push(forecastId);
        emit ForecastCreated(forecastId, commodity);
        return forecastId;
    }
}

