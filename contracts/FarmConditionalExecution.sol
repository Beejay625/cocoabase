// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmConditionalExecution
 * @dev Conditional transaction execution system
 */
contract FarmConditionalExecution is Ownable {
    struct Condition {
        uint256 conditionId;
        address targetContract;
        bytes calldataData;
        uint256 threshold;
        string conditionType;
        bool executed;
    }

    mapping(uint256 => Condition) public conditions;
    mapping(uint256 => uint256) public conditionValues;
    mapping(address => bool) public isExecutor;
    uint256 private _conditionIdCounter;

    event ConditionCreated(uint256 indexed conditionId, string conditionType);
    event ConditionMet(uint256 indexed conditionId);
    event ConditionExecuted(uint256 indexed conditionId);
    event ExecutorAdded(address indexed executor);

    constructor() Ownable(msg.sender) {
        isExecutor[msg.sender] = true;
    }

    function addExecutor(address executor) public onlyOwner {
        isExecutor[executor] = true;
        emit ExecutorAdded(executor);
    }

    function createCondition(
        address targetContract,
        bytes memory calldataData,
        uint256 threshold,
        string memory conditionType
    ) public returns (uint256) {
        uint256 conditionId = _conditionIdCounter++;
        conditions[conditionId] = Condition({
            conditionId: conditionId,
            targetContract: targetContract,
            calldataData: calldataData,
            threshold: threshold,
            conditionType: conditionType,
            executed: false
        });
        emit ConditionCreated(conditionId, conditionType);
        return conditionId;
    }

    function updateConditionValue(uint256 conditionId, uint256 value) public {
        require(isExecutor[msg.sender], "Not an executor");
        conditionValues[conditionId] = value;
        
        Condition storage condition = conditions[conditionId];
        if (value >= condition.threshold && !condition.executed) {
            condition.executed = true;
            (bool success, ) = condition.targetContract.call(condition.calldataData);
            require(success, "Execution failed");
            emit ConditionMet(conditionId);
            emit ConditionExecuted(conditionId);
        }
    }
}

