// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockDiseasePrevention
 * @dev Track disease prevention measures for livestock
 */
contract FarmLivestockDiseasePrevention is Ownable {
    struct PreventionMeasure {
        uint256 measureId;
        uint256 livestockId;
        string diseaseType;
        string preventionMethod;
        uint256 applicationDate;
        uint256 nextDueDate;
        address applicator;
    }

    mapping(uint256 => PreventionMeasure) public measures;
    mapping(address => uint256[]) public measuresByOwner;
    uint256 private _measureIdCounter;

    event MeasureApplied(
        uint256 indexed measureId,
        address indexed owner,
        uint256 livestockId
    );

    constructor() Ownable(msg.sender) {}

    function applyPrevention(
        uint256 livestockId,
        string memory diseaseType,
        string memory preventionMethod,
        uint256 nextDueDate
    ) public returns (uint256) {
        uint256 measureId = _measureIdCounter++;
        measures[measureId] = PreventionMeasure({
            measureId: measureId,
            livestockId: livestockId,
            diseaseType: diseaseType,
            preventionMethod: preventionMethod,
            applicationDate: block.timestamp,
            nextDueDate: nextDueDate,
            applicator: msg.sender
        });

        measuresByOwner[msg.sender].push(measureId);

        emit MeasureApplied(measureId, msg.sender, livestockId);
        return measureId;
    }

    function getMeasure(uint256 measureId) public view returns (PreventionMeasure memory) {
        return measures[measureId];
    }

    function getMeasuresByOwner(address owner) public view returns (uint256[] memory) {
        return measuresByOwner[owner];
    }
}

