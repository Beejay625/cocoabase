// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkQualityStandards
 * @dev Onchain milk quality metrics and standards tracking
 */
contract FarmLivestockMilkQualityStandards is Ownable {
    struct QualityStandard {
        uint256 standardId;
        address farmer;
        string livestockId;
        uint256 fatContent;
        uint256 proteinContent;
        uint256 somaticCellCount;
        uint256 recordDate;
        string grade;
        bool meetsStandard;
    }

    mapping(uint256 => QualityStandard) public standards;
    mapping(address => uint256[]) public standardsByFarmer;
    uint256 private _standardIdCounter;

    event StandardRecorded(
        uint256 indexed standardId,
        address indexed farmer,
        string livestockId,
        string grade
    );

    constructor() Ownable(msg.sender) {}

    function recordStandard(
        string memory livestockId,
        uint256 fatContent,
        uint256 proteinContent,
        uint256 somaticCellCount,
        string memory grade
    ) public returns (uint256) {
        uint256 standardId = _standardIdCounter++;
        bool meetsStandard = somaticCellCount < 400000;

        standards[standardId] = QualityStandard({
            standardId: standardId,
            farmer: msg.sender,
            livestockId: livestockId,
            fatContent: fatContent,
            proteinContent: proteinContent,
            somaticCellCount: somaticCellCount,
            recordDate: block.timestamp,
            grade: grade,
            meetsStandard: meetsStandard
        });

        standardsByFarmer[msg.sender].push(standardId);
        emit StandardRecorded(standardId, msg.sender, livestockId, grade);
        return standardId;
    }

    function getStandard(uint256 standardId) public view returns (QualityStandard memory) {
        return standards[standardId];
    }
}

