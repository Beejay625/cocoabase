// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentAuction
 * @dev Onchain equipment auction system
 */
contract FarmEquipmentAuction is Ownable {
    struct Auction {
        uint256 auctionId;
        address seller;
        string equipmentName;
        string equipmentDescription;
        uint256 startingPrice;
        uint256 reservePrice;
        uint256 startTime;
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        bool isActive;
        bool isCompleted;
    }

    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => Bid[]) public bids;
    mapping(address => uint256[]) public auctionsBySeller;
    uint256 private _auctionIdCounter;

    event AuctionCreated(
        uint256 indexed auctionId,
        address indexed seller,
        string equipmentName,
        uint256 startingPrice
    );

    event BidPlaced(
        uint256 indexed auctionId,
        address indexed bidder,
        uint256 amount
    );

    event AuctionCompleted(
        uint256 indexed auctionId,
        address indexed winner,
        uint256 winningBid
    );

    constructor() Ownable(msg.sender) {}

    function createAuction(
        string memory equipmentName,
        string memory equipmentDescription,
        uint256 startingPrice,
        uint256 reservePrice,
        uint256 endTime
    ) public returns (uint256) {
        require(startingPrice > 0, "Starting price must be greater than 0");
        require(reservePrice >= startingPrice, "Reserve price must be >= starting price");
        require(endTime > block.timestamp, "Invalid end time");

        uint256 auctionId = _auctionIdCounter++;
        auctions[auctionId] = Auction({
            auctionId: auctionId,
            seller: msg.sender,
            equipmentName: equipmentName,
            equipmentDescription: equipmentDescription,
            startingPrice: startingPrice,
            reservePrice: reservePrice,
            startTime: block.timestamp,
            endTime: endTime,
            highestBidder: address(0),
            highestBid: 0,
            isActive: true,
            isCompleted: false
        });

        auctionsBySeller[msg.sender].push(auctionId);

        emit AuctionCreated(auctionId, msg.sender, equipmentName, startingPrice);
        return auctionId;
    }

    function placeBid(uint256 auctionId) public payable {
        require(auctions[auctionId].isActive, "Auction not active");
        require(block.timestamp < auctions[auctionId].endTime, "Auction ended");
        require(msg.sender != auctions[auctionId].seller, "Seller cannot bid");
        require(msg.value > auctions[auctionId].highestBid, "Bid too low");
        require(msg.value >= auctions[auctionId].startingPrice, "Bid below starting price");

        if (auctions[auctionId].highestBidder != address(0)) {
            payable(auctions[auctionId].highestBidder).transfer(auctions[auctionId].highestBid);
        }

        auctions[auctionId].highestBidder = msg.sender;
        auctions[auctionId].highestBid = msg.value;

        bids[auctionId].push(Bid({
            bidder: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function completeAuction(uint256 auctionId) public {
        require(auctions[auctionId].isActive, "Auction not active");
        require(block.timestamp >= auctions[auctionId].endTime, "Auction not ended");
        require(!auctions[auctionId].isCompleted, "Already completed");

        auctions[auctionId].isActive = false;
        auctions[auctionId].isCompleted = true;

        if (
            auctions[auctionId].highestBidder != address(0) &&
            auctions[auctionId].highestBid >= auctions[auctionId].reservePrice
        ) {
            payable(auctions[auctionId].seller).transfer(auctions[auctionId].highestBid);
            emit AuctionCompleted(auctionId, auctions[auctionId].highestBidder, auctions[auctionId].highestBid);
        } else if (auctions[auctionId].highestBidder != address(0)) {
            payable(auctions[auctionId].highestBidder).transfer(auctions[auctionId].highestBid);
        }
    }

    function getAuction(uint256 auctionId) public view returns (Auction memory) {
        return auctions[auctionId];
    }

    function getBids(uint256 auctionId) public view returns (Bid[] memory) {
        return bids[auctionId];
    }

    function getAuctionsBySeller(address seller) public view returns (uint256[] memory) {
        return auctionsBySeller[seller];
    }
}

