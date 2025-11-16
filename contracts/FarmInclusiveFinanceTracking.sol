// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmInclusiveFinanceTracking
 * @dev Track inclusive finance access, credit history, and financial inclusion scores
 */
contract FarmInclusiveFinanceTracking is Ownable {
    struct FinanceRecord {
        uint256 recordId;
        address farmer;
        uint256 creditLimit;
        uint256 outstandingBalance;
        uint256 onTimeRepayments;
        uint256 lateRepayments;
        uint256 inclusionScore;
        uint256 lastUpdated;
    }

    mapping(address => FinanceRecord) public financeByFarmer;
    uint256 private _recordIdCounter;

    event FinanceProfileUpdated(
        uint256 indexed recordId,
        address indexed farmer,
        uint256 inclusionScore
    );

    constructor() Ownable(msg.sender) {}

    function updateFinanceProfile(
        address farmer,
        uint256 creditLimit,
        uint256 outstandingBalance,
        uint256 onTimeRepayments,
        uint256 lateRepayments,
        uint256 inclusionScore
    ) public onlyOwner returns (uint256) {
        uint256 recordId = _recordIdCounter++;
        financeByFarmer[farmer] = FinanceRecord({
            recordId: recordId,
            farmer: farmer,
            creditLimit: creditLimit,
            outstandingBalance: outstandingBalance,
            onTimeRepayments: onTimeRepayments,
            lateRepayments: lateRepayments,
            inclusionScore: inclusionScore,
            lastUpdated: block.timestamp
        });

        emit FinanceProfileUpdated(recordId, farmer, inclusionScore);
        return recordId;
    }

    function getFinanceProfile(address farmer) public view returns (FinanceRecord memory) {
        return financeByFarmer[farmer];
    }
}


