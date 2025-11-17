// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockBreedingProgram
 * @dev Breeding program management system
 */
contract FarmLivestockBreedingProgram is Ownable {
    struct Program {
        uint256 programId;
        address breeder;
        string programName;
        uint256 sireId;
        uint256 damId;
        bool active;
    }

    mapping(uint256 => Program) public programs;
    mapping(address => uint256[]) public programsByBreeder;
    uint256 private _programIdCounter;

    event ProgramCreated(uint256 indexed programId, string programName);
    event ProgramCompleted(uint256 indexed programId);

    constructor() Ownable(msg.sender) {}

    function createProgram(
        string memory programName,
        uint256 sireId,
        uint256 damId
    ) public returns (uint256) {
        uint256 programId = _programIdCounter++;
        programs[programId] = Program({
            programId: programId,
            breeder: msg.sender,
            programName: programName,
            sireId: sireId,
            damId: damId,
            active: true
        });
        programsByBreeder[msg.sender].push(programId);
        emit ProgramCreated(programId, programName);
        return programId;
    }

    function completeProgram(uint256 programId) public {
        require(programs[programId].breeder == msg.sender, "Not the breeder");
        programs[programId].active = false;
        emit ProgramCompleted(programId);
    }
}
