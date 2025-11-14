// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmIrrigationEfficiency
 * @dev Onchain irrigation efficiency tracking
 */
contract FarmIrrigationEfficiency is Ownable {
    struct IrrigationRecord {
        uint256 recordId;
        address farmer;
        string location;
        uint256 timestamp;
        uint256 waterUsed;
        uint256 areaIrrigated;
        uint256 efficiency;
        string irrigationMethod;
        string cropType;
        uint256 cropYield;
    }

    mapping(uint256 => IrrigationRecord) public irrigationRecords;
    mapping(address => uint256[]) public recordsByFarmer;
    mapping(string => uint256[]) public recordsByLocation;
    uint256 private _recordIdCounter;

    event IrrigationRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string location,
        uint256 waterUsed,
        uint256 efficiency
    );

    constructor() Ownable(msg.sender) {}

    function recordIrrigation(
        string memory location,
        uint256 waterUsed,
        uint256 areaIrrigated,
        string memory irrigationMethod,
        string memory cropType,
        uint256 cropYield
    ) public returns (uint256) {
        require(waterUsed > 0, "Water used must be greater than 0");
        require(areaIrrigated > 0, "Area irrigated must be greater than 0");

        uint256 efficiency = (areaIrrigated * 100) / waterUsed;

        uint256 recordId = _recordIdCounter++;
        irrigationRecords[recordId] = IrrigationRecord({
            recordId: recordId,
            farmer: msg.sender,
            location: location,
            timestamp: block.timestamp,
            waterUsed: waterUsed,
            areaIrrigated: areaIrrigated,
            efficiency: efficiency,
            irrigationMethod: irrigationMethod,
            cropType: cropType,
            cropYield: cropYield
        });

        recordsByFarmer[msg.sender].push(recordId);
        recordsByLocation[location].push(recordId);

        emit IrrigationRecorded(recordId, msg.sender, location, waterUsed, efficiency);
        return recordId;
    }

    function getIrrigationRecord(uint256 recordId) public view returns (IrrigationRecord memory) {
        return irrigationRecords[recordId];
    }

    function getRecordsByFarmer(address farmer) public view returns (uint256[] memory) {
        return recordsByFarmer[farmer];
    }

    function getRecordsByLocation(string memory location) public view returns (uint256[] memory) {
        return recordsByLocation[location];
    }
}

