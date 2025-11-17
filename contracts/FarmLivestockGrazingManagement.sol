// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGrazingManagement
 * @dev Manage grazing schedules and pasture rotation
 */
contract FarmLivestockGrazingManagement is Ownable {
    struct GrazingSession {
        uint256 sessionId;
        address farmer;
        string pastureId;
        uint256 livestockCount;
        uint256 startDate;
        uint256 endDate;
        bool active;
    }

    mapping(uint256 => GrazingSession) public sessions;
    mapping(address => uint256[]) public sessionsByFarmer;
    uint256 private _sessionIdCounter;

    event SessionStarted(
        uint256 indexed sessionId,
        address indexed farmer,
        string pastureId
    );

    event SessionEnded(
        uint256 indexed sessionId,
        uint256 endDate
    );

    constructor() Ownable(msg.sender) {}

    function startSession(
        string memory pastureId,
        uint256 livestockCount,
        uint256 endDate
    ) public returns (uint256) {
        uint256 sessionId = _sessionIdCounter++;
        sessions[sessionId] = GrazingSession({
            sessionId: sessionId,
            farmer: msg.sender,
            pastureId: pastureId,
            livestockCount: livestockCount,
            startDate: block.timestamp,
            endDate: endDate,
            active: true
        });

        sessionsByFarmer[msg.sender].push(sessionId);
        emit SessionStarted(sessionId, msg.sender, pastureId);
        return sessionId;
    }

    function endSession(uint256 sessionId) public {
        require(sessions[sessionId].farmer == msg.sender, "Not authorized");
        sessions[sessionId].active = false;
        emit SessionEnded(sessionId, block.timestamp);
    }

    function getSession(uint256 sessionId) public view returns (GrazingSession memory) {
        return sessions[sessionId];
    }
}