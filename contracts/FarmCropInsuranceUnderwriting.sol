// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropInsuranceUnderwriting
 * @dev Insurance underwriting and risk assessment
 */
contract FarmCropInsuranceUnderwriting is Ownable {
    struct Underwriting {
        uint256 underwritingId;
        address farmer;
        uint256 fieldId;
        uint256 riskScore;
        uint256 premium;
        bool approved;
    }

    mapping(uint256 => Underwriting) public underwritings;
    mapping(address => uint256[]) public underwritingsByFarmer;
    mapping(address => bool) public isUnderwriter;
    uint256 private _underwritingIdCounter;

    event UnderwritingCreated(uint256 indexed underwritingId, address indexed farmer);
    event UnderwritingApproved(uint256 indexed underwritingId);

    constructor() Ownable(msg.sender) {
        isUnderwriter[msg.sender] = true;
    }

    function addUnderwriter(address underwriter) public onlyOwner {
        isUnderwriter[underwriter] = true;
    }

    function createUnderwriting(
        uint256 fieldId,
        uint256 riskScore
    ) public returns (uint256) {
        uint256 premium = riskScore * 100;
        uint256 underwritingId = _underwritingIdCounter++;
        underwritings[underwritingId] = Underwriting({
            underwritingId: underwritingId,
            farmer: msg.sender,
            fieldId: fieldId,
            riskScore: riskScore,
            premium: premium,
            approved: false
        });
        underwritingsByFarmer[msg.sender].push(underwritingId);
        emit UnderwritingCreated(underwritingId, msg.sender);
        return underwritingId;
    }

    function approveUnderwriting(uint256 underwritingId) public {
        require(isUnderwriter[msg.sender], "Not an underwriter");
        underwritings[underwritingId].approved = true;
        emit UnderwritingApproved(underwritingId);
    }
}

