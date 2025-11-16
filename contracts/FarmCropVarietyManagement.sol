// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropVarietyManagement
 * @dev Onchain crop variety management and performance tracking
 */
contract FarmCropVarietyManagement is Ownable {
    struct VarietyRecord {
        uint256 recordId;
        address farmer;
        string varietyName;
        string fieldId;
        uint256 plantingDate;
        uint256 expectedYield;
        uint256 actualYield;
        uint256 performanceScore;
        string characteristics;
    }

    mapping(uint256 => VarietyRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event VarietyRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string varietyName,
        string fieldId
    );

    constructor() Ownable(msg.sender) {}

    function recordVariety(
        string memory varietyName,
        string memory fieldId,
        uint256 plantingDate,
        uint256 expectedYield,
        string memory characteristics
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = VarietyRecord({
            recordId: recordId,
            farmer: msg.sender,
            varietyName: varietyName,
            fieldId: fieldId,
            plantingDate: plantingDate,
            expectedYield: expectedYield,
            actualYield: 0,
            performanceScore: 0,
            characteristics: characteristics
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit VarietyRecorded(recordId, msg.sender, varietyName, fieldId);
        return recordId;
    }

    function updateYield(uint256 recordId, uint256 actualYield) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].actualYield = actualYield;
        records[recordId].performanceScore = (actualYield * 100) / records[recordId].expectedYield;
    }

    function getRecord(uint256 recordId) public view returns (VarietyRecord memory) {
        return records[recordId];
    }
}

