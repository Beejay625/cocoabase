// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmHarvestQuality
 * @dev Onchain harvest quality grading
 */
contract FarmHarvestQuality is Ownable {
    struct QualityGrade {
        uint256 gradeId;
        address farmer;
        uint256 harvestId;
        string grade;
        uint256 score;
        string characteristics;
        uint256 timestamp;
        string inspector;
        bool isCertified;
    }

    mapping(uint256 => QualityGrade) public qualityGrades;
    mapping(address => uint256[]) public gradesByFarmer;
    mapping(uint256 => uint256[]) public gradesByHarvest;
    uint256 private _gradeIdCounter;

    event QualityGraded(
        uint256 indexed gradeId,
        address indexed farmer,
        uint256 indexed harvestId,
        string grade,
        uint256 score
    );

    constructor() Ownable(msg.sender) {}

    function gradeHarvest(
        uint256 harvestId,
        string memory grade,
        uint256 score,
        string memory characteristics,
        string memory inspector,
        bool isCertified
    ) public returns (uint256) {
        require(score >= 0 && score <= 100, "Invalid score");
        require(bytes(grade).length > 0, "Grade cannot be empty");

        uint256 gradeId = _gradeIdCounter++;
        qualityGrades[gradeId] = QualityGrade({
            gradeId: gradeId,
            farmer: msg.sender,
            harvestId: harvestId,
            grade: grade,
            score: score,
            characteristics: characteristics,
            timestamp: block.timestamp,
            inspector: inspector,
            isCertified: isCertified
        });

        gradesByFarmer[msg.sender].push(gradeId);
        gradesByHarvest[harvestId].push(gradeId);

        emit QualityGraded(gradeId, msg.sender, harvestId, grade, score);
        return gradeId;
    }

    function updateGrade(
        uint256 gradeId,
        uint256 score,
        string memory characteristics
    ) public {
        require(qualityGrades[gradeId].farmer == msg.sender, "Not the farmer");
        require(score >= 0 && score <= 100, "Invalid score");

        qualityGrades[gradeId].score = score;
        qualityGrades[gradeId].characteristics = characteristics;
    }

    function getQualityGrade(uint256 gradeId) public view returns (QualityGrade memory) {
        return qualityGrades[gradeId];
    }

    function getGradesByFarmer(address farmer) public view returns (uint256[] memory) {
        return gradesByFarmer[farmer];
    }

    function getGradesByHarvest(uint256 harvestId) public view returns (uint256[] memory) {
        return gradesByHarvest[harvestId];
    }
}

