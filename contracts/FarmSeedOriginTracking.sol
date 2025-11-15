// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSeedOriginTracking
 * @dev Onchain seed origin and provenance tracking
 */
contract FarmSeedOriginTracking is Ownable {
    struct SeedOrigin {
        uint256 originId;
        address farmer;
        string seedBatchId;
        string originLocation;
        string supplier;
        uint256 purchaseDate;
        string certification;
        bool isVerified;
        address verifier;
    }

    mapping(uint256 => SeedOrigin) public origins;
    mapping(string => uint256) public originsByBatchId;
    mapping(address => uint256[]) public originsByFarmer;
    uint256 private _originIdCounter;

    event OriginRecorded(
        uint256 indexed originId,
        address indexed farmer,
        string seedBatchId
    );

    event OriginVerified(
        uint256 indexed originId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function recordOrigin(
        string memory seedBatchId,
        string memory originLocation,
        string memory supplier,
        string memory certification
    ) public returns (uint256) {
        require(bytes(seedBatchId).length > 0, "Seed batch ID required");
        require(originsByBatchId[seedBatchId] == 0, "Batch already recorded");

        uint256 originId = _originIdCounter++;
        origins[originId] = SeedOrigin({
            originId: originId,
            farmer: msg.sender,
            seedBatchId: seedBatchId,
            originLocation: originLocation,
            supplier: supplier,
            purchaseDate: block.timestamp,
            certification: certification,
            isVerified: false,
            verifier: address(0)
        });

        originsByBatchId[seedBatchId] = originId;
        originsByFarmer[msg.sender].push(originId);

        emit OriginRecorded(originId, msg.sender, seedBatchId);
        return originId;
    }

    function verifyOrigin(uint256 originId) public onlyOwner {
        require(!origins[originId].isVerified, "Already verified");
        origins[originId].isVerified = true;
        origins[originId].verifier = msg.sender;

        emit OriginVerified(originId, msg.sender);
    }

    function getOrigin(uint256 originId) public view returns (SeedOrigin memory) {
        return origins[originId];
    }

    function getOriginByBatchId(string memory seedBatchId) public view returns (SeedOrigin memory) {
        uint256 originId = originsByBatchId[seedBatchId];
        return origins[originId];
    }
}

