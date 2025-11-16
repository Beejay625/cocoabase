// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmBulkPurchaseAgreements
 * @dev Bulk purchase agreements and group buying
 */
contract FarmBulkPurchaseAgreements is Ownable {
    struct BulkPurchase {
        uint256 purchaseId;
        address buyer;
        string productType;
        uint256 totalQuantity;
        uint256 committedQuantity;
        uint256 pricePerUnit;
        uint256 deadline;
        bool fulfilled;
    }

    struct Commitment {
        uint256 commitmentId;
        uint256 purchaseId;
        address seller;
        uint256 quantity;
    }

    mapping(uint256 => BulkPurchase) public purchases;
    mapping(uint256 => Commitment[]) public commitmentsByPurchase;
    mapping(address => uint256[]) public purchasesByBuyer;
    uint256 private _purchaseIdCounter;
    uint256 private _commitmentIdCounter;

    event PurchaseCreated(
        uint256 indexed purchaseId,
        address indexed buyer,
        uint256 totalQuantity
    );

    event CommitmentMade(
        uint256 indexed commitmentId,
        uint256 indexed purchaseId,
        address indexed seller,
        uint256 quantity
    );

    constructor() Ownable(msg.sender) {}

    function createPurchase(
        string memory productType,
        uint256 totalQuantity,
        uint256 pricePerUnit,
        uint256 deadline
    ) public returns (uint256) {
        uint256 purchaseId = _purchaseIdCounter++;
        purchases[purchaseId] = BulkPurchase({
            purchaseId: purchaseId,
            buyer: msg.sender,
            productType: productType,
            totalQuantity: totalQuantity,
            committedQuantity: 0,
            pricePerUnit: pricePerUnit,
            deadline: deadline,
            fulfilled: false
        });

        purchasesByBuyer[msg.sender].push(purchaseId);
        emit PurchaseCreated(purchaseId, msg.sender, totalQuantity);
        return purchaseId;
    }

    function makeCommitment(uint256 purchaseId, uint256 quantity) public {
        require(block.timestamp <= purchases[purchaseId].deadline, "Deadline passed");
        require(purchases[purchaseId].committedQuantity + quantity <= purchases[purchaseId].totalQuantity, "Exceeds total");
        uint256 commitmentId = _commitmentIdCounter++;
        commitmentsByPurchase[purchaseId].push(Commitment({
            commitmentId: commitmentId,
            purchaseId: purchaseId,
            seller: msg.sender,
            quantity: quantity
        }));
        purchases[purchaseId].committedQuantity += quantity;
        emit CommitmentMade(commitmentId, purchaseId, msg.sender, quantity);
    }

    function getPurchase(uint256 purchaseId) public view returns (BulkPurchase memory) {
        return purchases[purchaseId];
    }
}
