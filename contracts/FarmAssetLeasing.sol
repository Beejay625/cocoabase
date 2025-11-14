// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAssetLeasing
 * @dev Onchain system for leasing farm assets
 */
contract FarmAssetLeasing is Ownable {
    struct Lease {
        uint256 leaseId;
        uint256 assetId;
        address lessor;
        address lessee;
        uint256 monthlyRent;
        uint256 startDate;
        uint256 endDate;
        bool active;
    }

    mapping(uint256 => Lease) public leases;
    mapping(address => uint256[]) public leasesByLessor;
    mapping(address => uint256[]) public leasesByLessee;
    uint256 private _leaseIdCounter;

    event LeaseCreated(
        uint256 indexed leaseId,
        address indexed lessor,
        address indexed lessee,
        uint256 monthlyRent
    );

    event LeaseTerminated(uint256 indexed leaseId);

    constructor() Ownable(msg.sender) {}

    function createLease(
        uint256 assetId,
        address lessee,
        uint256 monthlyRent,
        uint256 duration
    ) public returns (uint256) {
        uint256 leaseId = _leaseIdCounter++;
        leases[leaseId] = Lease({
            leaseId: leaseId,
            assetId: assetId,
            lessor: msg.sender,
            lessee: lessee,
            monthlyRent: monthlyRent,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            active: true
        });

        leasesByLessor[msg.sender].push(leaseId);
        leasesByLessee[lessee].push(leaseId);

        emit LeaseCreated(leaseId, msg.sender, lessee, monthlyRent);
        return leaseId;
    }

    function payRent(uint256 leaseId) public payable {
        require(leases[leaseId].active, "Lease not active");
        require(msg.sender == leases[leaseId].lessee, "Not the lessee");
        require(msg.value >= leases[leaseId].monthlyRent, "Insufficient payment");

        payable(leases[leaseId].lessor).transfer(msg.value);
    }

    function terminateLease(uint256 leaseId) public {
        require(leases[leaseId].active, "Lease not active");
        require(
            msg.sender == leases[leaseId].lessor || msg.sender == leases[leaseId].lessee,
            "Not authorized"
        );

        leases[leaseId].active = false;

        emit LeaseTerminated(leaseId);
    }

    function getLease(uint256 leaseId) public view returns (Lease memory) {
        return leases[leaseId];
    }
}

