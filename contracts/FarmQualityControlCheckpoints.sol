// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmQualityControlCheckpoints
 * @dev Quality control checkpoints system
 */
contract FarmQualityControlCheckpoints is Ownable {
    struct Checkpoint {
        uint256 checkpointId;
        address inspector;
        uint256 productId;
        string checkpointType;
        bool passed;
        string notes;
        uint256 timestamp;
    }

    mapping(uint256 => Checkpoint) public checkpoints;
    mapping(uint256 => uint256[]) public checkpointsByProduct;
    mapping(address => uint256[]) public checkpointsByInspector;
    mapping(address => bool) public isInspector;
    uint256 private _checkpointIdCounter;

    event CheckpointCreated(uint256 indexed checkpointId, uint256 productId);
    event CheckpointPassed(uint256 indexed checkpointId);
    event InspectorAdded(address indexed inspector);

    constructor() Ownable(msg.sender) {
        isInspector[msg.sender] = true;
    }

    function addInspector(address inspector) public onlyOwner {
        isInspector[inspector] = true;
        emit InspectorAdded(inspector);
    }

    function createCheckpoint(
        uint256 productId,
        string memory checkpointType,
        string memory notes
    ) public returns (uint256) {
        require(isInspector[msg.sender], "Not an inspector");
        uint256 checkpointId = _checkpointIdCounter++;
        checkpoints[checkpointId] = Checkpoint({
            checkpointId: checkpointId,
            inspector: msg.sender,
            productId: productId,
            checkpointType: checkpointType,
            passed: false,
            notes: notes,
            timestamp: block.timestamp
        });
        checkpointsByProduct[productId].push(checkpointId);
        checkpointsByInspector[msg.sender].push(checkpointId);
        emit CheckpointCreated(checkpointId, productId);
        return checkpointId;
    }

    function markPassed(uint256 checkpointId) public {
        require(checkpoints[checkpointId].inspector == msg.sender, "Not the inspector");
        checkpoints[checkpointId].passed = true;
        emit CheckpointPassed(checkpointId);
    }
}

