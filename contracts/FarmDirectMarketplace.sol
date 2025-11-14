// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmDirectMarketplace
 * @dev Onchain direct farmer-to-buyer marketplace
 */
contract FarmDirectMarketplace is Ownable {
    struct Listing {
        uint256 listingId;
        address seller;
        string productName;
        string productDescription;
        uint256 quantity;
        uint256 pricePerUnit;
        uint256 totalPrice;
        bool isActive;
        uint256 listingDate;
        string category;
    }

    struct Order {
        uint256 orderId;
        uint256 listingId;
        address buyer;
        address seller;
        uint256 quantity;
        uint256 totalPrice;
        uint256 orderDate;
        bool isCompleted;
        bool isCancelled;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Order) public orders;
    mapping(address => uint256[]) public listingsBySeller;
    mapping(address => uint256[]) public ordersByBuyer;
    uint256 private _listingIdCounter;
    uint256 private _orderIdCounter;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed seller,
        string productName,
        uint256 pricePerUnit,
        uint256 quantity
    );

    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed listingId,
        address indexed buyer,
        address seller,
        uint256 quantity,
        uint256 totalPrice
    );

    event OrderCompleted(
        uint256 indexed orderId,
        address indexed buyer,
        address seller
    );

    constructor() Ownable(msg.sender) {}

    function createListing(
        string memory productName,
        string memory productDescription,
        uint256 quantity,
        uint256 pricePerUnit,
        string memory category
    ) public returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        require(pricePerUnit > 0, "Price must be greater than 0");

        uint256 listingId = _listingIdCounter++;
        uint256 totalPrice = quantity * pricePerUnit;

        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            productName: productName,
            productDescription: productDescription,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            totalPrice: totalPrice,
            isActive: true,
            listingDate: block.timestamp,
            category: category
        });

        listingsBySeller[msg.sender].push(listingId);

        emit ListingCreated(listingId, msg.sender, productName, pricePerUnit, quantity);
        return listingId;
    }

    function placeOrder(uint256 listingId, uint256 quantity) public payable returns (uint256) {
        require(listings[listingId].isActive, "Listing not active");
        require(listings[listingId].seller != msg.sender, "Cannot buy your own listing");
        require(listings[listingId].quantity >= quantity, "Insufficient quantity");
        require(quantity > 0, "Quantity must be greater than 0");

        uint256 totalPrice = quantity * listings[listingId].pricePerUnit;
        require(msg.value >= totalPrice, "Insufficient payment");

        uint256 orderId = _orderIdCounter++;
        orders[orderId] = Order({
            orderId: orderId,
            listingId: listingId,
            buyer: msg.sender,
            seller: listings[listingId].seller,
            quantity: quantity,
            totalPrice: totalPrice,
            orderDate: block.timestamp,
            isCompleted: false,
            isCancelled: false
        });

        listings[listingId].quantity -= quantity;
        if (listings[listingId].quantity == 0) {
            listings[listingId].isActive = false;
        }

        ordersByBuyer[msg.sender].push(orderId);

        payable(listings[listingId].seller).transfer(totalPrice);

        emit OrderPlaced(orderId, listingId, msg.sender, listings[listingId].seller, quantity, totalPrice);
        return orderId;
    }

    function completeOrder(uint256 orderId) public {
        require(orders[orderId].seller == msg.sender, "Not the seller");
        require(!orders[orderId].isCompleted, "Order already completed");
        require(!orders[orderId].isCancelled, "Order is cancelled");

        orders[orderId].isCompleted = true;

        emit OrderCompleted(orderId, orders[orderId].buyer, msg.sender);
    }

    function cancelListing(uint256 listingId) public {
        require(listings[listingId].seller == msg.sender, "Not the seller");
        require(listings[listingId].isActive, "Listing not active");

        listings[listingId].isActive = false;
    }

    function getListing(uint256 listingId) public view returns (Listing memory) {
        return listings[listingId];
    }

    function getOrder(uint256 orderId) public view returns (Order memory) {
        return orders[orderId];
    }

    function getListingsBySeller(address seller) public view returns (uint256[] memory) {
        return listingsBySeller[seller];
    }

    function getOrdersByBuyer(address buyer) public view returns (uint256[] memory) {
        return ordersByBuyer[buyer];
    }
}

