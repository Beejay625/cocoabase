// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFieldBoundary
 * @dev Onchain field boundary management
 */
contract FarmFieldBoundary is Ownable {
    struct FieldBoundary {
        uint256 boundaryId;
        address farmer;
        string location;
        string coordinates;
        uint256 area;
        uint256 perimeter;
        string boundaryType;
        bool isActive;
        uint256 registrationDate;
    }

    mapping(uint256 => FieldBoundary) public fieldBoundaries;
    mapping(address => uint256[]) public boundariesByFarmer;
    mapping(string => uint256[]) public boundariesByLocation;
    uint256 private _boundaryIdCounter;

    event FieldBoundaryRegistered(
        uint256 indexed boundaryId,
        address indexed farmer,
        string location,
        uint256 area
    );

    constructor() Ownable(msg.sender) {}

    function registerFieldBoundary(
        string memory location,
        string memory coordinates,
        uint256 area,
        uint256 perimeter,
        string memory boundaryType
    ) public returns (uint256) {
        require(area > 0, "Area must be greater than 0");
        require(perimeter > 0, "Perimeter must be greater than 0");
        require(bytes(coordinates).length > 0, "Coordinates cannot be empty");

        uint256 boundaryId = _boundaryIdCounter++;
        fieldBoundaries[boundaryId] = FieldBoundary({
            boundaryId: boundaryId,
            farmer: msg.sender,
            location: location,
            coordinates: coordinates,
            area: area,
            perimeter: perimeter,
            boundaryType: boundaryType,
            isActive: true,
            registrationDate: block.timestamp
        });

        boundariesByFarmer[msg.sender].push(boundaryId);
        boundariesByLocation[location].push(boundaryId);

        emit FieldBoundaryRegistered(boundaryId, msg.sender, location, area);
        return boundaryId;
    }

    function updateFieldBoundary(
        uint256 boundaryId,
        string memory coordinates,
        uint256 area,
        uint256 perimeter
    ) public {
        require(fieldBoundaries[boundaryId].farmer == msg.sender, "Not the farmer");
        require(fieldBoundaries[boundaryId].isActive, "Boundary not active");

        fieldBoundaries[boundaryId].coordinates = coordinates;
        fieldBoundaries[boundaryId].area = area;
        fieldBoundaries[boundaryId].perimeter = perimeter;
    }

    function deactivateFieldBoundary(uint256 boundaryId) public {
        require(fieldBoundaries[boundaryId].farmer == msg.sender, "Not the farmer");
        require(fieldBoundaries[boundaryId].isActive, "Boundary not active");

        fieldBoundaries[boundaryId].isActive = false;
    }

    function getFieldBoundary(uint256 boundaryId) public view returns (FieldBoundary memory) {
        return fieldBoundaries[boundaryId];
    }

    function getBoundariesByFarmer(address farmer) public view returns (uint256[] memory) {
        return boundariesByFarmer[farmer];
    }

    function getBoundariesByLocation(string memory location) public view returns (uint256[] memory) {
        return boundariesByLocation[location];
    }
}

