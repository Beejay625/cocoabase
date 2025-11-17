// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockQuarantineManagement
 * @dev Onchain quarantine management and health isolation
 */
contract FarmLivestockQuarantineManagement is Ownable {
    struct QuarantineRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 quarantineStartDate;
        uint256 quarantineEndDate;
        string reason;
        string status;
        bool isReleased;
    }

    mapping(uint256 => QuarantineRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event QuarantineRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string reason
    );

    constructor() Ownable(msg.sender) {}

    function recordQuarantine(
        string memory livestockId,
        uint256 quarantineStartDate,
        uint256 quarantineDuration,
        string memory reason
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = QuarantineRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            quarantineStartDate: quarantineStartDate,
            quarantineEndDate: quarantineStartDate + quarantineDuration,
            reason: reason,
            status: "Active",
            isReleased: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit QuarantineRecorded(recordId, msg.sender, livestockId, reason);
        return recordId;
    }

    function releaseFromQuarantine(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].isReleased = true;
        records[recordId].status = "Released";
    }

    function getRecord(uint256 recordId) public view returns (QuarantineRecord memory) {
        return records[recordId];
    }
}
