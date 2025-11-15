// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropInsuranceClaims
 * @dev Automated insurance claim processing for crop losses and damages
 */
contract FarmCropInsuranceClaims is Ownable {
    struct InsuranceClaim {
        uint256 claimId;
        address farmer;
        uint256 policyId;
        string lossType;
        uint256 lossAmount;
        uint256 claimAmount;
        uint256 submissionDate;
        bool approved;
        bool processed;
    }

    mapping(uint256 => InsuranceClaim) public claims;
    mapping(address => uint256[]) public claimsByFarmer;
    uint256 private _claimIdCounter;

    event ClaimSubmitted(
        uint256 indexed claimId,
        address indexed farmer,
        uint256 policyId
    );

    event ClaimApproved(
        uint256 indexed claimId,
        uint256 claimAmount
    );

    constructor() Ownable(msg.sender) {}

    function submitClaim(
        uint256 policyId,
        string memory lossType,
        uint256 lossAmount,
        uint256 claimAmount
    ) public returns (uint256) {
        uint256 claimId = _claimIdCounter++;
        claims[claimId] = InsuranceClaim({
            claimId: claimId,
            farmer: msg.sender,
            policyId: policyId,
            lossType: lossType,
            lossAmount: lossAmount,
            claimAmount: claimAmount,
            submissionDate: block.timestamp,
            approved: false,
            processed: false
        });

        claimsByFarmer[msg.sender].push(claimId);
        emit ClaimSubmitted(claimId, msg.sender, policyId);
        return claimId;
    }

    function approveClaim(uint256 claimId) public onlyOwner {
        require(!claims[claimId].processed, "Claim already processed");
        claims[claimId].approved = true;
        claims[claimId].processed = true;
        emit ClaimApproved(claimId, claims[claimId].claimAmount);
    }

    function getClaim(uint256 claimId) public view returns (InsuranceClaim memory) {
        return claims[claimId];
    }
}
