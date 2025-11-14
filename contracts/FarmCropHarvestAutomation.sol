// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestAutomation
 * @dev Automated harvest scheduling and execution tracking
 */
contract FarmCropHarvestAutomation is Ownable {
    struct AutomationRule {
        uint256 ruleId;
        uint256 plantationId;
        string cropType;
        uint256 maturityThreshold;
        uint256 harvestWindow;
        bool enabled;
        address owner;
        uint256 createdAt;
    }

    struct HarvestExecution {
        uint256 executionId;
        uint256 ruleId;
        uint256 plantationId;
        uint256 executedAt;
        uint256 yieldAmount;
        address executor;
        bool completed;
    }

    mapping(uint256 => AutomationRule) public automationRules;
    mapping(uint256 => HarvestExecution) public harvestExecutions;
    mapping(address => uint256[]) public rulesByOwner;
    uint256 private _ruleIdCounter;
    uint256 private _executionIdCounter;

    event AutomationRuleCreated(
        uint256 indexed ruleId,
        address indexed owner,
        uint256 plantationId
    );

    event HarvestExecuted(
        uint256 indexed executionId,
        uint256 indexed ruleId,
        uint256 yieldAmount
    );

    constructor() Ownable(msg.sender) {}

    function createAutomationRule(
        uint256 plantationId,
        string memory cropType,
        uint256 maturityThreshold,
        uint256 harvestWindow
    ) public returns (uint256) {
        uint256 ruleId = _ruleIdCounter++;
        automationRules[ruleId] = AutomationRule({
            ruleId: ruleId,
            plantationId: plantationId,
            cropType: cropType,
            maturityThreshold: maturityThreshold,
            harvestWindow: harvestWindow,
            enabled: true,
            owner: msg.sender,
            createdAt: block.timestamp
        });

        rulesByOwner[msg.sender].push(ruleId);

        emit AutomationRuleCreated(ruleId, msg.sender, plantationId);
        return ruleId;
    }

    function executeHarvest(
        uint256 ruleId,
        uint256 yieldAmount
    ) public returns (uint256) {
        require(automationRules[ruleId].enabled, "Rule not enabled");
        
        uint256 executionId = _executionIdCounter++;
        harvestExecutions[executionId] = HarvestExecution({
            executionId: executionId,
            ruleId: ruleId,
            plantationId: automationRules[ruleId].plantationId,
            executedAt: block.timestamp,
            yieldAmount: yieldAmount,
            executor: msg.sender,
            completed: true
        });

        emit HarvestExecuted(executionId, ruleId, yieldAmount);
        return executionId;
    }

    function toggleRule(uint256 ruleId, bool enabled) public {
        require(automationRules[ruleId].owner == msg.sender, "Not owner");
        automationRules[ruleId].enabled = enabled;
    }

    function getAutomationRule(uint256 ruleId) public view returns (AutomationRule memory) {
        return automationRules[ruleId];
    }

    function getRulesByOwner(address owner) public view returns (uint256[] memory) {
        return rulesByOwner[owner];
    }
}

