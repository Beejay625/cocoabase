// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWasteManagement
 * @dev Onchain waste management and disposal tracking
 */
contract FarmLivestockWasteManagement is Ownable {
    struct WasteRecord {
        uint256 recordId;
        address farmer;
        string wasteType;
        uint256 quantity;
        string disposalMethod;
        uint256 disposalDate;
        string complianceStatus;
    }

    mapping(uint256 => WasteRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event WasteRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string wasteType,
        string disposalMethod
    );

    constructor() Ownable(msg.sender) {}

    function recordWaste(
        string memory wasteType,
        uint256 quantity,
        string memory disposalMethod,
        string memory complianceStatus
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = WasteRecord({
            recordId: recordId,
            farmer: msg.sender,
            wasteType: wasteType,
            quantity: quantity,
            disposalMethod: disposalMethod,
            disposalDate: block.timestamp,
            complianceStatus: complianceStatus
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit WasteRecorded(recordId, msg.sender, wasteType, disposalMethod);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (WasteRecord memory) {
        return records[recordId];
    }
}
