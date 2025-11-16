// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropTransportTracking
 * @dev Onchain crop transportation and logistics tracking
 */
contract FarmCropTransportTracking is Ownable {
    struct TransportRecord {
        uint256 recordId;
        address farmer;
        string shipmentId;
        string origin;
        string destination;
        uint256 departureDate;
        uint256 arrivalDate;
        string transportMethod;
        string status;
    }

    mapping(uint256 => TransportRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event TransportRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string shipmentId,
        string destination
    );

    constructor() Ownable(msg.sender) {}

    function recordTransport(
        string memory shipmentId,
        string memory origin,
        string memory destination,
        uint256 departureDate,
        string memory transportMethod
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = TransportRecord({
            recordId: recordId,
            farmer: msg.sender,
            shipmentId: shipmentId,
            origin: origin,
            destination: destination,
            departureDate: departureDate,
            arrivalDate: 0,
            transportMethod: transportMethod,
            status: "In Transit"
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit TransportRecorded(recordId, msg.sender, shipmentId, destination);
        return recordId;
    }

    function updateArrival(uint256 recordId, uint256 arrivalDate) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].arrivalDate = arrivalDate;
        records[recordId].status = "Delivered";
    }

    function getRecord(uint256 recordId) public view returns (TransportRecord memory) {
        return records[recordId];
    }
}
