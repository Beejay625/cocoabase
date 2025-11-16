// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropVarietySelection
 * @dev Onchain crop variety selection and performance tracking
 */
contract FarmCropVarietySelection is Ownable {
    struct VarietySelection {
        uint256 selectionId;
        address farmer;
        string fieldId;
        string varietyName;
        string selectionCriteria;
        uint256 expectedYield;
        uint256 plantingDate;
        string characteristics;
    }

    mapping(uint256 => VarietySelection) public selections;
    mapping(address => uint256[]) public selectionsByFarmer;
    uint256 private _selectionIdCounter;

    event SelectionRecorded(
        uint256 indexed selectionId,
        address indexed farmer,
        string fieldId,
        string varietyName
    );

    constructor() Ownable(msg.sender) {}

    function recordSelection(
        string memory fieldId,
        string memory varietyName,
        string memory selectionCriteria,
        uint256 expectedYield,
        uint256 plantingDate,
        string memory characteristics
    ) public returns (uint256) {
        uint256 selectionId = _selectionIdCounter++;
        selections[selectionId] = VarietySelection({
            selectionId: selectionId,
            farmer: msg.sender,
            fieldId: fieldId,
            varietyName: varietyName,
            selectionCriteria: selectionCriteria,
            expectedYield: expectedYield,
            plantingDate: plantingDate,
            characteristics: characteristics
        });

        selectionsByFarmer[msg.sender].push(selectionId);
        emit SelectionRecorded(selectionId, msg.sender, fieldId, varietyName);
        return selectionId;
    }

    function getSelection(uint256 selectionId) public view returns (VarietySelection memory) {
        return selections[selectionId];
    }
}

