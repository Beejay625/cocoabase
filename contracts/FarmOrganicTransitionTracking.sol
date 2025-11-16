// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmOrganicTransitionTracking
 * @dev Organic certification transition process tracking
 */
contract FarmOrganicTransitionTracking is Ownable {
    struct Transition {
        uint256 transitionId;
        address farmer;
        uint256 fieldId;
        uint256 startDate;
        uint256 targetDate;
        uint256 progress;
        bool completed;
    }

    mapping(uint256 => Transition) public transitions;
    mapping(address => uint256[]) public transitionsByFarmer;
    mapping(uint256 => uint256[]) public transitionsByField;
    uint256 private _transitionIdCounter;

    event TransitionStarted(
        uint256 indexed transitionId,
        address indexed farmer,
        uint256 fieldId
    );
    event ProgressUpdated(uint256 indexed transitionId, uint256 progress);
    event TransitionCompleted(uint256 indexed transitionId);

    constructor() Ownable(msg.sender) {}

    function startTransition(
        uint256 fieldId,
        uint256 targetDate
    ) public returns (uint256) {
        require(targetDate > block.timestamp, "Invalid target date");
        uint256 transitionId = _transitionIdCounter++;
        transitions[transitionId] = Transition({
            transitionId: transitionId,
            farmer: msg.sender,
            fieldId: fieldId,
            startDate: block.timestamp,
            targetDate: targetDate,
            progress: 0,
            completed: false
        });
        transitionsByFarmer[msg.sender].push(transitionId);
        transitionsByField[fieldId].push(transitionId);
        emit TransitionStarted(transitionId, msg.sender, fieldId);
        return transitionId;
    }

    function updateProgress(uint256 transitionId, uint256 progress) public {
        require(transitions[transitionId].farmer == msg.sender, "Not the owner");
        require(progress <= 100, "Invalid progress");
        transitions[transitionId].progress = progress;
        if (progress == 100) {
            transitions[transitionId].completed = true;
            emit TransitionCompleted(transitionId);
        }
        emit ProgressUpdated(transitionId, progress);
    }
}
