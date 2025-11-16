// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFoodSafetyCertification
 * @dev Food safety certification management and tracking
 */
contract FarmFoodSafetyCertification is Ownable {
    struct SafetyCert {
        uint256 certId;
        address farmer;
        string standard;
        uint256 issueDate;
        uint256 expiryDate;
        bool active;
        string certHash;
    }

    mapping(uint256 => SafetyCert) public certifications;
    mapping(address => uint256[]) public certsByFarmer;
    uint256 private _certIdCounter;

    event CertificationIssued(
        uint256 indexed certId,
        address indexed farmer,
        string standard
    );

    constructor() Ownable(msg.sender) {}

    function issueCertification(
        address farmer,
        string memory standard,
        uint256 validityDays,
        string memory certHash
    ) public onlyOwner returns (uint256) {
        uint256 certId = _certIdCounter++;
        certifications[certId] = SafetyCert({
            certId: certId,
            farmer: farmer,
            standard: standard,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + (validityDays * 1 days),
            active: true,
            certHash: certHash
        });

        certsByFarmer[farmer].push(certId);
        emit CertificationIssued(certId, farmer, standard);
        return certId;
    }

    function revokeCertification(uint256 certId) public onlyOwner {
        certifications[certId].active = false;
    }

    function verifyCertification(uint256 certId) public view returns (bool) {
        SafetyCert memory cert = certifications[certId];
        return cert.active && block.timestamp <= cert.expiryDate;
    }

    function getCertification(uint256 certId) public view returns (SafetyCert memory) {
        return certifications[certId];
    }
}
