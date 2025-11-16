// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentRental
 * @dev Equipment rental marketplace
 */
contract FarmEquipmentRental is Ownable {
    struct Rental {
        uint256 rentalId;
        address owner;
        address renter;
        string equipmentType;
        uint256 dailyRate;
        uint256 startDate;
        uint256 endDate;
        bool active;
    }

    mapping(uint256 => Rental) public rentals;
    mapping(address => uint256[]) public rentalsByOwner;
    mapping(address => uint256[]) public rentalsByRenter;
    uint256 private _rentalIdCounter;

    event RentalCreated(
        uint256 indexed rentalId,
        address indexed owner,
        string equipmentType
    );
    event RentalStarted(uint256 indexed rentalId, address indexed renter);
    event RentalEnded(uint256 indexed rentalId);

    constructor() Ownable(msg.sender) {}

    function createRental(
        string memory equipmentType,
        uint256 dailyRate,
        uint256 endDate
    ) public returns (uint256) {
        require(dailyRate > 0, "Invalid rate");
        require(endDate > block.timestamp, "Invalid end date");
        uint256 rentalId = _rentalIdCounter++;
        rentals[rentalId] = Rental({
            rentalId: rentalId,
            owner: msg.sender,
            renter: address(0),
            equipmentType: equipmentType,
            dailyRate: dailyRate,
            startDate: 0,
            endDate: endDate,
            active: false
        });
        rentalsByOwner[msg.sender].push(rentalId);
        emit RentalCreated(rentalId, msg.sender, equipmentType);
        return rentalId;
    }

    function startRental(uint256 rentalId) public payable {
        Rental storage rental = rentals[rentalId];
        require(rental.owner != address(0), "Rental not found");
        require(!rental.active, "Already active");
        require(block.timestamp < rental.endDate, "Expired");
        
        uint256 daysRented = (rental.endDate - block.timestamp) / 1 days;
        uint256 totalCost = daysRented * rental.dailyRate;
        require(msg.value >= totalCost, "Insufficient payment");
        
        rental.renter = msg.sender;
        rental.startDate = block.timestamp;
        rental.active = true;
        payable(rental.owner).transfer(msg.value);
        emit RentalStarted(rentalId, msg.sender);
    }
}

