// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPriceDiscovery
 * @dev Price discovery mechanism for agricultural products
 */
contract FarmPriceDiscovery is Ownable {
    struct PriceQuote {
        uint256 quoteId;
        address seller;
        address buyer;
        string productType;
        uint256 quantity;
        uint256 pricePerUnit;
        uint256 quoteDate;
        bool accepted;
    }

    mapping(uint256 => PriceQuote) public quotes;
    mapping(address => uint256[]) public quotesBySeller;
    uint256 private _quoteIdCounter;

    event QuoteCreated(
        uint256 indexed quoteId,
        address indexed seller,
        uint256 pricePerUnit
    );

    event QuoteAccepted(
        uint256 indexed quoteId,
        address indexed buyer
    );

    constructor() Ownable(msg.sender) {}

    function createQuote(
        address buyer,
        string memory productType,
        uint256 quantity,
        uint256 pricePerUnit
    ) public returns (uint256) {
        uint256 quoteId = _quoteIdCounter++;
        quotes[quoteId] = PriceQuote({
            quoteId: quoteId,
            seller: msg.sender,
            buyer: buyer,
            productType: productType,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            quoteDate: block.timestamp,
            accepted: false
        });

        quotesBySeller[msg.sender].push(quoteId);
        emit QuoteCreated(quoteId, msg.sender, pricePerUnit);
        return quoteId;
    }

    function acceptQuote(uint256 quoteId) public {
        require(quotes[quoteId].buyer == msg.sender, "Not authorized");
        require(!quotes[quoteId].accepted, "Already accepted");
        quotes[quoteId].accepted = true;
        emit QuoteAccepted(quoteId, msg.sender);
    }

    function getQuote(uint256 quoteId) public view returns (PriceQuote memory) {
        return quotes[quoteId];
    }
}
