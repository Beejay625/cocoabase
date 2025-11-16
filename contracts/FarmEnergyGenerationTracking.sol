// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyGenerationTracking
 * @dev Onchain energy generation tracking from renewable sources
 */
contract FarmEnergyGenerationTracking is Ownable {
    struct GenerationRecord {
        uint256 recordId;
        address farmer;
        string generationSource;
        uint256 energyGenerated;
        string unit;
        uint256 recordDate;
        uint256 efficiency;
        string weatherConditions;
    }

    mapping(uint256 => GenerationRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event GenerationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string generationSource,
        uint256 energyGenerated
    );

    constructor() Ownable(msg.sender) {}

    function recordGeneration(
        string memory generationSource,
        uint256 energyGenerated,
        string memory unit,
        uint256 efficiency,
        string memory weatherConditions
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = GenerationRecord({
            recordId: recordId,
            farmer: msg.sender,
            generationSource: generationSource,
            energyGenerated: energyGenerated,
            unit: unit,
            recordDate: block.timestamp,
            efficiency: efficiency,
            weatherConditions: weatherConditions
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit GenerationRecorded(recordId, msg.sender, generationSource, energyGenerated);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (GenerationRecord memory) {
        return records[recordId];
    }
}
