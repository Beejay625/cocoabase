// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmOrganicTransitionTracking
 * @dev Onchain tracking of organic certification transition process
 */
contract FarmOrganicTransitionTracking is Ownable {
    struct TransitionRecord {
        uint256 recordId;
        address farmer;
        string fieldId;
        uint256 startDate;
        uint256 targetDate;
        uint256 currentPhase;
        string complianceStatus;
        bool isComplete;
    }

    mapping(uint256 => TransitionRecord) public records;
    mapping(address => uint256[]) public recordsByFarmer;
    uint256 private _recordIdCounter;

    event TransitionStarted(
        uint256 indexed recordId,
        address indexed farmer,
        string fieldId
    );

    event PhaseCompleted(
        uint256 indexed recordId,
        uint256 phase
    );

    event TransitionCompleted(
        uint256 indexed recordId,
        address indexed farmer
    );

    constructor() Ownable(msg.sender) {}

    function startTransition(
        string memory fieldId,
        uint256 transitionPeriod
    ) public returns (uint256) {
        require(bytes(fieldId).length > 0, "Field ID required");
        require(transitionPeriod > 0, "Transition period required");

        uint256 recordId = _recordIdCounter++;
        records[recordId] = TransitionRecord({
            recordId: recordId,
            farmer: msg.sender,
            fieldId: fieldId,
            startDate: block.timestamp,
            targetDate: block.timestamp + transitionPeriod,
            currentPhase: 1,
            complianceStatus: "In Progress",
            isComplete: false
        });

        recordsByFarmer[msg.sender].push(recordId);

        emit TransitionStarted(recordId, msg.sender, fieldId);
        return recordId;
    }

    function completePhase(uint256 recordId) public {
        require(records[recordId].farmer == msg.sender, "Not record owner");
        require(!records[recordId].isComplete, "Transition already complete");

        records[recordId].currentPhase++;
        emit PhaseCompleted(recordId, records[recordId].currentPhase);
    }

    function completeTransition(uint256 recordId) public onlyOwner {
        require(!records[recordId].isComplete, "Already complete");
        records[recordId].isComplete = true;
        records[recordId].complianceStatus = "Certified Organic";

        emit TransitionCompleted(recordId, records[recordId].farmer);
    }

    function getRecord(uint256 recordId) public view returns (TransitionRecord memory) {
        return records[recordId];
    }
}

