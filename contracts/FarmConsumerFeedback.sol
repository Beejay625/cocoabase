// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmConsumerFeedback
 * @dev Consumer feedback collection and rating system
 */
contract FarmConsumerFeedback is Ownable {
    struct Feedback {
        uint256 feedbackId;
        address consumer;
        string productId;
        uint256 rating;
        string comment;
        uint256 submissionDate;
        bool verified;
    }

    mapping(uint256 => Feedback) public feedbacks;
    mapping(string => uint256[]) public feedbacksByProduct;
    mapping(address => uint256[]) public feedbacksByConsumer;
    uint256 private _feedbackIdCounter;

    event FeedbackSubmitted(
        uint256 indexed feedbackId,
        address indexed consumer,
        string productId,
        uint256 rating
    );

    constructor() Ownable(msg.sender) {}

    function submitFeedback(
        string memory productId,
        uint256 rating,
        string memory comment
    ) public returns (uint256) {
        require(rating >= 1 && rating <= 5, "Invalid rating");
        uint256 feedbackId = _feedbackIdCounter++;
        feedbacks[feedbackId] = Feedback({
            feedbackId: feedbackId,
            consumer: msg.sender,
            productId: productId,
            rating: rating,
            comment: comment,
            submissionDate: block.timestamp,
            verified: false
        });

        feedbacksByProduct[productId].push(feedbackId);
        feedbacksByConsumer[msg.sender].push(feedbackId);
        emit FeedbackSubmitted(feedbackId, msg.sender, productId, rating);
        return feedbackId;
    }

    function verifyFeedback(uint256 feedbackId) public onlyOwner {
        feedbacks[feedbackId].verified = true;
    }

    function getFeedback(uint256 feedbackId) public view returns (Feedback memory) {
        return feedbacks[feedbackId];
    }
}
