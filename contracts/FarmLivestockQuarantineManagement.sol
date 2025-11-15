// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockQuarantineManagement
 * @dev Onchain quarantine management and health isolation tracking
 */
contract FarmLivestockQuarantineManagement is Ownable {
    struct QuarantineRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string reason;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        address veterinarian;
    }

    mapping(uint256 => QuarantineRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event QuarantineStarted(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId
    );

    constructor() Ownable(msg.sender) {}

    function startQuarantine(
        string memory livestockId,
        string memory reason,
        uint256 duration,
        address veterinarian
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = QuarantineRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            reason: reason,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true,
            veterinarian: veterinarian
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit QuarantineStarted(recordId, msg.sender, livestockId);
        return recordId;
    }

    function endQuarantine(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].isActive = false;
    }

    function getRecord(uint256 recordId) public view returns (QuarantineRecord memory) {
        return records[recordId];
    }
}

