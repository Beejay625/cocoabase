// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmInvestmentTracking
 * @dev Onchain investment tracking
 */
contract FarmInvestmentTracking is Ownable {
    struct Investment {
        uint256 investmentId;
        address investor;
        uint256 amount;
        uint256 date;
        string investmentType;
        uint256 expectedReturn;
        uint256 actualReturn;
        bool completed;
    }

    mapping(uint256 => Investment) public investments;
    mapping(address => uint256[]) public investmentsByInvestor;
    uint256 private _investmentIdCounter;

    event InvestmentMade(
        uint256 indexed investmentId,
        address indexed investor,
        uint256 amount
    );

    event ReturnRecorded(
        uint256 indexed investmentId,
        uint256 actualReturn
    );

    constructor() Ownable(msg.sender) {}

    function recordInvestment(
        uint256 amount,
        string memory investmentType,
        uint256 expectedReturn
    ) public returns (uint256) {
        uint256 investmentId = _investmentIdCounter++;
        investments[investmentId] = Investment({
            investmentId: investmentId,
            investor: msg.sender,
            amount: amount,
            date: block.timestamp,
            investmentType: investmentType,
            expectedReturn: expectedReturn,
            actualReturn: 0,
            completed: false
        });

        investmentsByInvestor[msg.sender].push(investmentId);

        emit InvestmentMade(investmentId, msg.sender, amount);
        return investmentId;
    }

    function recordReturn(uint256 investmentId, uint256 actualReturn) public {
        Investment storage investment = investments[investmentId];
        require(investment.investor == msg.sender, "Not the investor");
        require(!investment.completed, "Already completed");

        investment.actualReturn = actualReturn;
        investment.completed = true;

        emit ReturnRecorded(investmentId, actualReturn);
    }

    function getInvestment(uint256 investmentId) public view returns (Investment memory) {
        return investments[investmentId];
    }

    function getInvestmentsByInvestor(address investor) public view returns (uint256[] memory) {
        return investmentsByInvestor[investor];
    }
}

