// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestForecasting
 * @dev Forecast harvest dates and yields
 */
contract FarmCropHarvestForecasting is Ownable {
    struct HarvestForecast {
        uint256 forecastId;
        uint256 plantationId;
        string cropType;
        uint256 predictedHarvestDate;
        uint256 predictedYield;
        uint256 confidenceLevel;
        uint256 forecastDate;
        address forecaster;
    }

    struct ForecastAccuracy {
        uint256 forecastId;
        uint256 actualHarvestDate;
        uint256 actualYield;
        uint256 dateAccuracy;
        uint256 yieldAccuracy;
        address validator;
    }

    mapping(uint256 => HarvestForecast) public harvestForecasts;
    mapping(uint256 => ForecastAccuracy) public forecastAccuracies;
    mapping(address => uint256[]) public forecastsByOwner;
    uint256 private _forecastIdCounter;

    event HarvestForecasted(
        uint256 indexed forecastId,
        address indexed owner,
        uint256 plantationId,
        uint256 predictedYield
    );

    event ForecastValidated(
        uint256 indexed forecastId,
        uint256 yieldAccuracy
    );

    constructor() Ownable(msg.sender) {}

    function createHarvestForecast(
        uint256 plantationId,
        string memory cropType,
        uint256 predictedHarvestDate,
        uint256 predictedYield,
        uint256 confidenceLevel
    ) public returns (uint256) {
        uint256 forecastId = _forecastIdCounter++;
        harvestForecasts[forecastId] = HarvestForecast({
            forecastId: forecastId,
            plantationId: plantationId,
            cropType: cropType,
            predictedHarvestDate: predictedHarvestDate,
            predictedYield: predictedYield,
            confidenceLevel: confidenceLevel,
            forecastDate: block.timestamp,
            forecaster: msg.sender
        });

        forecastsByOwner[msg.sender].push(forecastId);

        emit HarvestForecasted(forecastId, msg.sender, plantationId, predictedYield);
        return forecastId;
    }

    function validateForecast(
        uint256 forecastId,
        uint256 actualHarvestDate,
        uint256 actualYield
    ) public {
        require(harvestForecasts[forecastId].forecaster == msg.sender, "Not forecaster");
        
        HarvestForecast memory forecast = harvestForecasts[forecastId];
        uint256 dateDiff = actualHarvestDate > forecast.predictedHarvestDate 
            ? actualHarvestDate - forecast.predictedHarvestDate 
            : forecast.predictedHarvestDate - actualHarvestDate;
        uint256 dateAccuracy = dateDiff < 7 days ? 100 : (dateDiff < 14 days ? 80 : 60);
        
        uint256 yieldDiff = actualYield > forecast.predictedYield
            ? actualYield - forecast.predictedYield
            : forecast.predictedYield - actualYield;
        uint256 yieldAccuracy = yieldDiff < (forecast.predictedYield / 10) ? 100 : 
            (yieldDiff < (forecast.predictedYield / 5) ? 80 : 60);

        forecastAccuracies[forecastId] = ForecastAccuracy({
            forecastId: forecastId,
            actualHarvestDate: actualHarvestDate,
            actualYield: actualYield,
            dateAccuracy: dateAccuracy,
            yieldAccuracy: yieldAccuracy,
            validator: msg.sender
        });

        emit ForecastValidated(forecastId, yieldAccuracy);
    }

    function getHarvestForecast(uint256 forecastId) public view returns (HarvestForecast memory) {
        return harvestForecasts[forecastId];
    }

    function getForecastsByOwner(address owner) public view returns (uint256[] memory) {
        return forecastsByOwner[owner];
    }
}


