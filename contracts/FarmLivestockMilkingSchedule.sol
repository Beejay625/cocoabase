// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkingSchedule
 * @dev Milking schedule and production tracking
 */
contract FarmLivestockMilkingSchedule is Ownable {
    struct MilkingRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 milkVolume;
        uint256 scheduledTime;
        uint256 actualTime;
        bool completed;
    }

    mapping(uint256 => MilkingRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event RecordScheduled(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 scheduledTime
    );

    event MilkingCompleted(
        uint256 indexed recordId,
        uint256 milkVolume
    );

    constructor() Ownable(msg.sender) {}

    function scheduleMilking(
        string memory livestockId,
        uint256 milkVolume,
        uint256 scheduledTime
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = MilkingRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            milkVolume: milkVolume,
            scheduledTime: scheduledTime,
            actualTime: 0,
            completed: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit RecordScheduled(recordId, msg.sender, scheduledTime);
        return recordId;
    }

    function completeMilking(uint256 recordId, uint256 actualVolume) public {
        require(records[recordId].farmer == msg.sender, "Not authorized");
        records[recordId].completed = true;
        records[recordId].actualTime = block.timestamp;
        records[recordId].milkVolume = actualVolume;
        emit MilkingCompleted(recordId, actualVolume);
    }

    function getRecord(uint256 recordId) public view returns (MilkingRecord memory) {
        return records[recordId];
    }
}
