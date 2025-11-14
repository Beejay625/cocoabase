// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockIdentification
 * @dev Onchain system for tracking livestock identification tags
 */
contract FarmLivestockIdentification is Ownable {
    struct IdentificationRecord {
        uint256 recordId;
        uint256 livestockId;
        string tagNumber;
        string identificationType;
        uint256 identificationDate;
        address identifier;
    }

    mapping(uint256 => IdentificationRecord) public identificationRecords;
    mapping(address => uint256[]) public recordsByIdentifier;
    uint256 private _recordIdCounter;

    event LivestockIdentified(
        uint256 indexed recordId,
        address indexed identifier,
        string tagNumber
    );

    constructor() Ownable(msg.sender) {}

    function recordIdentification(
        uint256 livestockId,
        string memory tagNumber,
        string memory identificationType
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        identificationRecords[recordId] = IdentificationRecord({
            recordId: recordId,
            livestockId: livestockId,
            tagNumber: tagNumber,
            identificationType: identificationType,
            identificationDate: block.timestamp,
            identifier: msg.sender
        });

        recordsByIdentifier[msg.sender].push(recordId);

        emit LivestockIdentified(recordId, msg.sender, tagNumber);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (IdentificationRecord memory) {
        return identificationRecords[recordId];
    }
}

