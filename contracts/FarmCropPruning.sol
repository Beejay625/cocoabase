// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPruning
 * @dev Onchain system for tracking crop pruning activities
 */
contract FarmCropPruning is Ownable {
    struct PruningRecord {
        uint256 recordId;
        uint256 plantationId;
        uint256 treesPruned;
        uint256 pruningDate;
        string pruningType;
        address pruner;
    }

    mapping(uint256 => PruningRecord) public pruningRecords;
    mapping(address => uint256[]) public recordsByPruner;
    uint256 private _recordIdCounter;

    event PruningRecorded(
        uint256 indexed recordId,
        address indexed pruner,
        uint256 treesPruned
    );

    constructor() Ownable(msg.sender) {}

    function recordPruning(
        uint256 plantationId,
        uint256 treesPruned,
        string memory pruningType
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        pruningRecords[recordId] = PruningRecord({
            recordId: recordId,
            plantationId: plantationId,
            treesPruned: treesPruned,
            pruningDate: block.timestamp,
            pruningType: pruningType,
            pruner: msg.sender
        });

        recordsByPruner[msg.sender].push(recordId);

        emit PruningRecorded(recordId, msg.sender, treesPruned);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PruningRecord memory) {
        return pruningRecords[recordId];
    }
}

