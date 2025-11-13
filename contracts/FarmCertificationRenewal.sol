// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCertificationRenewal
 * @dev Onchain certification renewal management
 */
contract FarmCertificationRenewal is Ownable {
    struct Certification {
        uint256 certId;
        address holder;
        string certType;
        uint256 issueDate;
        uint256 expiryDate;
        bool active;
        uint256 renewalCount;
    }

    mapping(uint256 => Certification) public certifications;
    mapping(address => uint256[]) public certsByHolder;
    uint256 private _certIdCounter;

    event CertificationIssued(
        uint256 indexed certId,
        address indexed holder,
        string certType
    );

    event CertificationRenewed(
        uint256 indexed certId,
        uint256 newExpiryDate
    );

    constructor() Ownable(msg.sender) {}

    function issueCertification(
        address holder,
        string memory certType,
        uint256 validityPeriod
    ) public onlyOwner returns (uint256) {
        uint256 certId = _certIdCounter++;
        certifications[certId] = Certification({
            certId: certId,
            holder: holder,
            certType: certType,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + validityPeriod,
            active: true,
            renewalCount: 0
        });

        certsByHolder[holder].push(certId);

        emit CertificationIssued(certId, holder, certType);
        return certId;
    }

    function renewCertification(uint256 certId, uint256 validityPeriod) public {
        Certification storage cert = certifications[certId];
        require(cert.holder == msg.sender, "Not the holder");
        require(cert.active, "Certification not active");

        cert.expiryDate = block.timestamp + validityPeriod;
        cert.renewalCount++;

        emit CertificationRenewed(certId, cert.expiryDate);
    }

    function getCertification(uint256 certId) public view returns (Certification memory) {
        return certifications[certId];
    }

    function getCertsByHolder(address holder) public view returns (uint256[] memory) {
        return certsByHolder[holder];
    }
}

