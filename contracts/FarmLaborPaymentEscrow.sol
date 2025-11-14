// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLaborPaymentEscrow
 * @dev Onchain escrow system for labor payments
 */
contract FarmLaborPaymentEscrow is Ownable {
    struct EscrowPayment {
        uint256 paymentId;
        address employer;
        address worker;
        uint256 amount;
        uint256 releaseDate;
        bool released;
        bool disputed;
    }

    mapping(uint256 => EscrowPayment) public escrowPayments;
    mapping(address => uint256[]) public paymentsByEmployer;
    mapping(address => uint256[]) public paymentsByWorker;
    uint256 private _paymentIdCounter;

    event EscrowCreated(
        uint256 indexed paymentId,
        address indexed employer,
        address indexed worker,
        uint256 amount
    );

    event PaymentReleased(uint256 indexed paymentId, address indexed worker, uint256 amount);
    event PaymentDisputed(uint256 indexed paymentId);

    constructor() Ownable(msg.sender) {}

    function createEscrow(
        address worker,
        uint256 amount,
        uint256 releaseDate
    ) public payable returns (uint256) {
        require(msg.value >= amount, "Insufficient payment");

        uint256 paymentId = _paymentIdCounter++;
        escrowPayments[paymentId] = EscrowPayment({
            paymentId: paymentId,
            employer: msg.sender,
            worker: worker,
            amount: amount,
            releaseDate: releaseDate,
            released: false,
            disputed: false
        });

        paymentsByEmployer[msg.sender].push(paymentId);
        paymentsByWorker[worker].push(paymentId);

        emit EscrowCreated(paymentId, msg.sender, worker, amount);
        return paymentId;
    }

    function releasePayment(uint256 paymentId) public {
        require(escrowPayments[paymentId].employer == msg.sender, "Not the employer");
        require(!escrowPayments[paymentId].released, "Already released");
        require(!escrowPayments[paymentId].disputed, "Payment disputed");
        require(block.timestamp >= escrowPayments[paymentId].releaseDate, "Release date not reached");

        escrowPayments[paymentId].released = true;

        payable(escrowPayments[paymentId].worker).transfer(escrowPayments[paymentId].amount);

        emit PaymentReleased(paymentId, escrowPayments[paymentId].worker, escrowPayments[paymentId].amount);
    }

    function disputePayment(uint256 paymentId) public {
        require(escrowPayments[paymentId].worker == msg.sender, "Not the worker");
        require(!escrowPayments[paymentId].released, "Already released");
        require(!escrowPayments[paymentId].disputed, "Already disputed");

        escrowPayments[paymentId].disputed = true;

        emit PaymentDisputed(paymentId);
    }

    function resolveDispute(uint256 paymentId, bool approve) public onlyOwner {
        require(escrowPayments[paymentId].disputed, "Not disputed");
        require(!escrowPayments[paymentId].released, "Already released");

        if (approve) {
            escrowPayments[paymentId].released = true;
            payable(escrowPayments[paymentId].worker).transfer(escrowPayments[paymentId].amount);
            emit PaymentReleased(paymentId, escrowPayments[paymentId].worker, escrowPayments[paymentId].amount);
        } else {
            payable(escrowPayments[paymentId].employer).transfer(escrowPayments[paymentId].amount);
        }
    }

    function getPayment(uint256 paymentId) public view returns (EscrowPayment memory) {
        return escrowPayments[paymentId];
    }
}

