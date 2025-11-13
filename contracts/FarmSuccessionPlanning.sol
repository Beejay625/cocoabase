// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSuccessionPlanning
 * @dev Onchain succession planning system
 */
contract FarmSuccessionPlanning is Ownable {
    struct SuccessionPlan {
        uint256 planId;
        address currentOwner;
        address successor;
        uint256 transferDate;
        string planDetails;
        bool approved;
        bool executed;
    }

    mapping(uint256 => SuccessionPlan) public plans;
    mapping(address => uint256[]) public plansByOwner;
    uint256 private _planIdCounter;

    event PlanCreated(
        uint256 indexed planId,
        address indexed currentOwner,
        address indexed successor
    );

    event PlanApproved(uint256 indexed planId);
    event PlanExecuted(uint256 indexed planId);

    constructor() Ownable(msg.sender) {}

    function createSuccessionPlan(
        address successor,
        uint256 transferDate,
        string memory planDetails
    ) public returns (uint256) {
        uint256 planId = _planIdCounter++;
        plans[planId] = SuccessionPlan({
            planId: planId,
            currentOwner: msg.sender,
            successor: successor,
            transferDate: transferDate,
            planDetails: planDetails,
            approved: false,
            executed: false
        });

        plansByOwner[msg.sender].push(planId);

        emit PlanCreated(planId, msg.sender, successor);
        return planId;
    }

    function approvePlan(uint256 planId) public {
        SuccessionPlan storage plan = plans[planId];
        require(plan.successor == msg.sender, "Not the successor");
        require(!plan.approved, "Already approved");

        plan.approved = true;

        emit PlanApproved(planId);
    }

    function executePlan(uint256 planId) public onlyOwner {
        SuccessionPlan storage plan = plans[planId];
        require(plan.approved, "Not approved");
        require(!plan.executed, "Already executed");
        require(block.timestamp >= plan.transferDate, "Transfer date not reached");

        plan.executed = true;

        emit PlanExecuted(planId);
    }

    function getPlan(uint256 planId) public view returns (SuccessionPlan memory) {
        return plans[planId];
    }

    function getPlansByOwner(address owner) public view returns (uint256[] memory) {
        return plansByOwner[owner];
    }
}

