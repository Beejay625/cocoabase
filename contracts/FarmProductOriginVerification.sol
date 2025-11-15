// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmProductOriginVerification
 * @dev Onchain product origin verification and certification
 */
contract FarmProductOriginVerification is Ownable {
    struct OriginCertificate {
        uint256 certificateId;
        address producer;
        string productId;
        string originLocation;
        string coordinates;
        uint256 productionDate;
        string productionMethod;
        bool isVerified;
        address verifier;
        uint256 verificationDate;
    }

    mapping(uint256 => OriginCertificate) public certificates;
    mapping(string => uint256) public certificatesByProductId;
    mapping(address => uint256[]) public certificatesByProducer;
    uint256 private _certificateIdCounter;

    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed producer,
        string productId
    );

    event CertificateVerified(
        uint256 indexed certificateId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function issueCertificate(
        string memory productId,
        string memory originLocation,
        string memory coordinates,
        string memory productionMethod
    ) public returns (uint256) {
        require(certificatesByProductId[productId] == 0, "Product already certified");

        uint256 certificateId = _certificateIdCounter++;
        certificates[certificateId] = OriginCertificate({
            certificateId: certificateId,
            producer: msg.sender,
            productId: productId,
            originLocation: originLocation,
            coordinates: coordinates,
            productionDate: block.timestamp,
            productionMethod: productionMethod,
            isVerified: false,
            verifier: address(0),
            verificationDate: 0
        });

        certificatesByProductId[productId] = certificateId;
        certificatesByProducer[msg.sender].push(certificateId);

        emit CertificateIssued(certificateId, msg.sender, productId);
        return certificateId;
    }

    function verifyCertificate(uint256 certificateId) public onlyOwner {
        require(!certificates[certificateId].isVerified, "Already verified");
        certificates[certificateId].isVerified = true;
        certificates[certificateId].verifier = msg.sender;
        certificates[certificateId].verificationDate = block.timestamp;

        emit CertificateVerified(certificateId, msg.sender);
    }

    function getCertificate(uint256 certificateId) public view returns (OriginCertificate memory) {
        return certificates[certificateId];
    }

    function getCertificateByProductId(string memory productId) public view returns (OriginCertificate memory) {
        uint256 certificateId = certificatesByProductId[productId];
        return certificates[certificateId];
    }
}

