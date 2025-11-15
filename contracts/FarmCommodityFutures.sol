// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCommodityFutures
 * @dev Commodity futures contract execution
 */
contract FarmCommodityFutures is Ownable {
    struct FuturesContract {
        uint256 contractId;
        address farmer;
        address buyer;
        string commodity;
        uint256 quantity;
        uint256 price;
        uint256 deliveryDate;
        bool delivered;
    }

    mapping(uint256 => FuturesContract) public futures;
    mapping(address => uint256[]) public contractsByFarmer;
    mapping(address => uint256[]) public contractsByBuyer;
    uint256 private _contractIdCounter;

    event FuturesCreated(
        uint256 indexed contractId,
        address indexed farmer,
        address indexed buyer
    );
    event DeliveryConfirmed(uint256 indexed contractId, uint256 actualQuantity);

    constructor() Ownable(msg.sender) {}

    function createFutures(
        address buyer,
        string memory commodity,
        uint256 quantity,
        uint256 price,
        uint256 deliveryDate
    ) public returns (uint256) {
        require(quantity > 0, "Invalid quantity");
        require(price > 0, "Invalid price");
        require(deliveryDate > block.timestamp, "Invalid delivery date");
        
        uint256 contractId = _contractIdCounter++;
        futures[contractId] = FuturesContract({
            contractId: contractId,
            farmer: msg.sender,
            buyer: buyer,
            commodity: commodity,
            quantity: quantity,
            price: price,
            deliveryDate: deliveryDate,
            delivered: false
        });
        contractsByFarmer[msg.sender].push(contractId);
        contractsByBuyer[buyer].push(contractId);
        emit FuturesCreated(contractId, msg.sender, buyer);
        return contractId;
    }

    function confirmDelivery(uint256 contractId, uint256 actualQuantity) public payable {
        FuturesContract storage contract_ = futures[contractId];
        require(contract_.buyer == msg.sender, "Not the buyer");
        require(!contract_.delivered, "Already delivered");
        require(block.timestamp >= contract_.deliveryDate, "Delivery not due");
        
        uint256 totalPrice = contract_.price * actualQuantity;
        require(msg.value >= totalPrice, "Insufficient payment");
        
        contract_.delivered = true;
        payable(contract_.farmer).transfer(totalPrice);
        emit DeliveryConfirmed(contractId, actualQuantity);
    }
}

