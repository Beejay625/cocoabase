// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMovement
 * @dev Onchain system for tracking livestock movements
 */
contract FarmLivestockMovement is Ownable {
    struct MovementRecord {
        uint256 recordId;
        uint256 livestockId;
        string fromLocation;
        string toLocation;
        uint256 movementDate;
        address recorder;
    }

    mapping(uint256 => MovementRecord) public movementRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event MovementRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        string toLocation
    );

    constructor() Ownable(msg.sender) {}

    function recordMovement(
        uint256 livestockId,
        string memory fromLocation,
        string memory toLocation
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        movementRecords[recordId] = MovementRecord({
            recordId: recordId,
            livestockId: livestockId,
            fromLocation: fromLocation,
            toLocation: toLocation,
            movementDate: block.timestamp,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit MovementRecorded(recordId, msg.sender, toLocation);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (MovementRecord memory) {
        return movementRecords[recordId];
    }
}



