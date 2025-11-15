// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmResourceSharing
 * @dev Resource sharing marketplace for equipment and tools
 */
contract FarmResourceSharing is Ownable {
    struct SharedResource {
        uint256 resourceId;
        address owner;
        string resourceType;
        string description;
        uint256 dailyRate;
        bool available;
        uint256 listingDate;
    }

    struct Rental {
        uint256 rentalId;
        uint256 resourceId;
        address renter;
        uint256 startDate;
        uint256 endDate;
        uint256 totalCost;
        bool active;
    }

    mapping(uint256 => SharedResource) public resources;
    mapping(uint256 => Rental) public rentals;
    mapping(address => uint256[]) public resourcesByOwner;
    mapping(address => uint256[]) public rentalsByRenter;
    uint256 private _resourceIdCounter;
    uint256 private _rentalIdCounter;

    event ResourceListed(
        uint256 indexed resourceId,
        address indexed owner,
        string resourceType
    );

    event RentalCreated(
        uint256 indexed rentalId,
        uint256 indexed resourceId,
        address indexed renter
    );

    constructor() Ownable(msg.sender) {}

    function listResource(
        string memory resourceType,
        string memory description,
        uint256 dailyRate
    ) public returns (uint256) {
        uint256 resourceId = _resourceIdCounter++;
        resources[resourceId] = SharedResource({
            resourceId: resourceId,
            owner: msg.sender,
            resourceType: resourceType,
            description: description,
            dailyRate: dailyRate,
            available: true,
            listingDate: block.timestamp
        });

        resourcesByOwner[msg.sender].push(resourceId);
        emit ResourceListed(resourceId, msg.sender, resourceType);
        return resourceId;
    }

    function createRental(
        uint256 resourceId,
        uint256 startDate,
        uint256 endDate
    ) public returns (uint256) {
        require(resources[resourceId].available, "Resource not available");
        require(resources[resourceId].owner != msg.sender, "Cannot rent own resource");
        uint256 daysRented = (endDate - startDate) / 1 days;
        uint256 totalCost = daysRented * resources[resourceId].dailyRate;

        uint256 rentalId = _rentalIdCounter++;
        rentals[rentalId] = Rental({
            rentalId: rentalId,
            resourceId: resourceId,
            renter: msg.sender,
            startDate: startDate,
            endDate: endDate,
            totalCost: totalCost,
            active: true
        });

        resources[resourceId].available = false;
        rentalsByRenter[msg.sender].push(rentalId);
        emit RentalCreated(rentalId, resourceId, msg.sender);
        return rentalId;
    }

    function completeRental(uint256 rentalId) public {
        require(rentals[rentalId].active, "Rental not active");
        require(block.timestamp >= rentals[rentalId].endDate, "Rental not ended");
        uint256 resourceId = rentals[rentalId].resourceId;
        resources[resourceId].available = true;
        rentals[rentalId].active = false;
    }

    function getResource(uint256 resourceId) public view returns (SharedResource memory) {
        return resources[resourceId];
    }
}
