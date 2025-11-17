// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockIdentificationSystem
 * @dev Onchain identification tag management system
 */
contract FarmLivestockIdentificationSystem is Ownable {
    struct IdentificationRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string tagNumber;
        string tagType;
        uint256 registrationDate;
        bool isActive;
    }

    mapping(uint256 => IdentificationRecord) public records;
    mapping(string => uint256) public recordsByTagNumber;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event IdentificationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string tagNumber
    );

    constructor() Ownable(msg.sender) {}

    function registerIdentification(
        string memory livestockId,
        string memory tagNumber,
        string memory tagType
    ) public returns (uint256) {
        require(recordsByTagNumber[tagNumber] == 0, "Tag already registered");
        uint256 recordId = _recordIdCounter++;
        records[recordId] = IdentificationRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            tagNumber: tagNumber,
            tagType: tagType,
            registrationDate: block.timestamp,
            isActive: true
        });

        recordsByTagNumber[tagNumber] = recordId;
        recordsByFarmer[msg.sender].push(recordId);
        emit IdentificationRecorded(recordId, msg.sender, livestockId, tagNumber);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (IdentificationRecord memory) {
        return records[recordId];
    }
}

