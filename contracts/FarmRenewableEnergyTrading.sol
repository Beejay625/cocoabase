// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRenewableEnergyTrading
 * @dev Onchain marketplace for trading renewable energy generated on farms
 */
contract FarmRenewableEnergyTrading is Ownable {
    struct EnergyListing {
        uint256 listingId;
        uint256 energyAmount;
        uint256 pricePerUnit;
        address seller;
        address buyer;
        uint256 listingDate;
        string energyType;
        bool sold;
    }

    mapping(uint256 => EnergyListing) public energyListings;
    mapping(address => uint256[]) public listingsByOwner;
    uint256 private _listingIdCounter;

    event EnergyListed(
        uint256 indexed listingId,
        address indexed seller,
        uint256 energyAmount,
        uint256 pricePerUnit
    );

    event EnergyTraded(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 totalPrice
    );

    constructor() Ownable(msg.sender) {}

    function listEnergy(
        uint256 energyAmount,
        uint256 pricePerUnit,
        string memory energyType
    ) public returns (uint256) {
        uint256 listingId = _listingIdCounter++;
        energyListings[listingId] = EnergyListing({
            listingId: listingId,
            energyAmount: energyAmount,
            pricePerUnit: pricePerUnit,
            seller: msg.sender,
            buyer: address(0),
            listingDate: block.timestamp,
            energyType: energyType,
            sold: false
        });

        listingsByOwner[msg.sender].push(listingId);

        emit EnergyListed(listingId, msg.sender, energyAmount, pricePerUnit);
        return listingId;
    }

    function purchaseEnergy(uint256 listingId) public payable {
        require(!energyListings[listingId].sold, "Already sold");
        uint256 totalPrice = energyListings[listingId].energyAmount * energyListings[listingId].pricePerUnit;
        require(msg.value >= totalPrice, "Insufficient payment");

        energyListings[listingId].sold = true;
        energyListings[listingId].buyer = msg.sender;

        payable(energyListings[listingId].seller).transfer(msg.value);

        emit EnergyTraded(listingId, msg.sender, msg.value);
    }

    function getListing(uint256 listingId) public view returns (EnergyListing memory) {
        return energyListings[listingId];
    }
}

