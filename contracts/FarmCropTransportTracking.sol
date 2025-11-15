// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropTransportTracking
 * @dev Onchain system for tracking crop transportation and logistics
 */
contract FarmCropTransportTracking is Ownable {
    struct TransportRecord {
        uint256 recordId;
        uint256 shipmentId;
        address fromAddress;
        address toAddress;
        uint256 departureTime;
        uint256 arrivalTime;
        string transportMethod;
        address tracker;
    }

    mapping(uint256 => TransportRecord) public transportRecords;
    mapping(address => uint256[]) public recordsByTracker;
    uint256 private _recordIdCounter;

    event TransportRecorded(
        uint256 indexed recordId,
        address indexed tracker,
        string transportMethod
    );

    constructor() Ownable(msg.sender) {}

    function recordTransport(
        uint256 shipmentId,
        address fromAddress,
        address toAddress,
        uint256 departureTime,
        string memory transportMethod
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        transportRecords[recordId] = TransportRecord({
            recordId: recordId,
            shipmentId: shipmentId,
            fromAddress: fromAddress,
            toAddress: toAddress,
            departureTime: departureTime,
            arrivalTime: 0,
            transportMethod: transportMethod,
            tracker: msg.sender
        });

        recordsByTracker[msg.sender].push(recordId);

        emit TransportRecorded(recordId, msg.sender, transportMethod);
        return recordId;
    }

    function recordArrival(uint256 recordId, uint256 arrivalTime) public {
        require(transportRecords[recordId].tracker == msg.sender, "Not authorized");
        transportRecords[recordId].arrivalTime = arrivalTime;
    }

    function getRecord(uint256 recordId) public view returns (TransportRecord memory) {
        return transportRecords[recordId];
    }
}

