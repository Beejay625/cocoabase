// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainPaymentsEscrow
 * @dev Escrow system for supply chain payments with quality verification
 */
contract FarmSupplyChainPaymentsEscrow is Ownable {
    struct EscrowPayment {
        uint256 paymentId;
        address buyer;
        address seller;
        uint256 amount;
        bool qualityApproved;
        bool released;
        uint256 releaseDate;
    }

    mapping(uint256 => EscrowPayment) public payments;
    mapping(address => uint256[]) public paymentsByBuyer;
    uint256 private _paymentIdCounter;

    event PaymentEscrowed(
        uint256 indexed paymentId,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event PaymentReleased(
        uint256 indexed paymentId,
        address indexed seller,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function createEscrow(address seller) public payable returns (uint256) {
        require(msg.value > 0, "Amount required");
        uint256 paymentId = _paymentIdCounter++;
        payments[paymentId] = EscrowPayment({
            paymentId: paymentId,
            buyer: msg.sender,
            seller: seller,
            amount: msg.value,
            qualityApproved: false,
            released: false,
            releaseDate: 0
        });

        paymentsByBuyer[msg.sender].push(paymentId);
        emit PaymentEscrowed(paymentId, msg.sender, seller, msg.value);
        return paymentId;
    }

    function approveQuality(uint256 paymentId) public onlyOwner {
        payments[paymentId].qualityApproved = true;
    }

    function releasePayment(uint256 paymentId) public {
        require(payments[paymentId].buyer == msg.sender || msg.sender == owner(), "Not authorized");
        require(payments[paymentId].qualityApproved, "Quality not approved");
        require(!payments[paymentId].released, "Already released");
        payments[paymentId].released = true;
        payments[paymentId].releaseDate = block.timestamp;
        payable(payments[paymentId].seller).transfer(payments[paymentId].amount);
        emit PaymentReleased(paymentId, payments[paymentId].seller, payments[paymentId].amount);
    }

    function getPayment(uint256 paymentId) public view returns (EscrowPayment memory) {
        return payments[paymentId];
    }
}
