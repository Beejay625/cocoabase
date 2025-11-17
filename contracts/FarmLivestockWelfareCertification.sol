// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockWelfareCertification
 * @dev Welfare certification system
 */
contract FarmLivestockWelfareCertification is Ownable {
    struct Certification {
        uint256 certId;
        address farmer;
        uint256 farmId;
        uint256 welfareScore;
        bool certified;
        address certifier;
        uint256 issueDate;
    }

    mapping(uint256 => Certification) public certifications;
    mapping(address => uint256[]) public certsByFarmer;
    mapping(address => bool) public isCertifier;
    uint256 private _certIdCounter;

    event CertificationIssued(uint256 indexed certId, address indexed farmer);
    event CertifierAdded(address indexed certifier);

    constructor() Ownable(msg.sender) {
        isCertifier[msg.sender] = true;
    }

    function addCertifier(address certifier) public onlyOwner {
        isCertifier[certifier] = true;
        emit CertifierAdded(certifier);
    }

    function issueCertification(
        address farmer,
        uint256 farmId,
        uint256 welfareScore
    ) public returns (uint256) {
        require(isCertifier[msg.sender], "Not a certifier");
        bool certified = welfareScore >= 80;
        uint256 certId = _certIdCounter++;
        certifications[certId] = Certification({
            certId: certId,
            farmer: farmer,
            farmId: farmId,
            welfareScore: welfareScore,
            certified: certified,
            certifier: msg.sender,
            issueDate: block.timestamp
        });
        certsByFarmer[farmer].push(certId);
        emit CertificationIssued(certId, farmer);
        return certId;
    }
}

