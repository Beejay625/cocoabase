// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEducationPrograms
 * @dev Education and training programs tracking
 */
contract FarmEducationPrograms is Ownable {
    struct Program {
        uint256 programId;
        address organizer;
        string programName;
        uint256 startDate;
        uint256 endDate;
        uint256 enrollmentCount;
        bool active;
    }

    struct Enrollment {
        uint256 enrollmentId;
        uint256 programId;
        address participant;
        bool completed;
    }

    mapping(uint256 => Program) public programs;
    mapping(uint256 => Enrollment[]) public enrollmentsByProgram;
    mapping(address => uint256[]) public enrollmentsByParticipant;
    uint256 private _programIdCounter;
    uint256 private _enrollmentIdCounter;

    event ProgramCreated(
        uint256 indexed programId,
        address indexed organizer,
        string programName
    );

    event ParticipantEnrolled(
        uint256 indexed enrollmentId,
        uint256 indexed programId,
        address indexed participant
    );

    constructor() Ownable(msg.sender) {}

    function createProgram(
        string memory programName,
        uint256 startDate,
        uint256 endDate
    ) public returns (uint256) {
        uint256 programId = _programIdCounter++;
        programs[programId] = Program({
            programId: programId,
            organizer: msg.sender,
            programName: programName,
            startDate: startDate,
            endDate: endDate,
            enrollmentCount: 0,
            active: true
        });

        emit ProgramCreated(programId, msg.sender, programName);
        return programId;
    }

    function enrollInProgram(uint256 programId) public {
        require(programs[programId].active, "Program not active");
        uint256 enrollmentId = _enrollmentIdCounter++;
        enrollmentsByProgram[programId].push(Enrollment({
            enrollmentId: enrollmentId,
            programId: programId,
            participant: msg.sender,
            completed: false
        }));
        enrollmentsByParticipant[msg.sender].push(enrollmentId);
        programs[programId].enrollmentCount++;
        emit ParticipantEnrolled(enrollmentId, programId, msg.sender);
    }

    function getProgram(uint256 programId) public view returns (Program memory) {
        return programs[programId];
    }
}
