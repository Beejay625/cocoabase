// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLandLeasing
 * @dev Onchain land leasing agreements
 */
contract FarmLandLeasing is Ownable {
    struct LeaseAgreement {
        uint256 leaseId;
        address landowner;
        address tenant;
        uint256 landId;
        uint256 leaseStartDate;
        uint256 leaseEndDate;
        uint256 monthlyRent;
        uint256 deposit;
        bool isActive;
        bool depositReturned;
    }

    mapping(uint256 => LeaseAgreement) public leaseAgreements;
    mapping(address => uint256[]) public leasesByLandowner;
    mapping(address => uint256[]) public leasesByTenant;
    uint256 private _leaseIdCounter;

    event LeaseCreated(
        uint256 indexed leaseId,
        address indexed landowner,
        address indexed tenant,
        uint256 landId,
        uint256 monthlyRent
    );

    event LeaseTerminated(
        uint256 indexed leaseId,
        address indexed landowner,
        address indexed tenant
    );

    event DepositReturned(
        uint256 indexed leaseId,
        address indexed tenant,
        uint256 deposit
    );

    constructor() Ownable(msg.sender) {}

    function createLease(
        address tenant,
        uint256 landId,
        uint256 leaseStartDate,
        uint256 leaseEndDate,
        uint256 monthlyRent
    ) public payable returns (uint256) {
        require(msg.value >= monthlyRent, "Insufficient deposit");
        require(leaseEndDate > leaseStartDate, "Invalid lease period");

        uint256 leaseId = _leaseIdCounter++;
        leaseAgreements[leaseId] = LeaseAgreement({
            leaseId: leaseId,
            landowner: msg.sender,
            tenant: tenant,
            landId: landId,
            leaseStartDate: leaseStartDate,
            leaseEndDate: leaseEndDate,
            monthlyRent: monthlyRent,
            deposit: msg.value,
            isActive: true,
            depositReturned: false
        });

        leasesByLandowner[msg.sender].push(leaseId);
        leasesByTenant[tenant].push(leaseId);

        emit LeaseCreated(leaseId, msg.sender, tenant, landId, monthlyRent);
        return leaseId;
    }

    function terminateLease(uint256 leaseId) public {
        require(
            leaseAgreements[leaseId].landowner == msg.sender ||
            leaseAgreements[leaseId].tenant == msg.sender,
            "Not authorized"
        );
        require(leaseAgreements[leaseId].isActive, "Lease not active");

        leaseAgreements[leaseId].isActive = false;

        if (
            leaseAgreements[leaseId].tenant == msg.sender &&
            !leaseAgreements[leaseId].depositReturned
        ) {
            leaseAgreements[leaseId].depositReturned = true;
            payable(leaseAgreements[leaseId].tenant).transfer(
                leaseAgreements[leaseId].deposit
            );
            emit DepositReturned(
                leaseId,
                leaseAgreements[leaseId].tenant,
                leaseAgreements[leaseId].deposit
            );
        }

        emit LeaseTerminated(
            leaseId,
            leaseAgreements[leaseId].landowner,
            leaseAgreements[leaseId].tenant
        );
    }

    function getLeaseAgreement(uint256 leaseId) public view returns (LeaseAgreement memory) {
        return leaseAgreements[leaseId];
    }

    function getLeasesByLandowner(address landowner) public view returns (uint256[] memory) {
        return leasesByLandowner[landowner];
    }

    function getLeasesByTenant(address tenant) public view returns (uint256[] memory) {
        return leasesByTenant[tenant];
    }
}

