// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropMaturity
 * @dev Onchain system for tracking crop maturity stages
 */
contract FarmCropMaturity is Ownable {
    struct MaturityRecord {
        uint256 recordId;
        uint256 plantationId;
        string maturityStage;
        uint256 maturityDate;
        address recorder;
        bool harvestReady;
    }

    mapping(uint256 => MaturityRecord) public maturityRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event MaturityRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        string maturityStage
    );

    constructor() Ownable(msg.sender) {}

    function recordMaturity(
        uint256 plantationId,
        string memory maturityStage,
        bool harvestReady
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        maturityRecords[recordId] = MaturityRecord({
            recordId: recordId,
            plantationId: plantationId,
            maturityStage: maturityStage,
            maturityDate: block.timestamp,
            recorder: msg.sender,
            harvestReady: harvestReady
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit MaturityRecorded(recordId, msg.sender, maturityStage);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MaturityRecord memory) {
        return maturityRecords[recordId];
    }
}



