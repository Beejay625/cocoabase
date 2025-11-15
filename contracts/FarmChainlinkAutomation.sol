// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmChainlinkAutomation
 * @dev Chainlink automation integration for onchain triggers
 */
contract FarmChainlinkAutomation is Ownable {
    struct AutomationTask {
        uint256 taskId;
        address targetContract;
        bytes calldataData;
        bytes32 conditionId;
        bool active;
    }

    mapping(uint256 => AutomationTask) public tasks;
    mapping(bytes32 => bool) public conditions;
    mapping(address => bool) public isAutomationOperator;
    uint256 private _taskIdCounter;

    event TaskCreated(uint256 indexed taskId, address indexed targetContract);
    event TaskExecuted(uint256 indexed taskId);
    event ConditionMet(bytes32 indexed conditionId);
    event OperatorAdded(address indexed operator);

    constructor() Ownable(msg.sender) {
        isAutomationOperator[msg.sender] = true;
    }

    function addOperator(address operator) public onlyOwner {
        isAutomationOperator[operator] = true;
        emit OperatorAdded(operator);
    }

    function registerTask(
        address targetContract,
        bytes memory calldataData,
        bytes32 conditionId
    ) public returns (uint256) {
        uint256 taskId = _taskIdCounter++;
        tasks[taskId] = AutomationTask({
            taskId: taskId,
            targetContract: targetContract,
            calldataData: calldataData,
            conditionId: conditionId,
            active: true
        });
        emit TaskCreated(taskId, targetContract);
        return taskId;
    }

    function checkAndExecute(uint256 taskId) public {
        require(isAutomationOperator[msg.sender], "Not an operator");
        AutomationTask storage task = tasks[taskId];
        require(task.active, "Task inactive");
        require(conditions[task.conditionId], "Condition not met");
        
        (bool success, ) = task.targetContract.call(task.calldataData);
        require(success, "Execution failed");
        emit TaskExecuted(taskId);
    }

    function setCondition(bytes32 conditionId, bool met) public onlyOwner {
        conditions[conditionId] = met;
        if (met) {
            emit ConditionMet(conditionId);
        }
    }
}

