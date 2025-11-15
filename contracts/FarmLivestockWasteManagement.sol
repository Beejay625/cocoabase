// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWasteManagement
 * @dev Manage livestock waste processing
 */
contract FarmLivestockWasteManagement is Ownable {
    struct WasteProcessing {
        uint256 processingId;
        uint256 livestockId;
        string processingMethod;
        uint256 wasteAmount;
        uint256 processedDate;
        address processor;
    }

    mapping(uint256 => WasteProcessing) public processings;
    mapping(address => uint256[]) public processingsByOwner;
    uint256 private _processingIdCounter;

    event ProcessingRecorded(
        uint256 indexed processingId,
        address indexed owner,
        uint256 livestockId
    );

    constructor() Ownable(msg.sender) {}

    function recordProcessing(
        uint256 livestockId,
        string memory processingMethod,
        uint256 wasteAmount
    ) public returns (uint256) {
        uint256 processingId = _processingIdCounter++;
        processings[processingId] = WasteProcessing({
            processingId: processingId,
            livestockId: livestockId,
            processingMethod: processingMethod,
            wasteAmount: wasteAmount,
            processedDate: block.timestamp,
            processor: msg.sender
        });

        processingsByOwner[msg.sender].push(processingId);

        emit ProcessingRecorded(processingId, msg.sender, livestockId);
        return processingId;
    }

    function getProcessing(uint256 processingId) public view returns (WasteProcessing memory) {
        return processings[processingId];
    }

    function getProcessingsByOwner(address owner) public view returns (uint256[] memory) {
        return processingsByOwner[owner];
    }
}


