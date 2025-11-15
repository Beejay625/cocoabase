// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockSlaughterRecords
 * @dev Onchain slaughter records and processing documentation
 */
contract FarmLivestockSlaughterRecords is Ownable {
    struct SlaughterRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 slaughterDate;
        string processingFacility;
        string certification;
        uint256 weight;
        bool isCertified;
    }

    mapping(uint256 => SlaughterRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event SlaughterRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string processingFacility
    );

    constructor() Ownable(msg.sender) {}

    function recordSlaughter(
        string memory livestockId,
        uint256 slaughterDate,
        string memory processingFacility,
        string memory certification,
        uint256 weight
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = SlaughterRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            slaughterDate: slaughterDate,
            processingFacility: processingFacility,
            certification: certification,
            weight: weight,
            isCertified: bytes(certification).length > 0
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit SlaughterRecorded(recordId, msg.sender, livestockId, processingFacility);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (SlaughterRecord memory) {
        return records[recordId];
    }
}

