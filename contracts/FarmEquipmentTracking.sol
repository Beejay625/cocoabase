// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentTracking
 * @dev Onchain system for tracking farm equipment usage
 */
contract FarmEquipmentTracking is Ownable {
    struct EquipmentUsage {
        uint256 usageId;
        uint256 equipmentId;
        uint256 plantationId;
        uint256 usageHours;
        uint256 usageDate;
        address operator;
        string purpose;
    }

    mapping(uint256 => EquipmentUsage) public equipmentUsage;
    mapping(address => uint256[]) public usageByOperator;
    uint256 private _usageIdCounter;

    event EquipmentUsed(
        uint256 indexed usageId,
        address indexed operator,
        uint256 equipmentId
    );

    constructor() Ownable(msg.sender) {}

    function recordUsage(
        uint256 equipmentId,
        uint256 plantationId,
        uint256 usageHours,
        string memory purpose
    ) public returns (uint256) {
        uint256 usageId = _usageIdCounter++;
        equipmentUsage[usageId] = EquipmentUsage({
            usageId: usageId,
            equipmentId: equipmentId,
            plantationId: plantationId,
            usageHours: usageHours,
            usageDate: block.timestamp,
            operator: msg.sender,
            purpose: purpose
        });

        usageByOperator[msg.sender].push(usageId);

        emit EquipmentUsed(usageId, msg.sender, equipmentId);
        return usageId;
    }

    function getUsage(uint256 usageId) public view returns (EquipmentUsage memory) {
        return equipmentUsage[usageId];
    }
}



