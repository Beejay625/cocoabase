// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStressMonitoringSystem
 * @dev Onchain crop stress levels monitoring system
 */
contract FarmCropStressMonitoringSystem is Ownable {
    struct StressRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string stressType;
        uint256 severity;
        uint256 detectionDate;
        string intervention;
        bool isResolved;
    }

    mapping(uint256 => StressRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event StressDetected(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string stressType,
        uint256 severity
    );

    constructor() Ownable(msg.sender) {}

    function recordStress(
        string memory fieldId,
        string memory stressType,
        uint256 severity,
        string memory intervention
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = StressRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            stressType: stressType,
            severity: severity,
            detectionDate: block.timestamp,
            intervention: intervention,
            isResolved: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit StressDetected(recordId, msg.sender, fieldId, stressType, severity);
        return recordId;
    }

    function resolveStress(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].isResolved = true;
    }

    function getRecord(uint256 recordId) public view returns (StressRecord memory) {
        return records[recordId];
    }
}

