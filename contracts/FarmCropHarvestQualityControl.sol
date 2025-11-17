// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropHarvestQualityControl
 * @dev Harvest quality control system
 */
contract FarmCropHarvestQualityControl is Ownable {
    struct QualityCheck {
        uint256 checkId;
        address inspector;
        uint256 harvestId;
        uint256 qualityScore;
        bool passed;
        uint256 timestamp;
    }

    mapping(uint256 => QualityCheck) public qualityChecks;
    mapping(address => uint256[]) public checksByInspector;
    mapping(address => bool) public isInspector;
    uint256 private _checkIdCounter;

    event QualityCheckPerformed(uint256 indexed checkId, bool passed);
    event InspectorAdded(address indexed inspector);

    constructor() Ownable(msg.sender) {
        isInspector[msg.sender] = true;
    }

    function addInspector(address inspector) public onlyOwner {
        isInspector[inspector] = true;
        emit InspectorAdded(inspector);
    }

    function performCheck(
        uint256 harvestId,
        uint256 qualityScore
    ) public returns (uint256) {
        require(isInspector[msg.sender], "Not an inspector");
        bool passed = qualityScore >= 70;
        uint256 checkId = _checkIdCounter++;
        qualityChecks[checkId] = QualityCheck({
            checkId: checkId,
            inspector: msg.sender,
            harvestId: harvestId,
            qualityScore: qualityScore,
            passed: passed,
            timestamp: block.timestamp
        });
        checksByInspector[msg.sender].push(checkId);
        emit QualityCheckPerformed(checkId, passed);
        return checkId;
    }
}
