// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockBehaviorMonitoring
 * @dev Monitor livestock behavior patterns
 */
contract FarmLivestockBehaviorMonitoring is Ownable {
    struct BehaviorObservation {
        uint256 observationId;
        uint256 livestockId;
        string behaviorType;
        uint256 duration;
        uint256 frequency;
        uint256 observationDate;
        address observer;
    }

    struct BehaviorPattern {
        uint256 livestockId;
        string[] commonBehaviors;
        uint256 averageActivity;
        uint256 lastObservation;
    }

    mapping(uint256 => BehaviorObservation) public behaviorObservations;
    mapping(uint256 => BehaviorPattern) public behaviorPatterns;
    mapping(address => uint256[]) public observationsByOwner;
    uint256 private _observationIdCounter;

    event BehaviorObserved(
        uint256 indexed observationId,
        address indexed owner,
        uint256 livestockId,
        string behaviorType
    );

    event AbnormalBehaviorDetected(
        uint256 indexed livestockId,
        string behaviorType
    );

    constructor() Ownable(msg.sender) {}

    function recordBehaviorObservation(
        uint256 livestockId,
        string memory behaviorType,
        uint256 duration,
        uint256 frequency
    ) public returns (uint256) {
        uint256 observationId = _observationIdCounter++;
        behaviorObservations[observationId] = BehaviorObservation({
            observationId: observationId,
            livestockId: livestockId,
            behaviorType: behaviorType,
            duration: duration,
            frequency: frequency,
            observationDate: block.timestamp,
            observer: msg.sender
        });

        observationsByOwner[msg.sender].push(observationId);

        if (behaviorPatterns[livestockId].livestockId == 0) {
            behaviorPatterns[livestockId] = BehaviorPattern({
                livestockId: livestockId,
                commonBehaviors: new string[](0),
                averageActivity: 0,
                lastObservation: 0
            });
        }
        behaviorPatterns[livestockId].lastObservation = block.timestamp;

        if (frequency > 100) {
            emit AbnormalBehaviorDetected(livestockId, behaviorType);
        }

        emit BehaviorObserved(observationId, msg.sender, livestockId, behaviorType);
        return observationId;
    }

    function getBehaviorObservation(uint256 observationId) public view returns (BehaviorObservation memory) {
        return behaviorObservations[observationId];
    }

    function getObservationsByOwner(address owner) public view returns (uint256[] memory) {
        return observationsByOwner[owner];
    }
}


