// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmYieldInsuranceClaims
 * @dev Automated yield insurance claim processing
 */
contract FarmYieldInsuranceClaims is Ownable {
    struct YieldClaim {
        uint256 claimId;
        address farmer;
        uint256 policyId;
        uint256 expectedYield;
        uint256 actualYield;
        uint256 lossAmount;
        bool approved;
        uint256 payoutAmount;
    }

    mapping(uint256 => YieldClaim) public claims;
    mapping(address => uint256[]) public claimsByFarmer;
    uint256 private _claimIdCounter;

    event ClaimSubmitted(
        uint256 indexed claimId,
        address indexed farmer,
        uint256 lossAmount
    );

    constructor() Ownable(msg.sender) {}

    function submitClaim(
        uint256 policyId,
        uint256 expectedYield,
        uint256 actualYield
    ) public returns (uint256) {
        require(actualYield <= expectedYield, "Invalid yield data");
        uint256 lossAmount = expectedYield - actualYield;
        uint256 claimId = _claimIdCounter++;
        claims[claimId] = YieldClaim({
            claimId: claimId,
            farmer: msg.sender,
            policyId: policyId,
            expectedYield: expectedYield,
            actualYield: actualYield,
            lossAmount: lossAmount,
            approved: false,
            payoutAmount: 0
        });

        claimsByFarmer[msg.sender].push(claimId);
        emit ClaimSubmitted(claimId, msg.sender, lossAmount);
        return claimId;
    }

    function approveClaim(uint256 claimId, uint256 payoutAmount) public onlyOwner {
        require(!claims[claimId].approved, "Already approved");
        claims[claimId].approved = true;
        claims[claimId].payoutAmount = payoutAmount;
    }

    function getClaim(uint256 claimId) public view returns (YieldClaim memory) {
        return claims[claimId];
    }
}
