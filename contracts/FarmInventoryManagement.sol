// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmInventoryManagement
 * @dev Onchain system for managing farm inventory
 */
contract FarmInventoryManagement is Ownable {
    struct InventoryItem {
        uint256 itemId;
        string itemName;
        string category;
        uint256 quantity;
        uint256 unitPrice;
        address manager;
        uint256 lastUpdated;
    }

    mapping(uint256 => InventoryItem) public inventoryItems;
    mapping(address => uint256[]) public itemsByManager;
    uint256 private _itemIdCounter;

    event InventoryItemAdded(
        uint256 indexed itemId,
        address indexed manager,
        string itemName
    );

    event InventoryUpdated(uint256 indexed itemId, uint256 newQuantity);

    constructor() Ownable(msg.sender) {}

    function addInventoryItem(
        string memory itemName,
        string memory category,
        uint256 quantity,
        uint256 unitPrice
    ) public returns (uint256) {
        uint256 itemId = _itemIdCounter++;
        inventoryItems[itemId] = InventoryItem({
            itemId: itemId,
            itemName: itemName,
            category: category,
            quantity: quantity,
            unitPrice: unitPrice,
            manager: msg.sender,
            lastUpdated: block.timestamp
        });

        itemsByManager[msg.sender].push(itemId);

        emit InventoryItemAdded(itemId, msg.sender, itemName);
        return itemId;
    }

    function updateQuantity(uint256 itemId, uint256 newQuantity) public {
        require(inventoryItems[itemId].manager == msg.sender, "Not the manager");
        inventoryItems[itemId].quantity = newQuantity;
        inventoryItems[itemId].lastUpdated = block.timestamp;
        emit InventoryUpdated(itemId, newQuantity);
    }

    function getItem(uint256 itemId) public view returns (InventoryItem memory) {
        return inventoryItems[itemId];
    }
}



