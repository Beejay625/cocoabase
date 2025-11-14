// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLandRegistry
 * @dev Onchain registry for farm land ownership and boundaries
 */
contract FarmLandRegistry is Ownable {
    struct LandParcel {
        uint256 parcelId;
        address owner;
        uint256 areaHectares;
        string location;
        string coordinates;
        uint256 registrationDate;
        bool verified;
    }

    mapping(uint256 => LandParcel) public landParcels;
    mapping(address => uint256[]) public parcelsByOwner;
    uint256 private _parcelIdCounter;

    event LandParcelRegistered(
        uint256 indexed parcelId,
        address indexed owner,
        uint256 areaHectares
    );

    event LandParcelVerified(uint256 indexed parcelId);
    event LandParcelTransferred(
        uint256 indexed parcelId,
        address indexed from,
        address indexed to
    );

    constructor() Ownable(msg.sender) {}

    function registerLandParcel(
        uint256 areaHectares,
        string memory location,
        string memory coordinates
    ) public returns (uint256) {
        uint256 parcelId = _parcelIdCounter++;
        landParcels[parcelId] = LandParcel({
            parcelId: parcelId,
            owner: msg.sender,
            areaHectares: areaHectares,
            location: location,
            coordinates: coordinates,
            registrationDate: block.timestamp,
            verified: false
        });

        parcelsByOwner[msg.sender].push(parcelId);

        emit LandParcelRegistered(parcelId, msg.sender, areaHectares);
        return parcelId;
    }

    function verifyLandParcel(uint256 parcelId) public onlyOwner {
        require(!landParcels[parcelId].verified, "Already verified");
        landParcels[parcelId].verified = true;

        emit LandParcelVerified(parcelId);
    }

    function transferLandParcel(uint256 parcelId, address newOwner) public {
        require(landParcels[parcelId].owner == msg.sender, "Not the owner");
        require(newOwner != address(0), "Invalid new owner");

        address oldOwner = landParcels[parcelId].owner;
        landParcels[parcelId].owner = newOwner;

        emit LandParcelTransferred(parcelId, oldOwner, newOwner);
    }

    function getLandParcel(uint256 parcelId) public view returns (LandParcel memory) {
        return landParcels[parcelId];
    }
}

