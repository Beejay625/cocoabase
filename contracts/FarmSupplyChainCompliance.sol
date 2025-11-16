// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainCompliance
 * @dev Supply chain compliance verification
 */
contract FarmSupplyChainCompliance is Ownable {
    struct ComplianceCheck {
        uint256 checkId;
        address auditor;
        uint256 supplyChainId;
        string standard;
        bool compliant;
        uint256 timestamp;
    }

    mapping(uint256 => ComplianceCheck) public complianceChecks;
    mapping(uint256 => uint256[]) public checksBySupplyChain;
    mapping(address => bool) public isAuditor;
    uint256 private _checkIdCounter;

    event ComplianceCheckCreated(uint256 indexed checkId, uint256 supplyChainId);
    event ComplianceVerified(uint256 indexed checkId, bool compliant);
    event AuditorAdded(address indexed auditor);

    constructor() Ownable(msg.sender) {
        isAuditor[msg.sender] = true;
    }

    function addAuditor(address auditor) public onlyOwner {
        isAuditor[auditor] = true;
        emit AuditorAdded(auditor);
    }

    function createCheck(
        uint256 supplyChainId,
        string memory standard
    ) public returns (uint256) {
        require(isAuditor[msg.sender], "Not an auditor");
        uint256 checkId = _checkIdCounter++;
        complianceChecks[checkId] = ComplianceCheck({
            checkId: checkId,
            auditor: msg.sender,
            supplyChainId: supplyChainId,
            standard: standard,
            compliant: false,
            timestamp: block.timestamp
        });
        checksBySupplyChain[supplyChainId].push(checkId);
        emit ComplianceCheckCreated(checkId, supplyChainId);
        return checkId;
    }

    function verifyCompliance(uint256 checkId, bool compliant) public {
        require(complianceChecks[checkId].auditor == msg.sender, "Not the auditor");
        complianceChecks[checkId].compliant = compliant;
        emit ComplianceVerified(checkId, compliant);
    }
}

