// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestLogistics
 * @dev Harvest logistics and transportation coordination
 */
contract FarmCropHarvestLogistics is Ownable {
    struct LogisticsOrder {
        uint256 orderId;
        address farmer;
        string productId;
        string destination;
        uint256 harvestDate;
        uint256 deliveryDate;
        bool delivered;
    }

    mapping(uint256 => LogisticsOrder) public orders;
    mapping(address => uint256[]) public ordersByFarmer;
    uint256 private _orderIdCounter;

    event OrderCreated(
        uint256 indexed orderId,
        address indexed farmer,
        string destination
    );

    event DeliveryConfirmed(
        uint256 indexed orderId,
        uint256 deliveryDate
    );

    constructor() Ownable(msg.sender) {}

    function createOrder(
        string memory productId,
        string memory destination,
        uint256 harvestDate,
        uint256 deliveryDate
    ) public returns (uint256) {
        uint256 orderId = _orderIdCounter++;
        orders[orderId] = LogisticsOrder({
            orderId: orderId,
            farmer: msg.sender,
            productId: productId,
            destination: destination,
            harvestDate: harvestDate,
            deliveryDate: deliveryDate,
            delivered: false
        });

        ordersByFarmer[msg.sender].push(orderId);
        emit OrderCreated(orderId, msg.sender, destination);
        return orderId;
    }

    function confirmDelivery(uint256 orderId) public {
        require(orders[orderId].farmer == msg.sender, "Not authorized");
        orders[orderId].delivered = true;
        emit DeliveryConfirmed(orderId, block.timestamp);
    }

    function getOrder(uint256 orderId) public view returns (LogisticsOrder memory) {
        return orders[orderId];
    }
}