// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmOracleAggregator
 * @dev Chainlink-compatible oracle aggregation for price feeds
 */
contract FarmOracleAggregator is Ownable {
    struct PriceFeed {
        address oracle;
        uint256 price;
        uint256 timestamp;
        bool isActive;
    }

    mapping(string => PriceFeed[]) public priceFeeds;
    mapping(address => bool) public isOracle;
    uint256 public priceStalenessThreshold = 1 hours;

    event PriceUpdated(string indexed feedId, uint256 price, uint256 timestamp);
    event OracleAdded(address indexed oracle, string feedId);
    event OracleRemoved(address indexed oracle, string feedId);

    constructor() Ownable(msg.sender) {}

    function addOracle(address oracle, string memory feedId) public onlyOwner {
        isOracle[oracle] = true;
        priceFeeds[feedId].push(PriceFeed({
            oracle: oracle,
            price: 0,
            timestamp: 0,
            isActive: true
        }));
        emit OracleAdded(oracle, feedId);
    }

    function updatePrice(string memory feedId, uint256 price) public {
        require(isOracle[msg.sender], "Not an oracle");
        for (uint256 i = 0; i < priceFeeds[feedId].length; i++) {
            if (priceFeeds[feedId][i].oracle == msg.sender) {
                priceFeeds[feedId][i].price = price;
                priceFeeds[feedId][i].timestamp = block.timestamp;
                emit PriceUpdated(feedId, price, block.timestamp);
                break;
            }
        }
    }

    function getAggregatedPrice(string memory feedId) public view returns (uint256) {
        PriceFeed[] memory feeds = priceFeeds[feedId];
        require(feeds.length > 0, "No feeds available");
        
        uint256 sum = 0;
        uint256 count = 0;
        for (uint256 i = 0; i < feeds.length; i++) {
            if (feeds[i].isActive && 
                block.timestamp - feeds[i].timestamp <= priceStalenessThreshold) {
                sum += feeds[i].price;
                count++;
            }
        }
        require(count > 0, "No valid feeds");
        return sum / count;
    }
}

