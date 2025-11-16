// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRegenerativePracticesTracking
 * @dev Onchain regenerative agriculture practices tracking
 */
contract FarmRegenerativePracticesTracking is Ownable {
    struct PracticeRecord {
        uint256 recordId;
        address farmer;
        string practiceType;
        string fieldId;
        uint256 implementationDate;
        string description;
        uint256 impactScore;
        bool isVerified;
    }

    mapping(uint256 => PracticeRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event PracticeRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string practiceType
    );

    constructor() Ownable(msg.sender) {}

    function recordPractice(
        string memory practiceType,
        string memory fieldId,
        string memory description,
        uint256 impactScore
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = PracticeRecord({
            recordId: recordId,
            farmer: msg.sender,
            practiceType: practiceType,
            fieldId: fieldId,
            implementationDate: block.timestamp,
            description: description,
            impactScore: impactScore,
            isVerified: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit PracticeRecorded(recordId, msg.sender, practiceType);
        return recordId;
    }

    function verifyPractice(uint256 recordId) public onlyOwner {
        records[recordId].isVerified = true;
    }

    function getRecord(uint256 recordId) public view returns (PracticeRecord memory) {
        return records[recordId];
    }
}

