// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainTracking
 * @dev Onchain system for tracking products through supply chain
 */
contract FarmSupplyChainTracking is Ownable {
    struct SupplyChainRecord {
        uint256 recordId;
        uint256 productId;
        string location;
        string handler;
        uint256 timestamp;
        address recorder;
    }

    mapping(uint256 => SupplyChainRecord) public supplyChainRecords;
    mapping(uint256 => uint256[]) public recordsByProduct;
    uint256 private _recordIdCounter;

    event SupplyChainRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        string location
    );

    constructor() Ownable(msg.sender) {}

    function recordLocation(
        uint256 productId,
        string memory location,
        string memory handler
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        supplyChainRecords[recordId] = SupplyChainRecord({
            recordId: recordId,
            productId: productId,
            location: location,
            handler: handler,
            timestamp: block.timestamp,
            recorder: msg.sender
        });

        recordsByProduct[productId].push(recordId);

        emit SupplyChainRecorded(recordId, msg.sender, location);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (SupplyChainRecord memory) {
        return supplyChainRecords[recordId];
    }
}



