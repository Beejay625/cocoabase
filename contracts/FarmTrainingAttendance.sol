// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmTrainingAttendance
 * @dev Track farmer training attendance, outcomes, and certification progress
 */
contract FarmTrainingAttendance is Ownable {
    struct TrainingSession {
        uint256 sessionId;
        string topic;
        string location;
        uint256 date;
        string metadata;
    }

    struct AttendanceRecord {
        uint256 sessionId;
        address farmer;
        bool attended;
        bool passedAssessment;
        uint256 timestamp;
    }

    mapping(uint256 => TrainingSession) public sessions;
    mapping(uint256 => AttendanceRecord[]) public attendanceBySession;
    uint256 private _sessionIdCounter;

    event TrainingSessionCreated(
        uint256 indexed sessionId,
        string topic,
        string location
    );

    event AttendanceRecorded(
        uint256 indexed sessionId,
        address indexed farmer,
        bool attended,
        bool passedAssessment
    );

    constructor() Ownable(msg.sender) {}

    function createTrainingSession(
        string memory topic,
        string memory location,
        uint256 date,
        string memory metadata
    ) public onlyOwner returns (uint256) {
        uint256 sessionId = _sessionIdCounter++;
        sessions[sessionId] = TrainingSession({
            sessionId: sessionId,
            topic: topic,
            location: location,
            date: date,
            metadata: metadata
        });

        emit TrainingSessionCreated(sessionId, topic, location);
        return sessionId;
    }

    function recordAttendance(
        uint256 sessionId,
        bool attended,
        bool passedAssessment
    ) public {
        attendanceBySession[sessionId].push(
            AttendanceRecord({
                sessionId: sessionId,
                farmer: msg.sender,
                attended: attended,
                passedAssessment: passedAssessment,
                timestamp: block.timestamp
            })
        );

        emit AttendanceRecorded(sessionId, msg.sender, attended, passedAssessment);
    }
}


