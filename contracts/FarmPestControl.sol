// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPestControl
 * @dev Onchain pest control management
 */
contract FarmPestControl is Ownable {
    struct PestControlRecord {
        uint256 recordId;
        address farmer;
        uint256 cropId;
        string pestType;
        string controlMethod;
        uint256 treatmentDate;
        uint256 effectiveness;
        string notes;
        bool isEffective;
    }

    mapping(uint256 => PestControlRecord) public pestControlRecords;
    mapping(address => uint256[]) public recordsByFarmer;
    mapping(uint256 => uint256[]) public recordsByCrop;
    uint256 private _recordIdCounter;

    event PestControlRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 indexed cropId,
        string pestType,
        string controlMethod
    );

    constructor() Ownable(msg.sender) {}

    function recordPestControl(
        uint256 cropId,
        string memory pestType,
        string memory controlMethod,
        uint256 treatmentDate,
        uint256 effectiveness,
        string memory notes
    ) public returns (uint256) {
        require(effectiveness >= 0 && effectiveness <= 100, "Invalid effectiveness");
        require(treatmentDate <= block.timestamp, "Invalid treatment date");

        uint256 recordId = _recordIdCounter++;
        pestControlRecords[recordId] = PestControlRecord({
            recordId: recordId,
            farmer: msg.sender,
            cropId: cropId,
            pestType: pestType,
            controlMethod: controlMethod,
            treatmentDate: treatmentDate,
            effectiveness: effectiveness,
            notes: notes,
            isEffective: effectiveness >= 70
        });

        recordsByFarmer[msg.sender].push(recordId);
        recordsByCrop[cropId].push(recordId);

        emit PestControlRecorded(recordId, msg.sender, cropId, pestType, controlMethod);
        return recordId;
    }

    function updateEffectiveness(uint256 recordId, uint256 effectiveness) public {
        require(pestControlRecords[recordId].farmer == msg.sender, "Not the farmer");
        require(effectiveness >= 0 && effectiveness <= 100, "Invalid effectiveness");

        pestControlRecords[recordId].effectiveness = effectiveness;
        pestControlRecords[recordId].isEffective = effectiveness >= 70;
    }

    function getPestControlRecord(uint256 recordId) public view returns (PestControlRecord memory) {
        return pestControlRecords[recordId];
    }

    function getRecordsByFarmer(address farmer) public view returns (uint256[] memory) {
        return recordsByFarmer[farmer];
    }

    function getRecordsByCrop(uint256 cropId) public view returns (uint256[] memory) {
        return recordsByCrop[cropId];
    }
}

