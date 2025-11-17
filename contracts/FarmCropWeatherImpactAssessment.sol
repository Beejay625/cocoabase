// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropWeatherImpactAssessment
 * @dev Onchain weather impact assessment on crops
 */
contract FarmCropWeatherImpactAssessment is Ownable {
    struct ImpactRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string weatherEvent;
        uint256 impactDate;
        uint256 severity;
        string cropDamage;
        string mitigation;
    }

    mapping(uint256 => ImpactRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ImpactRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string weatherEvent
    );

    constructor() Ownable(msg.sender) {}

    function recordImpact(
        string memory fieldId,
        string memory weatherEvent,
        uint256 impactDate,
        uint256 severity,
        string memory cropDamage,
        string memory mitigation
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ImpactRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            weatherEvent: weatherEvent,
            impactDate: impactDate,
            severity: severity,
            cropDamage: cropDamage,
            mitigation: mitigation
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ImpactRecorded(recordId, msg.sender, fieldId, weatherEvent);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (ImpactRecord memory) {
        return records[recordId];
    }
}

