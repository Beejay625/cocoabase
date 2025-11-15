// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmMarketPriceTracking
 * @dev Onchain system for tracking market prices
 */
contract FarmMarketPriceTracking is Ownable {
    struct PriceRecord {
        uint256 recordId;
        string commodity;
        uint256 price;
        string unit;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => PriceRecord) public priceRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event PriceRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        string commodity,
        uint256 price
    );

    constructor() Ownable(msg.sender) {}

    function recordPrice(
        string memory commodity,
        uint256 price,
        string memory unit
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        priceRecords[recordId] = PriceRecord({
            recordId: recordId,
            commodity: commodity,
            price: price,
            unit: unit,
            recordDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit PriceRecorded(recordId, msg.sender, commodity, price);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PriceRecord memory) {
        return priceRecords[recordId];
    }
}



