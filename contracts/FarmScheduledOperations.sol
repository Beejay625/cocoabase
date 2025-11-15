// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmScheduledOperations
 * @dev Time-based scheduled operation execution
 */
contract FarmScheduledOperations is Ownable {
    struct ScheduledOp {
        uint256 opId;
        address targetContract;
        bytes calldataData;
        uint256 scheduledTime;
        bool executed;
    }

    mapping(uint256 => ScheduledOp) public scheduledOps;
    mapping(address => bool) public isExecutor;
    uint256 private _opIdCounter;

    event OperationScheduled(
        uint256 indexed opId,
        address indexed targetContract,
        uint256 scheduledTime
    );
    event OperationExecuted(uint256 indexed opId);
    event ExecutorAdded(address indexed executor);

    constructor() Ownable(msg.sender) {
        isExecutor[msg.sender] = true;
    }

    function addExecutor(address executor) public onlyOwner {
        isExecutor[executor] = true;
        emit ExecutorAdded(executor);
    }

    function scheduleOperation(
        address targetContract,
        bytes memory calldataData,
        uint256 scheduledTime
    ) public returns (uint256) {
        require(scheduledTime > block.timestamp, "Invalid time");
        uint256 opId = _opIdCounter++;
        scheduledOps[opId] = ScheduledOp({
            opId: opId,
            targetContract: targetContract,
            calldataData: calldataData,
            scheduledTime: scheduledTime,
            executed: false
        });
        emit OperationScheduled(opId, targetContract, scheduledTime);
        return opId;
    }

    function executeOperation(uint256 opId) public {
        require(isExecutor[msg.sender], "Not an executor");
        ScheduledOp storage op = scheduledOps[opId];
        require(!op.executed, "Already executed");
        require(block.timestamp >= op.scheduledTime, "Not yet scheduled");
        
        op.executed = true;
        (bool success, ) = op.targetContract.call(op.calldataData);
        require(success, "Execution failed");
        emit OperationExecuted(opId);
    }
}

