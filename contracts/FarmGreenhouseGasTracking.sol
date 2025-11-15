// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmGreenhouseGasTracking
 * @dev Onchain system for tracking greenhouse gas emissions from farm operations
 */
contract FarmGreenhouseGasTracking is Ownable {
    struct GHGRecord {
        uint256 recordId;
        uint256 facilityId;
        uint256 co2Equivalent;
        string emissionSource;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => GHGRecord) public ghgRecords;
    mapping(address => uint256[]) public recordsByRecorder;
    uint256 private _recordIdCounter;

    event GHGRecorded(
        uint256 indexed recordId,
        address indexed recorder,
        uint256 co2Equivalent
    );

    constructor() Ownable(msg.sender) {}

    function recordGHG(
        uint256 facilityId,
        uint256 co2Equivalent,
        string memory emissionSource,
        uint256 recordDate
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        ghgRecords[recordId] = GHGRecord({
            recordId: recordId,
            facilityId: facilityId,
            co2Equivalent: co2Equivalent,
            emissionSource: emissionSource,
            recordDate: recordDate,
            recorder: msg.sender
        });

        recordsByRecorder[msg.sender].push(recordId);

        emit GHGRecorded(recordId, msg.sender, co2Equivalent);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (GHGRecord memory) {
        return ghgRecords[recordId];
    }
}

