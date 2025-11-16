// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropSeedQualityVerification
 * @dev Onchain seed quality verification and certification
 */
contract FarmCropSeedQualityVerification is Ownable {
    struct SeedVerification {
        uint256 verificationId;
        address farmer;
        string seedBatchId;
        uint256 germinationRate;
        uint256 purity;
        string certification;
        uint256 verificationDate;
        address verifier;
        bool isCertified;
    }

    mapping(uint256 => SeedVerification) public verifications;
    mapping(address => uint256[]) public verificationsByFarmer;
    uint256 private _verificationIdCounter;

    event VerificationRecorded(
        uint256 indexed verificationId,
        address indexed farmer,
        string seedBatchId,
        bool isCertified
    );

    constructor() Ownable(msg.sender) {}

    function recordVerification(
        address farmer,
        string memory seedBatchId,
        uint256 germinationRate,
        uint256 purity,
        string memory certification
    ) public onlyOwner returns (uint256) {
        uint256 verificationId = _verificationIdCounter++;
        bool isCertified = germinationRate >= 80 && purity >= 95;

        verifications[verificationId] = SeedVerification({
            verificationId: verificationId,
            farmer: farmer,
            seedBatchId: seedBatchId,
            germinationRate: germinationRate,
            purity: purity,
            certification: certification,
            verificationDate: block.timestamp,
            verifier: msg.sender,
            isCertified: isCertified
        });

        verificationsByFarmer[farmer].push(verificationId);
        emit VerificationRecorded(verificationId, farmer, seedBatchId, isCertified);
        return verificationId;
    }

    function getVerification(uint256 verificationId) public view returns (SeedVerification memory) {
        return verifications[verificationId];
    }
}

