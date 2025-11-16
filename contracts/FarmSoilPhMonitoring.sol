// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilPhMonitoring
 * @dev Continuous soil pH monitoring and alerts
 */
contract FarmSoilPhMonitoring is Ownable {
    struct PhRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 phLevel;
        uint256 optimalPh;
        uint256 deviation;
        uint256 recordDate;
    }

    mapping(uint256 => PhRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event PhRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 phLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordPh(
        string memory fieldId,
        uint256 phLevel,
        uint256 optimalPh
    ) public returns (uint256) {
        uint256 deviation = phLevel > optimalPh ? phLevel - optimalPh : optimalPh - phLevel;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = PhRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            phLevel: phLevel,
            optimalPh: optimalPh,
            deviation: deviation,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit PhRecorded(recordId, msg.sender, phLevel);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (PhRecord memory) {
        return records[recordId];
    }
}
