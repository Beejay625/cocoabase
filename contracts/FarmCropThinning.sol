// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropThinning
 * @dev Onchain system for tracking crop thinning activities
 */
contract FarmCropThinning is Ownable {
    struct ThinningRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 plantsThinned;
        uint256 thinningDate;
        address thinner;
        string reason;
    }

    mapping(uint256 => ThinningRecord) public thinningRecords;
    mapping(address => uint256[]) public recordsByThinner;
    uint256 private _recordIdCounter;

    event ThinningRecorded(
        uint256 indexed recordId,
        address indexed thinner,
        uint256 plantsThinned
    );

    constructor() Ownable(msg.sender) {}

    function recordThinning(
        uint256 plantationId,
        uint256 plantsThinned,
        string memory reason
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        thinningRecords[recordId] = ThinningRecord({
            recordId: recordId,
            plantationId: plantationId,
            plantsThinned: plantsThinned,
            thinningDate: block.timestamp,
            thinner: msg.sender,
            reason: reason
        });

        recordsByThinner[msg.sender].push(recordId);

        emit ThinningRecorded(recordId, msg.sender, plantsThinned);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ThinningRecord memory) {
        return thinningRecords[recordId];
    }
}

