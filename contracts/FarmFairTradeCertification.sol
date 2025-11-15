// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFairTradeCertification
 * @dev Onchain fair trade certification and compliance tracking
 */
contract FarmFairTradeCertification is Ownable {
    struct FairTradeCert {
        uint256 certId;
        address farmer;
        string organization;
        uint256 issueDate;
        uint256 expiryDate;
        bool isActive;
        bool isVerified;
        address verifier;
        string standards;
    }

    mapping(uint256 => FairTradeCert) public certificates;
    mapping(address => uint256[]) public certificatesByFarmer;
    uint256 private _certIdCounter;

    event CertificateIssued(
        uint256 indexed certId,
        address indexed farmer,
        string organization
    );

    event CertificateVerified(
        uint256 indexed certId,
        address indexed verifier
    );

    event CertificateRenewed(
        uint256 indexed certId,
        uint256 newExpiryDate
    );

    constructor() Ownable(msg.sender) {}

    function issueCertificate(
        address farmer,
        string memory organization,
        uint256 validityPeriod,
        string memory standards
    ) public onlyOwner returns (uint256) {
        uint256 certId = _certIdCounter++;
        certificates[certId] = FairTradeCert({
            certId: certId,
            farmer: farmer,
            organization: organization,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + validityPeriod,
            isActive: true,
            isVerified: false,
            verifier: address(0),
            standards: standards
        });

        certificatesByFarmer[farmer].push(certId);

        emit CertificateIssued(certId, farmer, organization);
        return certId;
    }

    function verifyCertificate(uint256 certId) public onlyOwner {
        require(!certificates[certId].isVerified, "Already verified");
        certificates[certId].isVerified = true;
        certificates[certId].verifier = msg.sender;

        emit CertificateVerified(certId, msg.sender);
    }

    function renewCertificate(uint256 certId, uint256 validityPeriod) public onlyOwner {
        require(certificates[certId].isActive, "Certificate not active");
        certificates[certId].expiryDate = block.timestamp + validityPeriod;

        emit CertificateRenewed(certId, certificates[certId].expiryDate);
    }

    function revokeCertificate(uint256 certId) public onlyOwner {
        certificates[certId].isActive = false;
    }

    function getCertificate(uint256 certId) public view returns (FairTradeCert memory) {
        return certificates[certId];
    }
}
