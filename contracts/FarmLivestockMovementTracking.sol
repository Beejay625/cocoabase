// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMovementTracking
 * @dev Onchain livestock movement and location tracking
 */
contract FarmLivestockMovementTracking is Ownable {
    struct MovementRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string fromLocation;
        string toLocation;
        uint256 movementDate;
        string reason;
    }

    mapping(uint256 => MovementRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    mapping(string => uint256[]) public recordsByLivestock;
    uint256 private _recordIdCounter;

    event MovementRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string toLocation
    );

    constructor() Ownable(msg.sender) {}

    function recordMovement(
        string memory livestockId,
        string memory fromLocation,
        string memory toLocation,
        string memory reason
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = MovementRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            fromLocation: fromLocation,
            toLocation: toLocation,
            movementDate: block.timestamp,
            reason: reason
        });

        recordsByFarmer[msg.sender].push(recordId);
        recordsByLivestock[livestockId].push(recordId);

        emit MovementRecorded(recordId, msg.sender, livestockId, toLocation);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MovementRecord memory) {
        return records[recordId];
    }
}

