// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPestManagement
 * @dev Onchain system for tracking and managing pest control
 */
contract FarmPestManagement is Ownable {
    struct PestRecord {
        uint256 recordId;
        uint256 plantationId;
        string pestType;
        uint256 severity;
        uint256 detectionDate;
        string treatmentMethod;
        address manager;
        bool treated;
    }

    mapping(uint256 => PestRecord) public pestRecords;
    mapping(address => uint256[]) public recordsByManager;
    uint256 private _recordIdCounter;

    event PestDetected(
        uint256 indexed recordId,
        address indexed manager,
        string pestType
    );

    event PestTreated(uint256 indexed recordId, string treatmentMethod);

    constructor() Ownable(msg.sender) {}

    function recordPest(
        uint256 plantationId,
        string memory pestType,
        uint256 severity,
        string memory treatmentMethod
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        pestRecords[recordId] = PestRecord({
            recordId: recordId,
            plantationId: plantationId,
            pestType: pestType,
            severity: severity,
            detectionDate: block.timestamp,
            treatmentMethod: treatmentMethod,
            manager: msg.sender,
            treated: false
        });

        recordsByManager[msg.sender].push(recordId);

        emit PestDetected(recordId, msg.sender, pestType);
        return recordId;
    }

    function markAsTreated(uint256 recordId) public {
        require(pestRecords[recordId].manager == msg.sender, "Not the manager");
        pestRecords[recordId].treated = true;
        emit PestTreated(recordId, pestRecords[recordId].treatmentMethod);
    }

    function getRecord(uint256 recordId) public view returns (PestRecord memory) {
        return pestRecords[recordId];
    }
}



