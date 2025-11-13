// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFinancialPlanning
 * @dev Onchain financial planning and budgeting
 */
contract FarmFinancialPlanning is Ownable {
    struct FinancialPlan {
        uint256 planId;
        address owner;
        uint256 totalBudget;
        uint256 allocatedBudget;
        uint256 startDate;
        uint256 endDate;
        string planType;
        bool active;
    }

    struct BudgetItem {
        uint256 itemId;
        uint256 planId;
        string category;
        uint256 allocated;
        uint256 spent;
    }

    mapping(uint256 => FinancialPlan) public plans;
    mapping(uint256 => BudgetItem[]) public planItems;
    mapping(address => uint256[]) public plansByOwner;
    uint256 private _planIdCounter;
    uint256 private _itemIdCounter;

    event PlanCreated(
        uint256 indexed planId,
        address indexed owner,
        uint256 totalBudget
    );

    event BudgetItemAdded(
        uint256 indexed planId,
        uint256 indexed itemId,
        string category,
        uint256 allocated
    );

    constructor() Ownable(msg.sender) {}

    function createPlan(
        uint256 totalBudget,
        uint256 startDate,
        uint256 endDate,
        string memory planType
    ) public returns (uint256) {
        uint256 planId = _planIdCounter++;
        plans[planId] = FinancialPlan({
            planId: planId,
            owner: msg.sender,
            totalBudget: totalBudget,
            allocatedBudget: 0,
            startDate: startDate,
            endDate: endDate,
            planType: planType,
            active: true
        });

        plansByOwner[msg.sender].push(planId);

        emit PlanCreated(planId, msg.sender, totalBudget);
        return planId;
    }

    function addBudgetItem(
        uint256 planId,
        string memory category,
        uint256 allocated
    ) public returns (uint256) {
        require(plans[planId].owner == msg.sender, "Not the owner");
        require(plans[planId].active, "Plan not active");
        require(plans[planId].allocatedBudget + allocated <= plans[planId].totalBudget, "Exceeds budget");

        uint256 itemId = _itemIdCounter++;
        planItems[planId].push(BudgetItem({
            itemId: itemId,
            planId: planId,
            category: category,
            allocated: allocated,
            spent: 0
        }));

        plans[planId].allocatedBudget += allocated;

        emit BudgetItemAdded(planId, itemId, category, allocated);
        return itemId;
    }

    function getPlan(uint256 planId) public view returns (FinancialPlan memory) {
        return plans[planId];
    }

    function getPlanItems(uint256 planId) public view returns (BudgetItem[] memory) {
        return planItems[planId];
    }
}

