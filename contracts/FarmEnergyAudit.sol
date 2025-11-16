// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyAudit
 * @dev Energy audit tracking and efficiency recommendations
 */
contract FarmEnergyAudit is Ownable {
    struct Audit {
        uint256 auditId;
        address farmer;
        address auditor;
        uint256 totalConsumption;
        uint256 efficiencyScore;
        uint256 auditDate;
        string recommendations;
        bool verified;
    }

    mapping(uint256 => Audit) public audits;
    mapping(address => uint256[]) public auditsByFarmer;
    uint256 private _auditIdCounter;

    event AuditConducted(
        uint256 indexed auditId,
        address indexed farmer,
        uint256 efficiencyScore
    );

    event AuditVerified(
        uint256 indexed auditId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function conductAudit(
        address farmer,
        uint256 totalConsumption,
        uint256 efficiencyScore,
        string memory recommendations
    ) public returns (uint256) {
        uint256 auditId = _auditIdCounter++;
        audits[auditId] = Audit({
            auditId: auditId,
            farmer: farmer,
            auditor: msg.sender,
            totalConsumption: totalConsumption,
            efficiencyScore: efficiencyScore,
            auditDate: block.timestamp,
            recommendations: recommendations,
            verified: false
        });

        auditsByFarmer[farmer].push(auditId);
        emit AuditConducted(auditId, farmer, efficiencyScore);
        return auditId;
    }

    function verifyAudit(uint256 auditId) public onlyOwner {
        audits[auditId].verified = true;
        emit AuditVerified(auditId, msg.sender);
    }

    function getAudit(uint256 auditId) public view returns (Audit memory) {
        return audits[auditId];
    }
}
