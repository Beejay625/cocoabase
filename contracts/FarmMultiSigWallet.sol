// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmMultiSigWallet
 * @dev Multi-signature wallet for cooperative funds
 */
contract FarmMultiSigWallet is Ownable {
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 approvalCount;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public approvals;
    mapping(address => bool) public isSigner;
    uint256 public requiredSignatures;
    uint256 private _txIdCounter;

    event TransactionProposed(uint256 indexed txId, address indexed proposer);
    event TransactionApproved(uint256 indexed txId, address indexed signer);
    event TransactionExecuted(uint256 indexed txId);

    constructor(address[] memory signers, uint256 _requiredSignatures) Ownable(msg.sender) {
        require(_requiredSignatures > 0, "Invalid required signatures");
        require(signers.length >= _requiredSignatures, "Not enough signers");
        
        for (uint256 i = 0; i < signers.length; i++) {
            isSigner[signers[i]] = true;
        }
        requiredSignatures = _requiredSignatures;
    }

    function proposeTransaction(
        address to,
        uint256 value,
        bytes memory data
    ) public returns (uint256) {
        require(isSigner[msg.sender], "Not a signer");
        uint256 txId = _txIdCounter++;
        transactions[txId] = Transaction({
            to: to,
            value: value,
            data: data,
            executed: false,
            approvalCount: 0
        });
        emit TransactionProposed(txId, msg.sender);
        return txId;
    }

    function approveTransaction(uint256 txId) public {
        require(isSigner[msg.sender], "Not a signer");
        require(!approvals[txId][msg.sender], "Already approved");
        require(!transactions[txId].executed, "Already executed");
        
        approvals[txId][msg.sender] = true;
        transactions[txId].approvalCount++;
        emit TransactionApproved(txId, msg.sender);
    }

    function executeTransaction(uint256 txId) public {
        Transaction storage tx_ = transactions[txId];
        require(tx_.approvalCount >= requiredSignatures, "Insufficient approvals");
        require(!tx_.executed, "Already executed");
        require(address(this).balance >= tx_.value, "Insufficient balance");
        
        tx_.executed = true;
        (bool success, ) = tx_.to.call{value: tx_.value}(tx_.data);
        require(success, "Execution failed");
        emit TransactionExecuted(txId);
    }

    receive() external payable {}
}

