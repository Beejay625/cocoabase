// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropWeedManagement
 * @dev Onchain weed management and control tracking
 */
contract FarmCropWeedManagement is Ownable {
    struct WeedRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        string weedType;
        uint256 severity;
        string controlMethod;
        uint256 recordDate;
        bool isControlled;
    }

    mapping(uint256 => WeedRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event WeedRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId,
        string weedType
    );

    constructor() Ownable(msg.sender) {}

    function recordWeed(
        string memory fieldId,
        string memory weedType,
        uint256 severity,
        string memory controlMethod
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = WeedRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            weedType: weedType,
            severity: severity,
            controlMethod: controlMethod,
            recordDate: block.timestamp,
            isControlled: false
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit WeedRecorded(recordId, msg.sender, fieldId, weedType);
        return recordId;
    }

    function markControlled(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].isControlled = true;
    }

    function getRecord(uint256 recordId) public view returns (WeedRecord memory) {
        return records[recordId];
    }
}

