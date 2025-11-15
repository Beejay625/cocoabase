// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmOnchainIdentity
 * @dev Decentralized identity verification system
 */
contract FarmOnchainIdentity is Ownable {
    struct Identity {
        address wallet;
        string name;
        string location;
        bool verified;
        address verifier;
        uint256 verificationDate;
        bytes32 documentHash;
    }

    mapping(address => Identity) public identities;
    mapping(address => bool) public isVerifier;
    mapping(bytes32 => bool) public usedDocuments;

    event IdentityRegistered(address indexed wallet, string name);
    event IdentityVerified(address indexed wallet, address indexed verifier);
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    constructor() Ownable(msg.sender) {
        isVerifier[msg.sender] = true;
    }

    function addVerifier(address verifier) public onlyOwner {
        isVerifier[verifier] = true;
        emit VerifierAdded(verifier);
    }

    function registerIdentity(
        string memory name,
        string memory location,
        bytes32 documentHash
    ) public {
        require(identities[msg.sender].wallet == address(0), "Already registered");
        require(!usedDocuments[documentHash], "Document already used");
        
        identities[msg.sender] = Identity({
            wallet: msg.sender,
            name: name,
            location: location,
            verified: false,
            verifier: address(0),
            verificationDate: 0,
            documentHash: documentHash
        });
        usedDocuments[documentHash] = true;
        emit IdentityRegistered(msg.sender, name);
    }

    function verifyIdentity(address wallet) public {
        require(isVerifier[msg.sender], "Not a verifier");
        require(identities[wallet].wallet != address(0), "Identity not found");
        require(!identities[wallet].verified, "Already verified");
        
        identities[wallet].verified = true;
        identities[wallet].verifier = msg.sender;
        identities[wallet].verificationDate = block.timestamp;
        emit IdentityVerified(wallet, msg.sender);
    }

    function getIdentity(address wallet) public view returns (Identity memory) {
        return identities[wallet];
    }
}

