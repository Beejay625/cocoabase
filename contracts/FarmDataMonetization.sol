// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmDataMonetization
 * @dev Onchain system for monetizing farm data through marketplace
 */
contract FarmDataMonetization is Ownable {
    struct DataListing {
        uint256 listingId;
        string dataType;
        uint256 price;
        address seller;
        address buyer;
        uint256 listingDate;
        bool sold;
        string metadata;
    }

    mapping(uint256 => DataListing) public dataListings;
    mapping(address => uint256[]) public listingsByOwner;
    uint256 private _listingIdCounter;

    event DataListed(
        uint256 indexed listingId,
        address indexed seller,
        string dataType,
        uint256 price
    );

    event DataPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );

    constructor() Ownable(msg.sender) {}

    function listData(
        string memory dataType,
        uint256 price,
        string memory metadata
    ) public returns (uint256) {
        uint256 listingId = _listingIdCounter++;
        dataListings[listingId] = DataListing({
            listingId: listingId,
            dataType: dataType,
            price: price,
            seller: msg.sender,
            buyer: address(0),
            listingDate: block.timestamp,
            sold: false,
            metadata: metadata
        });

        listingsByOwner[msg.sender].push(listingId);

        emit DataListed(listingId, msg.sender, dataType, price);
        return listingId;
    }

    function purchaseData(uint256 listingId) public payable {
        require(!dataListings[listingId].sold, "Already sold");
        require(msg.value >= dataListings[listingId].price, "Insufficient payment");

        dataListings[listingId].sold = true;
        dataListings[listingId].buyer = msg.sender;

        payable(dataListings[listingId].seller).transfer(msg.value);

        emit DataPurchased(listingId, msg.sender, msg.value);
    }

    function getListing(uint256 listingId) public view returns (DataListing memory) {
        return dataListings[listingId];
    }
}

