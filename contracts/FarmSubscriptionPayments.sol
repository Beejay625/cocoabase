// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSubscriptionPayments
 * @dev Recurring payment smart contracts
 */
contract FarmSubscriptionPayments is Ownable {
    struct Subscription {
        uint256 subscriptionId;
        address subscriber;
        address recipient;
        uint256 amount;
        uint256 interval;
        uint256 nextPayment;
        bool active;
    }

    mapping(uint256 => Subscription) public subscriptions;
    mapping(address => uint256[]) public subscriptionsBySubscriber;
    uint256 private _subscriptionIdCounter;

    event SubscriptionCreated(
        uint256 indexed subscriptionId,
        address indexed subscriber,
        address indexed recipient
    );
    event PaymentProcessed(uint256 indexed subscriptionId, uint256 amount);
    event SubscriptionCancelled(uint256 indexed subscriptionId);

    constructor() Ownable(msg.sender) {}

    function createSubscription(
        address recipient,
        uint256 amount,
        uint256 interval
    ) public returns (uint256) {
        require(amount > 0, "Amount must be greater than 0");
        require(interval > 0, "Interval must be greater than 0");
        
        uint256 subscriptionId = _subscriptionIdCounter++;
        subscriptions[subscriptionId] = Subscription({
            subscriptionId: subscriptionId,
            subscriber: msg.sender,
            recipient: recipient,
            amount: amount,
            interval: interval,
            nextPayment: block.timestamp + interval,
            active: true
        });
        subscriptionsBySubscriber[msg.sender].push(subscriptionId);
        emit SubscriptionCreated(subscriptionId, msg.sender, recipient);
        return subscriptionId;
    }

    function processPayment(uint256 subscriptionId) public payable {
        Subscription storage sub = subscriptions[subscriptionId];
        require(sub.active, "Subscription inactive");
        require(block.timestamp >= sub.nextPayment, "Payment not due");
        require(msg.value >= sub.amount, "Insufficient payment");
        
        sub.nextPayment = block.timestamp + sub.interval;
        payable(sub.recipient).transfer(sub.amount);
        emit PaymentProcessed(subscriptionId, sub.amount);
    }

    function cancelSubscription(uint256 subscriptionId) public {
        require(
            subscriptions[subscriptionId].subscriber == msg.sender,
            "Not the subscriber"
        );
        subscriptions[subscriptionId].active = false;
        emit SubscriptionCancelled(subscriptionId);
    }
}

