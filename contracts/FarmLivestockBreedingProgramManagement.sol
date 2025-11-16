// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockBreedingProgramManagement
 * @dev Onchain breeding program management and genetic improvement tracking
 */
contract FarmLivestockBreedingProgramManagement is Ownable {
    struct BreedingProgram {
        uint256 programId;
        address farmer;
        string programName;
        string objective;
        uint256 startDate;
        uint256 targetDate;
        string selectionCriteria;
        bool isActive;
    }

    mapping(uint256 => BreedingProgram) public programs;
    mapping(address => uint256[]) public programsByFarmer;
    uint256 private _programIdCounter;

    event ProgramCreated(
        uint256 indexed programId,
        address indexed farmer,
        string programName
    );

    constructor() Ownable(msg.sender) {}

    function createProgram(
        string memory programName,
        string memory objective,
        uint256 targetDate,
        string memory selectionCriteria
    ) public returns (uint256) {
        uint256 programId = _programIdCounter++;
        programs[programId] = BreedingProgram({
            programId: programId,
            farmer: msg.sender,
            programName: programName,
            objective: objective,
            startDate: block.timestamp,
            targetDate: targetDate,
            selectionCriteria: selectionCriteria,
            isActive: true
        });

        programsByFarmer[msg.sender].push(programId);
        emit ProgramCreated(programId, msg.sender, programName);
        return programId;
    }

    function getProgram(uint256 programId) public view returns (BreedingProgram memory) {
        return programs[programId];
    }
}

