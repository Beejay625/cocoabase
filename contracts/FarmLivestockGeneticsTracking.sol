// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticsTracking
 * @dev Onchain genetics and lineage tracking
 */
contract FarmLivestockGeneticsTracking is Ownable {
    struct GeneticsRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        string sireId;
        string damId;
        string breed;
        string geneticMarkers;
        uint256 recordDate;
    }

    mapping(uint256 => GeneticsRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event GeneticsRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string breed
    );

    constructor() Ownable(msg.sender) {}

    function recordGenetics(
        string memory livestockId,
        string memory sireId,
        string memory damId,
        string memory breed,
        string memory geneticMarkers
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = GeneticsRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            sireId: sireId,
            damId: damId,
            breed: breed,
            geneticMarkers: geneticMarkers,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit GeneticsRecorded(recordId, msg.sender, livestockId, breed);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (GeneticsRecord memory) {
        return records[recordId];
    }
}
