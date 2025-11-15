// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockSlaughter
 * @dev Onchain system for tracking livestock slaughter records
 */
contract FarmLivestockSlaughter is Ownable {
    struct SlaughterRecord {
        uint256 recordId;
        uint256 livestockId;
        uint256 slaughterDate;
        string method;
        address recorder;
        bool certified;
    }

    mapping(uint256 => SlaughterRecord) public slaughterRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event SlaughterRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        uint256 livestockId
    );

    constructor() Ownable(msg.sender) {}

    function recordSlaughter(
        uint256 livestockId,
        string memory method
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        slaughterRecords[recordId] = SlaughterRecord({
            recordId: recordId,
            livestockId: livestockId,
            slaughterDate: block.timestamp,
            method: method,
            recorder: msg.sender,
            certified: false
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit SlaughterRecorded(recordId, msg.sender, livestockId);
        return recordId;
    }

    function certifySlaughter(uint256 recordId) public onlyOwner {
        slaughterRecords[recordId].certified = true;
    }

    function getRecord(uint256 recordId) public view returns (SlaughterRecord memory) {
        return slaughterRecords[recordId];
    }
}



