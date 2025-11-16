// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockBreedingProgram
 * @dev Manage breeding programs and genetic improvement
 */
contract FarmLivestockBreedingProgram is Ownable {
    struct BreedingProgram {
        uint256 programId;
        address farmer;
        string livestockType;
        string breedingGoal;
        uint256 startDate;
        uint256 targetDate;
        uint256 progressPercentage;
        bool active;
    }

    mapping(uint256 => BreedingProgram) public programs;
    mapping(address => uint256[]) public programsByFarmer;
    uint256 private _programIdCounter;

    event ProgramCreated(
        uint256 indexed programId,
        address indexed farmer,
        string breedingGoal
    );

    event ProgressUpdated(
        uint256 indexed programId,
        uint256 progressPercentage
    );

    constructor() Ownable(msg.sender) {}

    function createProgram(
        string memory livestockType,
        string memory breedingGoal,
        uint256 targetDate
    ) public returns (uint256) {
        uint256 programId = _programIdCounter++;
        programs[programId] = BreedingProgram({
            programId: programId,
            farmer: msg.sender,
            livestockType: livestockType,
            breedingGoal: breedingGoal,
            startDate: block.timestamp,
            targetDate: targetDate,
            progressPercentage: 0,
            active: true
        });

        programsByFarmer[msg.sender].push(programId);
        emit ProgramCreated(programId, msg.sender, breedingGoal);
        return programId;
    }

    function updateProgress(uint256 programId, uint256 progressPercentage) public {
        require(programs[programId].farmer == msg.sender, "Not authorized");
        require(progressPercentage <= 100, "Invalid percentage");
        programs[programId].progressPercentage = progressPercentage;
        emit ProgressUpdated(programId, progressPercentage);
    }

    function getProgram(uint256 programId) public view returns (BreedingProgram memory) {
        return programs[programId];
    }
}
