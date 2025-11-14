// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSeedExchange
 * @dev Onchain marketplace for exchanging and trading seeds
 */
contract FarmSeedExchange is Ownable {
    struct SeedListing {
        uint256 listingId;
        string seedType;
        uint256 quantity;
        uint256 pricePerUnit;
        address seller;
        address buyer;
        uint256 listingDate;
        string quality;
        bool sold;
    }

    mapping(uint256 => SeedListing) public seedListings;
    mapping(address => uint256[]) public listingsBySeller;
    mapping(address => uint256[]) public listingsByBuyer;
    uint256 private _listingIdCounter;

    event SeedListed(
        uint256 indexed listingId,
        address indexed seller,
        string seedType,
        uint256 quantity
    );

    event SeedTraded(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 totalPrice
    );

    constructor() Ownable(msg.sender) {}

    function listSeeds(
        string memory seedType,
        uint256 quantity,
        uint256 pricePerUnit,
        string memory quality
    ) public returns (uint256) {
        uint256 listingId = _listingIdCounter++;
        seedListings[listingId] = SeedListing({
            listingId: listingId,
            seedType: seedType,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            seller: msg.sender,
            buyer: address(0),
            listingDate: block.timestamp,
            quality: quality,
            sold: false
        });

        listingsBySeller[msg.sender].push(listingId);

        emit SeedListed(listingId, msg.sender, seedType, quantity);
        return listingId;
    }

    function purchaseSeeds(uint256 listingId) public payable {
        require(!seedListings[listingId].sold, "Already sold");
        uint256 totalPrice = seedListings[listingId].quantity * seedListings[listingId].pricePerUnit;
        require(msg.value >= totalPrice, "Insufficient payment");

        seedListings[listingId].sold = true;
        seedListings[listingId].buyer = msg.sender;

        payable(seedListings[listingId].seller).transfer(msg.value);

        emit SeedTraded(listingId, msg.sender, msg.value);
    }

    function getListing(uint256 listingId) public view returns (SeedListing memory) {
        return seedListings[listingId];
    }
}

