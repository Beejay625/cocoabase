// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCarbonCreditIssuance
 * @dev Carbon credit minting and issuance system for sustainable practices
 */
contract FarmCarbonCreditIssuance is Ownable {
    struct CarbonCredit {
        uint256 creditId;
        address farmer;
        uint256 carbonSequestration;
        uint256 creditAmount;
        uint256 issueDate;
        uint256 expiryDate;
        string verificationHash;
        bool verified;
        bool retired;
    }

    mapping(uint256 => CarbonCredit) public credits;
    mapping(address => uint256[]) public creditsByFarmer;
    uint256 private _creditIdCounter;

    event CreditIssued(
        uint256 indexed creditId,
        address indexed farmer,
        uint256 creditAmount
    );

    event CreditRetired(
        uint256 indexed creditId,
        address indexed retirer
    );

    constructor() Ownable(msg.sender) {}

    function issueCredit(
        address farmer,
        uint256 carbonSequestration,
        uint256 creditAmount,
        uint256 validityDays,
        string memory verificationHash
    ) public onlyOwner returns (uint256) {
        uint256 creditId = _creditIdCounter++;
        credits[creditId] = CarbonCredit({
            creditId: creditId,
            farmer: farmer,
            carbonSequestration: carbonSequestration,
            creditAmount: creditAmount,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + (validityDays * 1 days),
            verificationHash: verificationHash,
            verified: true,
            retired: false
        });

        creditsByFarmer[farmer].push(creditId);
        emit CreditIssued(creditId, farmer, creditAmount);
        return creditId;
    }

    function retireCredit(uint256 creditId) public {
        require(credits[creditId].farmer == msg.sender, "Not authorized");
        require(!credits[creditId].retired, "Already retired");
        require(block.timestamp <= credits[creditId].expiryDate, "Credit expired");
        credits[creditId].retired = true;
        emit CreditRetired(creditId, msg.sender);
    }

    function getCredit(uint256 creditId) public view returns (CarbonCredit memory) {
        return credits[creditId];
    }
}
