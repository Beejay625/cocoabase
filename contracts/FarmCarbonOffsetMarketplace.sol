// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCarbonOffsetMarketplace
 * @dev Onchain marketplace for trading carbon offset credits
 */
contract FarmCarbonOffsetMarketplace is Ownable {
    struct CarbonOffset {
        uint256 offsetId;
        uint256 carbonAmount;
        uint256 pricePerTon;
        address seller;
        address buyer;
        uint256 listingDate;
        bool sold;
        bool verified;
    }

    mapping(uint256 => CarbonOffset) public carbonOffsets;
    mapping(address => uint256[]) public offsetsByOwner;
    uint256 private _offsetIdCounter;

    event CarbonOffsetListed(
        uint256 indexed offsetId,
        address indexed seller,
        uint256 carbonAmount,
        uint256 pricePerTon
    );

    event CarbonOffsetTraded(
        uint256 indexed offsetId,
        address indexed buyer,
        uint256 totalPrice
    );

    constructor() Ownable(msg.sender) {}

    function listCarbonOffset(
        uint256 carbonAmount,
        uint256 pricePerTon
    ) public returns (uint256) {
        uint256 offsetId = _offsetIdCounter++;
        carbonOffsets[offsetId] = CarbonOffset({
            offsetId: offsetId,
            carbonAmount: carbonAmount,
            pricePerTon: pricePerTon,
            seller: msg.sender,
            buyer: address(0),
            listingDate: block.timestamp,
            sold: false,
            verified: false
        });

        offsetsByOwner[msg.sender].push(offsetId);

        emit CarbonOffsetListed(offsetId, msg.sender, carbonAmount, pricePerTon);
        return offsetId;
    }

    function purchaseCarbonOffset(uint256 offsetId) public payable {
        require(!carbonOffsets[offsetId].sold, "Already sold");
        uint256 totalPrice = carbonOffsets[offsetId].carbonAmount * carbonOffsets[offsetId].pricePerTon;
        require(msg.value >= totalPrice, "Insufficient payment");

        carbonOffsets[offsetId].sold = true;
        carbonOffsets[offsetId].buyer = msg.sender;

        payable(carbonOffsets[offsetId].seller).transfer(msg.value);

        emit CarbonOffsetTraded(offsetId, msg.sender, msg.value);
    }

    function verifyOffset(uint256 offsetId) public onlyOwner {
        carbonOffsets[offsetId].verified = true;
    }

    function getOffset(uint256 offsetId) public view returns (CarbonOffset memory) {
        return carbonOffsets[offsetId];
    }
}

