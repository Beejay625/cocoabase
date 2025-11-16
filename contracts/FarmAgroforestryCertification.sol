// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAgroforestryCertification
 * @dev Onchain agroforestry certification and validation
 */
contract FarmAgroforestryCertification is Ownable {
    struct Certification {
        uint256 certId;
        address farmer;
        string systemId;
        string certificationType;
        uint256 issueDate;
        uint256 expiryDate;
        bool isVerified;
        address verifier;
        string standards;
    }

    mapping(uint256 => Certification) public certifications;
    mapping(address => uint256[]) public certificationsByFarmer;
    uint256 private _certIdCounter;

    event CertificationIssued(
        uint256 indexed certId,
        address indexed farmer,
        string systemId,
        string certificationType
    );

    constructor() Ownable(msg.sender) {}

    function issueCertification(
        address farmer,
        string memory systemId,
        string memory certificationType,
        uint256 validityPeriod,
        string memory standards
    ) public onlyOwner returns (uint256) {
        uint256 certId = _certIdCounter++;
        certifications[certId] = Certification({
            certId: certId,
            farmer: farmer,
            systemId: systemId,
            certificationType: certificationType,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + validityPeriod,
            isVerified: true,
            verifier: msg.sender,
            standards: standards
        });

        certificationsByFarmer[farmer].push(certId);
        emit CertificationIssued(certId, farmer, systemId, certificationType);
        return certId;
    }

    function getCertification(uint256 certId) public view returns (Certification memory) {
        return certifications[certId];
    }
}
