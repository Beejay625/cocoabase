// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentFuelTracking
 * @dev Track equipment fuel consumption and efficiency
 */
contract FarmEquipmentFuelTracking is Ownable {
    struct FuelRecord {
        uint256 recordId;
        address farmer;
        string equipmentId;
        uint256 fuelAmount;
        uint256 hoursOperated;
        uint256 fuelEfficiency;
        uint256 recordDate;
    }

    mapping(uint256 => FuelRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event FuelRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 fuelAmount
    );

    constructor() Ownable(msg.sender) {}

    function recordFuel(
        string memory equipmentId,
        uint256 fuelAmount,
        uint256 hoursOperated
    ) public returns (uint256) {
        require(hoursOperated > 0, "Invalid hours");
        uint256 fuelEfficiency = (fuelAmount * 10000) / hoursOperated;
        uint256 recordId = _recordIdCounter++;
        records[recordId] = FuelRecord({
            recordId: recordId,
            farmer: msg.sender,
            equipmentId: equipmentId,
            fuelAmount: fuelAmount,
            hoursOperated: hoursOperated,
            fuelEfficiency: fuelEfficiency,
            recordDate: block.timestamp
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit FuelRecorded(recordId, msg.sender, fuelAmount);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (FuelRecord memory) {
        return records[recordId];
    }
}
