// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRenewableEnergyCertification
 * @dev Onchain renewable energy certification and validation
 */
contract FarmRenewableEnergyCertification is Ownable {
    struct Certification {
        uint256 certId;
        address farmer;
        string energySource;
        uint256 capacity;
        uint256 generationAmount;
        uint256 issueDate;
        uint256 expiryDate;
        bool isVerified;
        address verifier;
    }

    mapping(uint256 => Certification) public certifications;
    mapping(address => uint256[]) public certificationsByFarmer;
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
        uint256 generationAmount,
        uint256 validityPeriod
    ) public onlyOwner returns (uint256) {
        uint256 certId = _certIdCounter++;
        certifications[certId] = Certification({
            certId: certId,
            farmer: farmer,
            energySource: energySource,
            capacity: capacity,
            generationAmount: generationAmount,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + validityPeriod,
            isVerified: true,
            verifier: msg.sender
        });

        certificationsByFarmer[farmer].push(certId);
        emit CertificationIssued(certId, farmer, energySource);
        return certId;
    }

    function getCertification(uint256 certId) public view returns (Certification memory) {
        return certifications[certId];
    }
}
