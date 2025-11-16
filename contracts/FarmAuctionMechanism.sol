// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAuctionMechanism
 * @dev Auction mechanism for agricultural produce
 */
contract FarmAuctionMechanism is Ownable {
    struct Auction {
        uint256 auctionId;
        address seller;
        string productType;
        uint256 quantity;
        uint256 startingPrice;
        uint256 currentBid;
        address currentBidder;
        uint256 endTime;
        bool ended;
    }

    mapping(uint256 => Auction) public auctions;
    mapping(address => uint256[]) public auctionsBySeller;
    uint256 private _auctionIdCounter;

    event AuctionCreated(
        uint256 indexed auctionId,
        address indexed seller,
        uint256 startingPrice
    );

    event BidPlaced(
        uint256 indexed auctionId,
        address indexed bidder,
        uint256 amount
    );

    event AuctionEnded(
        uint256 indexed auctionId,
        address indexed winner,
        uint256 finalPrice
    );

    constructor() Ownable(msg.sender) {}

    function createAuction(
        string memory productType,
        uint256 quantity,
        uint256 startingPrice,
        uint256 duration
    ) public returns (uint256) {
        uint256 auctionId = _auctionIdCounter++;
        auctions[auctionId] = Auction({
            auctionId: auctionId,
            seller: msg.sender,
            productType: productType,
            quantity: quantity,
            startingPrice: startingPrice,
            currentBid: startingPrice,
            currentBidder: address(0),
            endTime: block.timestamp + duration,
            ended: false
        });

        auctionsBySeller[msg.sender].push(auctionId);
        emit AuctionCreated(auctionId, msg.sender, startingPrice);
        return auctionId;
    }

    function placeBid(uint256 auctionId) public payable {
        require(!auctions[auctionId].ended, "Auction ended");
        require(block.timestamp < auctions[auctionId].endTime, "Auction expired");
        require(msg.value > auctions[auctionId].currentBid, "Bid too low");
        if (auctions[auctionId].currentBidder != address(0)) {
            payable(auctions[auctionId].currentBidder).transfer(auctions[auctionId].currentBid);
        }
        auctions[auctionId].currentBid = msg.value;
        auctions[auctionId].currentBidder = msg.sender;
        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function endAuction(uint256 auctionId) public {
        require(block.timestamp >= auctions[auctionId].endTime, "Auction not ended");
        require(!auctions[auctionId].ended, "Already ended");
        auctions[auctionId].ended = true;
        if (auctions[auctionId].currentBidder != address(0)) {
            payable(auctions[auctionId].seller).transfer(auctions[auctionId].currentBid);
            emit AuctionEnded(auctionId, auctions[auctionId].currentBidder, auctions[auctionId].currentBid);
        }
    }

    function getAuction(uint256 auctionId) public view returns (Auction memory) {
        return auctions[auctionId];
    }
}
