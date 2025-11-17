// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPestResistance
 * @dev Track crop pest resistance levels and effectiveness
 */
contract FarmCropPestResistance is Ownable {
    struct ResistanceRecord {
        uint256 recordId;
        address farmer;
        string cropType;
        string pestType;
        uint256 resistanceLevel;
        uint256 recordDate;
    }

    mapping(uint256 => ResistanceRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ResistanceRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string cropType
    );

    constructor() Ownable(msg.sender) {}

    function recordResistance(
        string memory cropType,
        string memory pestType,
        uint256 resistanceLevel
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ResistanceRecord({
            recordId: recordId,
            farmer: msg.sender,
            cropType: cropType,
            pestType: pestType,
            resistanceLevel: resistanceLevel,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ResistanceRecorded(recordId, msg.sender, cropType);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ResistanceRecord memory) {
        return records[recordId];
    }
}
