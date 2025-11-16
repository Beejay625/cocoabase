// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMeatQualityGrading
 * @dev Onchain meat quality grading and certification
 */
contract FarmLivestockMeatQualityGrading is Ownable {
    struct MeatQualityGrade {
        uint256 gradeId;
        address farmer;
        string livestockId;
        string grade;
        uint256 marblingScore;
        string color;
        string texture;
        uint256 gradingDate;
        address grader;
    }

    mapping(uint256 => MeatQualityGrade) public grades;
    mapping(address => uint256[]) public gradesByFarmer;
    uint256 private _gradeIdCounter;

    event GradeAssigned(
        uint256 indexed gradeId,
        address indexed farmer,
        string livestockId,
        string grade
    );

    constructor() Ownable(msg.sender) {}

    function assignGrade(
        address farmer,
        string memory livestockId,
        string memory grade,
        uint256 marblingScore,
        string memory color,
        string memory texture
    ) public onlyOwner returns (uint256) {
        uint256 gradeId = _gradeIdCounter++;
        grades[gradeId] = MeatQualityGrade({
            gradeId: gradeId,
            farmer: farmer,
            livestockId: livestockId,
            grade: grade,
            marblingScore: marblingScore,
            color: color,
            texture: texture,
            gradingDate: block.timestamp,
            grader: msg.sender
        });

        gradesByFarmer[farmer].push(gradeId);
        emit GradeAssigned(gradeId, farmer, livestockId, grade);
        return gradeId;
    }

    function getGrade(uint256 gradeId) public view returns (MeatQualityGrade memory) {
        return grades[gradeId];
    }
}

