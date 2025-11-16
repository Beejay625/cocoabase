// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRenewableEnergyCertification
 * @dev Renewable energy certification and validation
 */
contract FarmRenewableEnergyCertification is Ownable {
    struct EnergyCert {
        uint256 certId;
        address farmer;
        string energySource;
        uint256 capacity;
        uint256 issueDate;
        uint256 expiryDate;
        bool active;
    }

    mapping(uint256 => EnergyCert) public certifications;
    mapping(address => uint256[]) public certsByFarmer;
    uint256 private _certIdCounter;

    event CertificationIssued(
        uint256 indexed certId,
        address indexed farmer,
        string energySource
    );

    constructor() Ownable(msg.sender) {}

    function issueCertification(
        address farmer,
        string memory energySource,
        uint256 capacity,
        uint256 validityDays
    ) public onlyOwner returns (uint256) {
        uint256 certId = _certIdCounter++;
        certifications[certId] = EnergyCert({
            certId: certId,
            farmer: farmer,
            energySource: energySource,
            capacity: capacity,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + (validityDays * 1 days),
            active: true
        });

        certsByFarmer[farmer].push(certId);
        emit CertificationIssued(certId, farmer, energySource);
        return certId;
    }

    function revokeCertification(uint256 certId) public onlyOwner {
        certifications[certId].active = false;
    }

    function verifyCertification(uint256 certId) public view returns (bool) {
        EnergyCert memory cert = certifications[certId];
        return cert.active && block.timestamp <= cert.expiryDate;
    }

    function getCertification(uint256 certId) public view returns (EnergyCert memory) {
        return certifications[certId];
    }
}
