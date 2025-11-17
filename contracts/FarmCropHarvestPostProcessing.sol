// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestPostProcessing
 * @dev Post-harvest processing tracking and quality control
 */
contract FarmCropHarvestPostProcessing is Ownable {
    struct ProcessingRecord {
        uint256 recordId;
        address farmer;
        string harvestId;
        string processingType;
        uint256 processingDate;
        bool qualityApproved;
    }

    mapping(uint256 => ProcessingRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ProcessingRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string processingType
    );

    constructor() Ownable(msg.sender) {}

    function recordProcessing(
        string memory harvestId,
        string memory processingType
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ProcessingRecord({
            recordId: recordId,
            farmer: msg.sender,
            harvestId: harvestId,
            processingType: processingType,
            processingDate: block.timestamp,
            qualityApproved: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ProcessingRecorded(recordId, msg.sender, processingType);
        return recordId;
    }

    function approveQuality(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not authorized");
        records[recordId].qualityApproved = true;
    }

    function getRecord(uint256 recordId) public view returns (ProcessingRecord memory) {
        return records[recordId];
    }
}