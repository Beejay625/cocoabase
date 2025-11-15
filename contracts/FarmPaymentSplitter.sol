// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPaymentSplitter
 * @dev Automated payment splitting for multi-party transactions
 */
contract FarmPaymentSplitter is Ownable {
    struct Split {
        address recipient;
        uint256 share;
    }

    mapping(uint256 => Split[]) public splits;
    mapping(uint256 => bool) public executed;
    uint256 private _splitIdCounter;

    event SplitCreated(uint256 indexed splitId, uint256 recipientCount);
    event PaymentSplit(uint256 indexed splitId, address indexed recipient, uint256 amount);
    event SplitExecuted(uint256 indexed splitId, uint256 totalAmount);

    constructor() Ownable(msg.sender) {}

    function createSplit(Split[] memory recipients) public returns (uint256) {
        require(recipients.length > 0, "No recipients");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            totalShares += recipients[i].share;
            splits[_splitIdCounter].push(recipients[i]);
        }
        require(totalShares == 100, "Shares must equal 100");
        uint256 splitId = _splitIdCounter++;
        emit SplitCreated(splitId, recipients.length);
        return splitId;
    }

    function executeSplit(uint256 splitId) public payable {
        require(!executed[splitId], "Already executed");
        require(msg.value > 0, "No payment");
        require(splits[splitId].length > 0, "Split not found");
        
        executed[splitId] = true;
        uint256 totalAmount = msg.value;
        
        for (uint256 i = 0; i < splits[splitId].length; i++) {
            uint256 amount = (totalAmount * splits[splitId][i].share) / 100;
            payable(splits[splitId][i].recipient).transfer(amount);
            emit PaymentSplit(splitId, splits[splitId][i].recipient, amount);
        }
        emit SplitExecuted(splitId, totalAmount);
    }

    receive() external payable {}
}

