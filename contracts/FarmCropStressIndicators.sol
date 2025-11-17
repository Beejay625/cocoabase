// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStressIndicators
 * @dev Crop stress indicators monitoring and early warning
 */
contract FarmCropStressIndicators is Ownable {
    struct StressIndicator {
        uint256 indicatorId;
        address farmer;
        string fieldId;
        uint256 stressLevel;
        string stressType;
        uint256 indicatorDate;
        bool actionRequired;
    }

    mapping(uint256 => StressIndicator) public indicators;
    uint256 private _indicatorIdCounter;

    event IndicatorRecorded(
        uint256 indexed indicatorId,
        address indexed farmer,
        uint256 stressLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordIndicator(
        string memory fieldId,
        uint256 stressLevel,
        string memory stressType
    ) public returns (uint256) {
        bool actionRequired = stressLevel > 70;
        uint256 indicatorId = _indicatorIdCounter++;
        indicators[indicatorId] = StressIndicator({
            indicatorId: indicatorId,
            farmer: msg.sender,
            fieldId: fieldId,
            stressLevel: stressLevel,
            stressType: stressType,
            indicatorDate: block.timestamp,
            actionRequired: actionRequired
        });

        emit IndicatorRecorded(indicatorId, msg.sender, stressLevel);
        return indicatorId;
    }

    function getIndicator(uint256 indicatorId) public view returns (StressIndicator memory) {
        return indicators[indicatorId];
    }
}
