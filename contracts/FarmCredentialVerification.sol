// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCredentialVerification
 * @dev Verifiable credentials for certifications
 */
contract FarmCredentialVerification is Ownable {
    struct Credential {
        uint256 credentialId;
        address holder;
        string credentialType;
        bytes32 credentialHash;
        address issuer;
        uint256 issueDate;
        uint256 expiryDate;
        bool revoked;
    }

    mapping(uint256 => Credential) public credentials;
    mapping(address => uint256[]) public credentialsByHolder;
    mapping(address => bool) public isIssuer;
    uint256 private _credentialIdCounter;

    event CredentialIssued(
        uint256 indexed credentialId,
        address indexed holder,
        string credentialType
    );
    event CredentialRevoked(uint256 indexed credentialId);
    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);

    constructor() Ownable(msg.sender) {
        isIssuer[msg.sender] = true;
    }

    function addIssuer(address issuer) public onlyOwner {
        isIssuer[issuer] = true;
        emit IssuerAdded(issuer);
    }

    function issueCredential(
        address holder,
        string memory credentialType,
        bytes32 credentialHash,
        uint256 expiryDate
    ) public returns (uint256) {
        require(isIssuer[msg.sender], "Not an issuer");
        uint256 credentialId = _credentialIdCounter++;
        credentials[credentialId] = Credential({
            credentialId: credentialId,
            holder: holder,
            credentialType: credentialType,
            credentialHash: credentialHash,
            issuer: msg.sender,
            issueDate: block.timestamp,
            expiryDate: expiryDate,
            revoked: false
        });
        credentialsByHolder[holder].push(credentialId);
        emit CredentialIssued(credentialId, holder, credentialType);
        return credentialId;
    }

    function revokeCredential(uint256 credentialId) public {
        require(
            credentials[credentialId].issuer == msg.sender || msg.sender == owner(),
            "Not authorized"
        );
        require(!credentials[credentialId].revoked, "Already revoked");
        credentials[credentialId].revoked = true;
        emit CredentialRevoked(credentialId);
    }

    function verifyCredential(uint256 credentialId) public view returns (bool) {
        Credential memory cred = credentials[credentialId];
        return !cred.revoked && 
               cred.expiryDate > block.timestamp &&
               cred.holder != address(0);
    }
}

