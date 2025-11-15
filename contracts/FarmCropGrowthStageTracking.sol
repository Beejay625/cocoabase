// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropGrowthStageTracking
 * @dev Track crop growth stages and development
 */
contract FarmCropGrowthStageTracking is Ownable {
    struct GrowthStage {
        uint256 stageId;
        uint256 plantationId;
        string cropType;
        string stageName;
        uint256 stageNumber;
        uint256 startDate;
        uint256 expectedEndDate;
        address tracker;
    }

    struct StageTransition {
        uint256 transitionId;
        uint256 fromStageId;
        uint256 toStageId;
        uint256 transitionDate;
        address recorder;
    }

    mapping(uint256 => GrowthStage) public growthStages;
    mapping(uint256 => StageTransition) public stageTransitions;
    mapping(address => uint256[]) public stagesByOwner;
    uint256 private _stageIdCounter;
    uint256 private _transitionIdCounter;

    event GrowthStageRecorded(
        uint256 indexed stageId,
        address indexed owner,
        uint256 plantationId,
        string stageName
    );

    event StageTransitioned(
        uint256 indexed transitionId,
        uint256 fromStageId,
        uint256 toStageId
    );

    constructor() Ownable(msg.sender) {}

    function recordGrowthStage(
        uint256 plantationId,
        string memory cropType,
        string memory stageName,
        uint256 stageNumber,
        uint256 expectedEndDate
    ) public returns (uint256) {
        uint256 stageId = _stageIdCounter++;
        growthStages[stageId] = GrowthStage({
            stageId: stageId,
            plantationId: plantationId,
            cropType: cropType,
            stageName: stageName,
            stageNumber: stageNumber,
            startDate: block.timestamp,
            expectedEndDate: expectedEndDate,
            tracker: msg.sender
        });

        stagesByOwner[msg.sender].push(stageId);

        emit GrowthStageRecorded(stageId, msg.sender, plantationId, stageName);
        return stageId;
    }

    function transitionStage(
        uint256 fromStageId,
        uint256 toStageId
    ) public returns (uint256) {
        require(growthStages[fromStageId].tracker == msg.sender, "Not tracker");
        
        uint256 transitionId = _transitionIdCounter++;
        stageTransitions[transitionId] = StageTransition({
            transitionId: transitionId,
            fromStageId: fromStageId,
            toStageId: toStageId,
            transitionDate: block.timestamp,
            recorder: msg.sender
        });

        emit StageTransitioned(transitionId, fromStageId, toStageId);
        return transitionId;
    }

    function getGrowthStage(uint256 stageId) public view returns (GrowthStage memory) {
        return growthStages[stageId];
    }

    function getStagesByOwner(address owner) public view returns (uint256[] memory) {
        return stagesByOwner[owner];
    }
}


