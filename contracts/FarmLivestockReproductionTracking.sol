// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockReproductionTracking
 * @dev Onchain livestock reproduction cycle tracking
 */
contract FarmLivestockReproductionTracking is Ownable {
    struct ReproductionRecord {
        uint256 recordId;
        address farmer;
        string livestockId;
        uint256 breedingDate;
        uint256 expectedCalvingDate;
        uint256 actualCalvingDate;
        string status;
    }

    mapping(uint256 => ReproductionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event ReproductionRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string livestockId,
        string status
    );

    constructor() Ownable(msg.sender) {}

    function recordReproduction(
        string memory livestockId,
        uint256 breedingDate,
        uint256 expectedCalvingDate,
        string memory status
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        records[recordId] = ReproductionRecord({
            recordId: recordId,
            farmer: msg.sender,
            livestockId: livestockId,
            breedingDate: breedingDate,
            expectedCalvingDate: expectedCalvingDate,
            actualCalvingDate: 0,
            status: status
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit ReproductionRecorded(recordId, msg.sender, livestockId, status);
        return recordId;
    }

    function recordCalving(uint256 recordId, uint256 calvingDate) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        records[recordId].actualCalvingDate = calvingDate;
        records[recordId].status = "Completed";
    }

    function getRecord(uint256 recordId) public view returns (ReproductionRecord memory) {
        return records[recordId];
    }
}
