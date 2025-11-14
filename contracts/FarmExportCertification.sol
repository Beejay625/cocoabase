// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmExportCertification
 * @dev Onchain system for export certification of agricultural products
 */
contract FarmExportCertification is Ownable {
    struct ExportCertificate {
        uint256 certificateId;
        uint256 productId;
        address exporter;
        string destinationCountry;
        uint256 issueDate;
        uint256 expiryDate;
        string certificationType;
        bool valid;
        bool revoked;
    }

    mapping(uint256 => ExportCertificate) public certificates;
    mapping(address => uint256[]) public certificatesByExporter;
    uint256 private _certificateIdCounter;

    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed exporter,
        string destinationCountry
    );

    event CertificateRevoked(uint256 indexed certificateId);
    event CertificateValidated(uint256 indexed certificateId);

    constructor() Ownable(msg.sender) {}

    function issueCertificate(
        uint256 productId,
        string memory destinationCountry,
        uint256 validityPeriod,
        string memory certificationType
    ) public returns (uint256) {
        uint256 certificateId = _certificateIdCounter++;
        certificates[certificateId] = ExportCertificate({
            certificateId: certificateId,
            productId: productId,
            exporter: msg.sender,
            destinationCountry: destinationCountry,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + validityPeriod,
            certificationType: certificationType,
            valid: true,
            revoked: false
        });

        certificatesByExporter[msg.sender].push(certificateId);

        emit CertificateIssued(certificateId, msg.sender, destinationCountry);
        return certificateId;
    }

    function validateCertificate(uint256 certificateId) public view returns (bool) {
        ExportCertificate memory cert = certificates[certificateId];
        return cert.valid && !cert.revoked && block.timestamp <= cert.expiryDate;
    }

    function revokeCertificate(uint256 certificateId) public onlyOwner {
        require(certificates[certificateId].valid, "Certificate not valid");
        certificates[certificateId].revoked = true;
        certificates[certificateId].valid = false;

        emit CertificateRevoked(certificateId);
    }

    function getCertificate(uint256 certificateId) public view returns (ExportCertificate memory) {
        return certificates[certificateId];
    }
}

