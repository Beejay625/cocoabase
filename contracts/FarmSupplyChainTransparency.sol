// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainTransparency
 * @dev Enhanced supply chain transparency with immutable product journey tracking
 */
contract FarmSupplyChainTransparency is Ownable {
    struct ProductJourney {
        uint256 journeyId;
        string productId;
        address currentOwner;
        uint256 originTimestamp;
        string[] checkpoints;
        address[] handlers;
        uint256[] timestamps;
    }

    mapping(uint256 => ProductJourney) public journeys;
    mapping(string => uint256) public productToJourney;
    uint256 private _journeyIdCounter;

    event JourneyStarted(
        uint256 indexed journeyId,
        string productId,
        address indexed origin
    );

    event CheckpointAdded(
        uint256 indexed journeyId,
        string checkpoint,
        address indexed handler
    );

    constructor() Ownable(msg.sender) {}

    function startJourney(
        string memory productId,
        string memory originCheckpoint
    ) public returns (uint256) {
        uint256 journeyId = _journeyIdCounter++;
        journeys[journeyId] = ProductJourney({
            journeyId: journeyId,
            productId: productId,
            currentOwner: msg.sender,
            originTimestamp: block.timestamp,
            checkpoints: new string[](0),
            handlers: new address[](0),
            timestamps: new uint256[](0)
        });

        productToJourney[productId] = journeyId;
        emit JourneyStarted(journeyId, productId, msg.sender);
        addCheckpoint(journeyId, originCheckpoint);
        return journeyId;
    }

    function addCheckpoint(
        uint256 journeyId,
        string memory checkpoint
    ) public {
        require(journeys[journeyId].journeyId == journeyId, "Journey not found");
        journeys[journeyId].checkpoints.push(checkpoint);
        journeys[journeyId].handlers.push(msg.sender);
        journeys[journeyId].timestamps.push(block.timestamp);
        journeys[journeyId].currentOwner = msg.sender;
        emit CheckpointAdded(journeyId, checkpoint, msg.sender);
    }

    function getJourney(uint256 journeyId) public view returns (ProductJourney memory) {
        return journeys[journeyId];
    }
}
