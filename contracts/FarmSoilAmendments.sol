// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilAmendments
 * @dev Soil amendment application tracking and impact measurement
 */
contract FarmSoilAmendments is Ownable {
    struct Amendment {
        uint256 amendmentId;
        address farmer;
        string fieldId;
        string amendmentType;
        uint256 quantity;
        uint256 applicationDate;
        uint256 expectedImpact;
    }

    mapping(uint256 => Amendment) public amendments;
    mapping(address => uint256[]) public amendmentsByFarmer;
    uint256 private _amendmentIdCounter;

    event AmendmentApplied(
        uint256 indexed amendmentId,
        address indexed farmer,
        string amendmentType
    );

    constructor() Ownable(msg.sender) {}

    function applyAmendment(
        string memory fieldId,
        string memory amendmentType,
        uint256 quantity,
        uint256 expectedImpact
    ) public returns (uint256) {
        uint256 amendmentId = _amendmentIdCounter++;
        amendments[amendmentId] = Amendment({
            amendmentId: amendmentId,
            farmer: msg.sender,
            fieldId: fieldId,
            amendmentType: amendmentType,
            quantity: quantity,
            applicationDate: block.timestamp,
            expectedImpact: expectedImpact
        });

        amendmentsByFarmer[msg.sender].push(amendmentId);
        emit AmendmentApplied(amendmentId, msg.sender, amendmentType);
        return amendmentId;
    }

    function getAmendment(uint256 amendmentId) public view returns (Amendment memory) {
        return amendments[amendmentId];
    }
}
