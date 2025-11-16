// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLoanRepaymentTracking
 * @dev Loan repayment tracking system
 */
contract FarmLoanRepaymentTracking is Ownable {
    struct Loan {
        uint256 loanId;
        address borrower;
        address lender;
        uint256 principal;
        uint256 interestRate;
        uint256 totalAmount;
        uint256 paidAmount;
        uint256 dueDate;
        bool repaid;
    }

    struct Payment {
        uint256 paymentId;
        uint256 loanId;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Loan) public loans;
    mapping(uint256 => Payment[]) public paymentsByLoan;
    mapping(address => uint256[]) public loansByBorrower;
    uint256 private _loanIdCounter;
    uint256 private _paymentIdCounter;

    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 principal);
    event PaymentMade(uint256 indexed loanId, uint256 amount);
    event LoanRepaid(uint256 indexed loanId);

    constructor() Ownable(msg.sender) {}

    function createLoan(
        address lender,
        uint256 principal,
        uint256 interestRate,
        uint256 dueDate
    ) public returns (uint256) {
        require(principal > 0, "Invalid principal");
        uint256 totalAmount = principal + (principal * interestRate / 100);
        uint256 loanId = _loanIdCounter++;
        loans[loanId] = Loan({
            loanId: loanId,
            borrower: msg.sender,
            lender: lender,
            principal: principal,
            interestRate: interestRate,
            totalAmount: totalAmount,
            paidAmount: 0,
            dueDate: dueDate,
            repaid: false
        });
        loansByBorrower[msg.sender].push(loanId);
        emit LoanCreated(loanId, msg.sender, principal);
        return loanId;
    }

    function makePayment(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];
        require(loan.borrower == msg.sender, "Not the borrower");
        require(!loan.repaid, "Already repaid");
        require(msg.value > 0, "Invalid payment");
        
        loan.paidAmount += msg.value;
        paymentsByLoan[loanId].push(Payment({
            paymentId: _paymentIdCounter++,
            loanId: loanId,
            amount: msg.value,
            timestamp: block.timestamp
        }));
        
        if (loan.paidAmount >= loan.totalAmount) {
            loan.repaid = true;
            emit LoanRepaid(loanId);
        }
        payable(loan.lender).transfer(msg.value);
        emit PaymentMade(loanId, msg.value);
    }
}

