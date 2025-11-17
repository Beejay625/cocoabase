// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestPrediction
 * @dev Harvest prediction and timing optimization
 */
contract FarmCropHarvestPrediction is Ownable {
    struct Prediction {
        uint256 predictionId;
        address farmer;
        string fieldId;
        uint256 predictedYield;
        uint256 predictedHarvestDate;
        uint256 confidenceScore;
        uint256 predictionDate;
    }

    mapping(uint256 => Prediction) public predictions;
    mapping(address => uint256[]) public predictionsByFarmer;
    uint256 private _predictionIdCounter;

    event PredictionCreated(
        uint256 indexed predictionId,
        address indexed farmer,
        uint256 predictedYield
    );

    constructor() Ownable(msg.sender) {}

    function createPrediction(
        string memory fieldId,
        uint256 predictedYield,
        uint256 predictedHarvestDate,
        uint256 confidenceScore
    ) public returns (uint256) {
        uint256 predictionId = _predictionIdCounter++;
        predictions[predictionId] = Prediction({
            predictionId: predictionId,
            farmer: msg.sender,
            fieldId: fieldId,
            predictedYield: predictedYield,
            predictedHarvestDate: predictedHarvestDate,
            confidenceScore: confidenceScore,
            predictionDate: block.timestamp
        });

        predictionsByFarmer[msg.sender].push(predictionId);
        emit PredictionCreated(predictionId, msg.sender, predictedYield);
        return predictionId;
    }

    function getPrediction(uint256 predictionId) public view returns (Prediction memory) {
        return predictions[predictionId];
    }
}
