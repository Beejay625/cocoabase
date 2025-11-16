// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLandLeasePayments
 * @dev Automated land lease payment tracking and processing
 */
contract FarmLandLeasePayments is Ownable {
    struct LeaseAgreement {
        uint256 leaseId;
        address landowner;
        address tenant;
        uint256 monthlyRent;
        uint256 leaseStartDate;
        uint256 leaseEndDate;
        bool active;
    }

    struct PaymentRecord {
        uint256 paymentId;
        uint256 leaseId;
        uint256 amount;
        uint256 dueDate;
        uint256 paidDate;
        bool paid;
    }

    mapping(uint256 => LeaseAgreement) public leases;
    mapping(uint256 => PaymentRecord[]) public paymentsByLease;
    uint256 private _leaseIdCounter;
    uint256 private _paymentIdCounter;

    event LeaseCreated(
        uint256 indexed leaseId,
        address indexed landowner,
        address indexed tenant
    );

    event PaymentMade(
        uint256 indexed paymentId,
        uint256 indexed leaseId,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function createLease(
        address tenant,
        uint256 monthlyRent,
        uint256 leaseStartDate,
        uint256 leaseEndDate
    ) public returns (uint256) {
        uint256 leaseId = _leaseIdCounter++;
        leases[leaseId] = LeaseAgreement({
            leaseId: leaseId,
            landowner: msg.sender,
            tenant: tenant,
            monthlyRent: monthlyRent,
            leaseStartDate: leaseStartDate,
            leaseEndDate: leaseEndDate,
            active: true
        });

        emit LeaseCreated(leaseId, msg.sender, tenant);
        return leaseId;
    }

    function makePayment(uint256 leaseId) public payable {
        require(leases[leaseId].tenant == msg.sender, "Not authorized");
        require(leases[leaseId].active, "Lease not active");
        require(msg.value == leases[leaseId].monthlyRent, "Incorrect amount");
        uint256 paymentId = _paymentIdCounter++;
        paymentsByLease[leaseId].push(PaymentRecord({
            paymentId: paymentId,
            leaseId: leaseId,
            amount: msg.value,
            dueDate: block.timestamp,
            paidDate: block.timestamp,
            paid: true
        }));
        payable(leases[leaseId].landowner).transfer(msg.value);
        emit PaymentMade(paymentId, leaseId, msg.value);
    }

    function getLease(uint256 leaseId) public view returns (LeaseAgreement memory) {
        return leases[leaseId];
    }
}
