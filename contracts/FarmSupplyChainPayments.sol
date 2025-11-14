// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainPayments
 * @dev Onchain payment system for supply chain transactions
 */
contract FarmSupplyChainPayments is Ownable {
    struct Payment {
        uint256 paymentId;
        address payer;
        address payee;
        uint256 amount;
        string invoiceId;
        uint256 dueDate;
        bool paid;
        uint256 paidDate;
    }

    mapping(uint256 => Payment) public payments;
    mapping(address => uint256[]) public paymentsByPayer;
    mapping(address => uint256[]) public paymentsByPayee;
    uint256 private _paymentIdCounter;

    event PaymentCreated(
        uint256 indexed paymentId,
        address indexed payer,
        address indexed payee,
        uint256 amount
    );

    event PaymentCompleted(
        uint256 indexed paymentId,
        address indexed payee,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function createPayment(
        address payee,
        uint256 amount,
        string memory invoiceId,
        uint256 dueDate
    ) public returns (uint256) {
        uint256 paymentId = _paymentIdCounter++;
        payments[paymentId] = Payment({
            paymentId: paymentId,
            payer: msg.sender,
            payee: payee,
            amount: amount,
            invoiceId: invoiceId,
            dueDate: dueDate,
            paid: false,
            paidDate: 0
        });

        paymentsByPayer[msg.sender].push(paymentId);
        paymentsByPayee[payee].push(paymentId);

        emit PaymentCreated(paymentId, msg.sender, payee, amount);
        return paymentId;
    }

    function processPayment(uint256 paymentId) public payable {
        require(payments[paymentId].payer == msg.sender, "Not the payer");
        require(!payments[paymentId].paid, "Already paid");
        require(msg.value >= payments[paymentId].amount, "Insufficient payment");

        payments[paymentId].paid = true;
        payments[paymentId].paidDate = block.timestamp;

        payable(payments[paymentId].payee).transfer(msg.value);

        emit PaymentCompleted(paymentId, payments[paymentId].payee, msg.value);
    }

    function getPayment(uint256 paymentId) public view returns (Payment memory) {
        return payments[paymentId];
    }
}

