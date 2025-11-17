// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropDiseaseEarlyWarning
 * @dev Early warning system for crop diseases
 */
contract FarmCropDiseaseEarlyWarning is Ownable {
    struct Warning {
        uint256 warningId;
        address farmer;
        string fieldId;
        string diseaseType;
        uint256 riskLevel;
        uint256 detectionDate;
        bool resolved;
    }

    mapping(uint256 => Warning) public warnings;
    mapping(address => uint256[]) public warningsByFarmer;
    uint256 private _warningIdCounter;

    event WarningIssued(
        uint256 indexed warningId,
        address indexed farmer,
        string diseaseType
    );

    constructor() Ownable(msg.sender) {}

    function issueWarning(
        string memory fieldId,
        string memory diseaseType,
        uint256 riskLevel
    ) public returns (uint256) {
        uint256 warningId = _warningIdCounter++;
        warnings[warningId] = Warning({
            warningId: warningId,
            farmer: msg.sender,
            fieldId: fieldId,
            diseaseType: diseaseType,
            riskLevel: riskLevel,
            detectionDate: block.timestamp,
            resolved: false
        });

        warningsByFarmer[msg.sender].push(warningId);
        emit WarningIssued(warningId, msg.sender, diseaseType);
        return warningId;
    }

    function resolveWarning(uint256 warningId) public {
        require(warnings[warningId].farmer == msg.sender, "Not authorized");
        warnings[warningId].resolved = true;
    }

    function getWarning(uint256 warningId) public view returns (Warning memory) {
        return warnings[warningId];
    }
}
