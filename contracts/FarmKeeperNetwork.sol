// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmKeeperNetwork
 * @dev Automated keeper network for contract maintenance
 */
contract FarmKeeperNetwork is Ownable {
    struct Task {
        uint256 taskId;
        address targetContract;
        bytes calldataData;
        uint256 interval;
        uint256 lastExecution;
        bool active;
    }

    mapping(uint256 => Task) public tasks;
    mapping(address => bool) public isKeeper;
    uint256 private _taskIdCounter;

    event TaskCreated(uint256 indexed taskId, address indexed targetContract);
    event TaskExecuted(uint256 indexed taskId, bool success);
    event KeeperAdded(address indexed keeper);
    event KeeperRemoved(address indexed keeper);

    constructor() Ownable(msg.sender) {
        isKeeper[msg.sender] = true;
    }

    function addKeeper(address keeper) public onlyOwner {
        isKeeper[keeper] = true;
        emit KeeperAdded(keeper);
    }

    function registerTask(
        address targetContract,
        bytes memory calldataData,
        uint256 interval
    ) public returns (uint256) {
        uint256 taskId = _taskIdCounter++;
        tasks[taskId] = Task({
            taskId: taskId,
            targetContract: targetContract,
            calldataData: calldataData,
            interval: interval,
            lastExecution: 0,
            active: true
        });
        emit TaskCreated(taskId, targetContract);
        return taskId;
    }

    function executeTask(uint256 taskId) public {
        require(isKeeper[msg.sender], "Not a keeper");
        Task storage task = tasks[taskId];
        require(task.active, "Task inactive");
        require(
            block.timestamp >= task.lastExecution + task.interval,
            "Not ready"
        );
        
        task.lastExecution = block.timestamp;
        (bool success, ) = task.targetContract.call(task.calldataData);
        emit TaskExecuted(taskId, success);
    }
}

