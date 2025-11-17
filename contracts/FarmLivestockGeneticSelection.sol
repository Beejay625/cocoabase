// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGeneticSelection
 * @dev Genetic selection and breeding improvement tracking
 */
contract FarmLivestockGeneticSelection is Ownable {
    struct Selection {
        uint256 selectionId;
        address farmer;
        string livestockId;
        string geneticTrait;
        uint256 traitValue;
        uint256 selectionDate;
        bool selected;
    }

    mapping(uint256 => Selection) public selections;
    mapping(address => uint256[]) public selectionsByFarmer;
    uint256 private _selectionIdCounter;

    event SelectionRecorded(
        uint256 indexed selectionId,
        address indexed farmer,
        string geneticTrait
    );

    constructor() Ownable(msg.sender) {}

    function recordSelection(
        string memory livestockId,
        string memory geneticTrait,
        uint256 traitValue
    ) public returns (uint256) {
        uint256 selectionId = _selectionIdCounter++;
        selections[selectionId] = Selection({
            selectionId: selectionId,
            farmer: msg.sender,
            livestockId: livestockId,
            geneticTrait: geneticTrait,
            traitValue: traitValue,
            selectionDate: block.timestamp,
            selected: false
        });

        selectionsByFarmer[msg.sender].push(selectionId);
        emit SelectionRecorded(selectionId, msg.sender, geneticTrait);
        return selectionId;
    }

    function markSelected(uint256 selectionId) public {
        require(selections[selectionId].farmer == msg.sender, "Not authorized");
        selections[selectionId].selected = true;
    }

    function getSelection(uint256 selectionId) public view returns (Selection memory) {
        return selections[selectionId];
    }
}