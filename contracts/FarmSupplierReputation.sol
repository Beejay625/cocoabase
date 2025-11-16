// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplierReputation
 * @dev Supplier reputation and rating system
 */
contract FarmSupplierReputation is Ownable {
    struct SupplierRating {
        address supplier;
        uint256 score;
        uint256 totalRatings;
        uint256 onTimeDeliveries;
        uint256 totalDeliveries;
        uint256 lastUpdated;
    }

    mapping(address => SupplierRating) public supplierRatings;
    mapping(address => mapping(address => bool)) public hasRatedSupplier;

    event SupplierRated(address indexed supplier, address indexed rater, uint256 score);
    event RatingUpdated(address indexed supplier, uint256 newScore);

    constructor() Ownable(msg.sender) {}

    function rateSupplier(address supplier, uint256 score) public {
        require(score >= 1 && score <= 5, "Invalid score");
        require(supplier != msg.sender, "Cannot rate yourself");
        require(!hasRatedSupplier[supplier][msg.sender], "Already rated");
        
        hasRatedSupplier[supplier][msg.sender] = true;
        SupplierRating storage rating = supplierRatings[supplier];
        if (rating.supplier == address(0)) {
            rating.supplier = supplier;
            rating.score = 1000;
        }
        
        rating.totalRatings++;
        rating.score = ((rating.score * (rating.totalRatings - 1)) + (score * 200)) / rating.totalRatings;
        rating.lastUpdated = block.timestamp;
        emit SupplierRated(supplier, msg.sender, score);
        emit RatingUpdated(supplier, rating.score);
    }

    function recordDelivery(address supplier, bool onTime) public {
        SupplierRating storage rating = supplierRatings[supplier];
        if (rating.supplier == address(0)) {
            rating.supplier = supplier;
            rating.score = 1000;
        }
        rating.totalDeliveries++;
        if (onTime) {
            rating.onTimeDeliveries++;
        }
    }

    function getSupplierRating(address supplier) public view returns (SupplierRating memory) {
        return supplierRatings[supplier];
    }
}
