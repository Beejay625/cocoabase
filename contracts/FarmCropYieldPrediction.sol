// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropYieldPrediction
 * @dev Onchain crop yield prediction using historical data
 */
contract FarmCropYieldPrediction is Ownable {
    struct PredictionRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 predictedYield;
        uint256 confidence;
        uint256 predictionDate;
        string factors;
    }

    mapping(uint256 => PredictionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event PredictionRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        uint256 predictedYield
    );

    constructor() Ownable(msg.sender) {}

    function recordPrediction(
        string memory fieldId,
        uint256 predictedYield,
        uint256 confidence,
        string memory factors
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = PredictionRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            predictedYield: predictedYield,
            confidence: confidence,
            predictionDate: block.timestamp,
            factors: factors
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit PredictionRecorded(recordId, msg.sender, fieldId, predictedYield);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PredictionRecord memory) {
        return records[recordId];
    }
}
