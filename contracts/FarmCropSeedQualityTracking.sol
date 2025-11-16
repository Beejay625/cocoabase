// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropSeedQualityTracking
 * @dev Onchain seed quality verification tracking
 */
contract FarmCropSeedQualityTracking is Ownable {
    struct QualityRecord {
        uint256 recordId;
        address farmer;
        string seedBatchId;
        uint256 germinationRate;
        uint256 purity;
        uint256 recordDate;
        string certification;
        bool isCertified;
    }

    mapping(uint256 => QualityRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event QualityRecorded(
        uint256 indexed recordId,
        address indexed farmer,
        string seedBatchId,
        bool isCertified
    );

    constructor() Ownable(msg.sender) {}

    function recordQuality(
        string memory seedBatchId,
        uint256 germinationRate,
        uint256 purity,
        string memory certification
    ) public returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        bool isCertified = germinationRate >= 80 && purity >= 95;

        records[recordId] = QualityRecord({
            recordId: recordId,
            farmer: msg.sender,
            seedBatchId: seedBatchId,
            germinationRate: germinationRate,
            purity: purity,
            recordDate: block.timestamp,
            certification: certification,
            isCertified: isCertified
        });

        recordsByFarmer[msg.sender].push(recordId);
        emit QualityRecorded(recordId, msg.sender, seedBatchId, isCertified);
        return recordId;
    }

    function getRecord(uint256 recordId) public view returns (QualityRecord memory) {
        return records[recordId];
    }
}
