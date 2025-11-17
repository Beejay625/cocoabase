// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedInventory
 * @dev Feed inventory management and tracking
 */
contract FarmLivestockFeedInventory is Ownable {
    struct InventoryItem {
        uint256 itemId;
        address farmer;
        string feedType;
        uint256 quantity;
        uint256 purchaseDate;
        uint256 expiryDate;
    }

    mapping(uint256 => InventoryItem) public inventory;
    uint256 private _itemIdCounter;

    event ItemAdded(
        uint256 indexed itemId,
        address indexed farmer,
        string feedType
    );

    constructor() Ownable(msg.sender) {}

    function addItem(
        string memory feedType,
        uint256 quantity,
        uint256 expiryDate
    ) public returns (uint256) {
        uint256 itemId = _itemIdCounter++;
        inventory[itemId] = InventoryItem({
            itemId: itemId,
            farmer: msg.sender,
            feedType: feedType,
            quantity: quantity,
            purchaseDate: block.timestamp,
            expiryDate: expiryDate
        });

        emit ItemAdded(itemId, msg.sender, feedType);
        return itemId;
    }

    function updateQuantity(uint256 itemId, uint256 newQuantity) public {
        require(inventory[itemId].farmer == msg.sender, "Not authorized");
        inventory[itemId].quantity = newQuantity;
    }

    function getItem(uint256 itemId) public view returns (InventoryItem memory) {
        return inventory[itemId];
    }
}