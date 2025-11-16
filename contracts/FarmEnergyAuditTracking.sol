// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEnergyAuditTracking
 * @dev Onchain energy audit tracking and efficiency recommendations
 */
contract FarmEnergyAuditTracking is Ownable {
    struct EnergyAudit {
        uint256 auditId;
        address farmer;
        uint256 auditDate;
        uint256 currentConsumption;
        uint256 potentialSavings;
        string recommendations;
        uint256 implementationDate;
        bool isImplemented;
    }

    mapping(uint256 => EnergyAudit) public audits;
    mapping(address => uint256[]) public auditsByFarmer;
    uint256 private _auditIdCounter;

    event AuditRecorded(
        uint256 indexed auditId,
        address indexed farmer,
        uint256 potentialSavings
    );

    constructor() Ownable(msg.sender) {}

    function recordAudit(
        uint256 currentConsumption,
        uint256 potentialSavings,
        string memory recommendations
    ) public returns (uint256) {
        uint256 auditId = _auditIdCounter++;
        audits[auditId] = EnergyAudit({
            auditId: auditId,
            farmer: msg.sender,
            auditDate: block.timestamp,
            currentConsumption: currentConsumption,
            potentialSavings: potentialSavings,
            recommendations: recommendations,
            implementationDate: 0,
            isImplemented: false
        });

        auditsByFarmer[msg.sender].push(auditId);
        emit AuditRecorded(auditId, msg.sender, potentialSavings);
        return auditId;
    }

    function implementAudit(uint256 auditId) public {
        require(audits[auditId].farmer == msg.sender, "Not audit owner");
        audits[auditId].isImplemented = true;
        audits[auditId].implementationDate = block.timestamp;
    }

    function getAudit(uint256 auditId) public view returns (EnergyAudit memory) {
        return audits[auditId];
    }
}

