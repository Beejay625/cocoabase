// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropMaturityIndex
 * @dev Crop maturity index tracking and harvest readiness
 */
contract FarmCropMaturityIndex is Ownable {
    struct MaturityIndex {
        uint256 indexId;
        address farmer;
        string fieldId;
        uint256 maturityScore;
        uint256 indexDate;
        bool harvestReady;
    }

    mapping(uint256 => MaturityIndex) public indices;
    uint256 private _indexIdCounter;

    event IndexCreated(
        uint256 indexed indexId,
        address indexed farmer,
        uint256 maturityScore
    );

    constructor() Ownable(msg.sender) {}

    function createIndex(
        string memory fieldId,
        uint256 maturityScore
    ) public returns (uint256) {
        bool harvestReady = maturityScore >= 85;
        uint256 indexId = _indexIdCounter++;
        indices[indexId] = MaturityIndex({
            indexId: indexId,
            farmer: msg.sender,
            fieldId: fieldId,
            maturityScore: maturityScore,
            indexDate: block.timestamp,
            harvestReady: harvestReady
        });

        emit IndexCreated(indexId, msg.sender, maturityScore);
        return indexId;
    }

    function getIndex(uint256 indexId) public view returns (MaturityIndex memory) {
        return indices[indexId];
    }
}
