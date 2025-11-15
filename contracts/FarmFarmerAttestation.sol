// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFarmerAttestation
 * @dev Onchain attestation system for farmer verification
 */
contract FarmFarmerAttestation is Ownable {
    struct Attestation {
        uint256 attestationId;
        address farmer;
        address attester;
        string attestationType;
        bytes32 dataHash;
        uint256 timestamp;
        bool revoked;
    }

    mapping(uint256 => Attestation) public attestations;
    mapping(address => uint256[]) public attestationsByFarmer;
    mapping(address => bool) public isAttester;
    uint256 private _attestationIdCounter;

    event AttestationCreated(
        uint256 indexed attestationId,
        address indexed farmer,
        address indexed attester
    );
    event AttestationRevoked(uint256 indexed attestationId);
    event AttesterAdded(address indexed attester);
    event AttesterRemoved(address indexed attester);

    constructor() Ownable(msg.sender) {
        isAttester[msg.sender] = true;
    }

    function addAttester(address attester) public onlyOwner {
        isAttester[attester] = true;
        emit AttesterAdded(attester);
    }

    function createAttestation(
        address farmer,
        string memory attestationType,
        bytes32 dataHash
    ) public returns (uint256) {
        require(isAttester[msg.sender], "Not an attester");
        uint256 attestationId = _attestationIdCounter++;
        attestations[attestationId] = Attestation({
            attestationId: attestationId,
            farmer: farmer,
            attester: msg.sender,
            attestationType: attestationType,
            dataHash: dataHash,
            timestamp: block.timestamp,
            revoked: false
        });
        attestationsByFarmer[farmer].push(attestationId);
        emit AttestationCreated(attestationId, farmer, msg.sender);
        return attestationId;
    }

    function revokeAttestation(uint256 attestationId) public {
        require(
            attestations[attestationId].attester == msg.sender || msg.sender == owner(),
            "Not authorized"
        );
        require(!attestations[attestationId].revoked, "Already revoked");
        attestations[attestationId].revoked = true;
        emit AttestationRevoked(attestationId);
    }

    function verifyAttestation(uint256 attestationId) public view returns (bool) {
        return !attestations[attestationId].revoked &&
               attestations[attestationId].farmer != address(0);
    }
}

