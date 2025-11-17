// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterResourceAllocation
 * @dev Water resource allocation and distribution system
 */
contract FarmWaterResourceAllocation is Ownable {
    struct Allocation {
        uint256 allocationId;
        address farmer;
        string fieldId;
        uint256 allocatedAmount;
        uint256 usedAmount;
        uint256 allocationDate;
    }

    mapping(uint256 => Allocation) public allocations;
    mapping(address => uint256[]) public allocationsByFarmer;
    uint256 private _allocationIdCounter;

    event AllocationCreated(
        uint256 indexed allocationId,
        address indexed farmer,
        uint256 allocatedAmount
    );

    event WaterUsed(
        uint256 indexed allocationId,
        uint256 usedAmount
    );

    constructor() Ownable(msg.sender) {}

    function createAllocation(
        string memory fieldId,
        uint256 allocatedAmount
    ) public returns (uint256) {
        uint256 allocationId = _allocationIdCounter++;
        allocations[allocationId] = Allocation({
            allocationId: allocationId,
            farmer: msg.sender,
            fieldId: fieldId,
            allocatedAmount: allocatedAmount,
            usedAmount: 0,
            allocationDate: block.timestamp
        });

        allocationsByFarmer[msg.sender].push(allocationId);
        emit AllocationCreated(allocationId, msg.sender, allocatedAmount);
        return allocationId;
    }

    function recordUsage(uint256 allocationId, uint256 usedAmount) public {
        require(allocations[allocationId].farmer == msg.sender, "Not authorized");
        require(allocations[allocationId].usedAmount + usedAmount <= allocations[allocationId].allocatedAmount, "Exceeds allocation");
        allocations[allocationId].usedAmount += usedAmount;
        emit WaterUsed(allocationId, usedAmount);
    }

    function getAllocation(uint256 allocationId) public view returns (Allocation memory) {
        return allocations[allocationId];
    }
}
