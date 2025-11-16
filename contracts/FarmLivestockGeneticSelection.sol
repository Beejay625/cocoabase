// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticSelection
 * @dev Onchain genetic selection criteria and breeding decisions
 */
contract FarmLivestockGeneticSelection is Ownable {
    struct GeneticSelection {
        uint256 selectionId;
        address farmer;
        string livestockId;
        string selectionCriteria;
        uint256 geneticScore;
        string traits;
        uint256 selectionDate;
        bool isSelected;
    }

    mapping(uint256 => GeneticSelection) public selections;
    mapping(address => uint256[]) public selectionsByFarmer;
    uint256 private _selectionIdCounter;

    event SelectionRecorded(
        uint256 indexed selectionId,
        address indexed farmer,
        string livestockId,
        uint256 geneticScore
    );

    constructor() Ownable(msg.sender) {}

    function recordSelection(
        string memory livestockId,
        string memory selectionCriteria,
        uint256 geneticScore,
        string memory traits
    ) public returns (uint256) {
        uint256 selectionId = _selectionIdCounter++;
        selections[selectionId] = GeneticSelection({
            selectionId: selectionId,
            farmer: msg.sender,
            livestockId: livestockId,
            selectionCriteria: selectionCriteria,
            geneticScore: geneticScore,
            traits: traits,
            selectionDate: block.timestamp,
            isSelected: true
        });

        selectionsByFarmer[msg.sender].push(selectionId);
        emit SelectionRecorded(selectionId, msg.sender, livestockId, geneticScore);
        return selectionId;
    }

    function getSelection(uint256 selectionId) public view returns (GeneticSelection memory) {
        return selections[selectionId];
    }
}

