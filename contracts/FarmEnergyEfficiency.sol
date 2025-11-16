// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyEfficiency
 * @dev Energy efficiency improvements tracking
 */
contract FarmEnergyEfficiency is Ownable {
    struct EfficiencyImprovement {
        uint256 improvementId;
        address farmer;
        string improvementType;
        uint256 energySaved;
        uint256 efficiencyGain;
        uint256 implementationDate;
    }

    mapping(uint256 => EfficiencyImprovement) public improvements;
    mapping(address => uint256[]) public improvementsByFarmer;
    uint256 private _improvementIdCounter;

    event ImprovementRecorded(
        uint256 indexed improvementId,
        address indexed farmer,
        uint256 energySaved
    );

    constructor() Ownable(msg.sender) {}

    function recordImprovement(
        string memory improvementType,
        uint256 energySaved,
        uint256 efficiencyGain
    ) public returns (uint256) {
        uint256 improvementId = _improvementIdCounter++;
        improvements[improvementId] = EfficiencyImprovement({
            improvementId: improvementId,
            farmer: msg.sender,
            improvementType: improvementType,
            energySaved: energySaved,
            efficiencyGain: efficiencyGain,
            implementationDate: block.timestamp
        });

        improvementsByFarmer[msg.sender].push(improvementId);
        emit ImprovementRecorded(improvementId, msg.sender, energySaved);
        return improvementId;
    }

    function getImprovement(uint256 improvementId) public view returns (EfficiencyImprovement memory) {
        return improvements[improvementId];
    }
}
