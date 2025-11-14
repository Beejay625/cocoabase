// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmInsurancePool
 * @dev Onchain insurance pool for collective risk sharing among farmers
 */
contract FarmInsurancePool is Ownable {
    struct PoolMember {
        address member;
        uint256 contribution;
        uint256 joinDate;
        bool active;
    }

    struct Claim {
        uint256 claimId;
        address claimant;
        uint256 claimAmount;
        uint256 claimDate;
        bool approved;
        bool paid;
    }

    mapping(address => PoolMember) public members;
    mapping(uint256 => Claim) public claims;
    address[] public memberList;
    uint256 private _claimIdCounter;
    uint256 public totalPoolFunds;

    event MemberJoined(address indexed member, uint256 contribution);
    event ClaimFiled(uint256 indexed claimId, address indexed claimant, uint256 amount);
    event ClaimApproved(uint256 indexed claimId, uint256 amount);
    event ClaimPaid(uint256 indexed claimId, address indexed claimant, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function joinPool(uint256 contribution) public payable {
        require(msg.value >= contribution, "Insufficient payment");
        require(!members[msg.sender].active, "Already a member");

        members[msg.sender] = PoolMember({
            member: msg.sender,
            contribution: contribution,
            joinDate: block.timestamp,
            active: true
        });

        memberList.push(msg.sender);
        totalPoolFunds += contribution;

        emit MemberJoined(msg.sender, contribution);
    }

    function fileClaim(uint256 claimAmount) public returns (uint256) {
        require(members[msg.sender].active, "Not a pool member");
        require(claimAmount <= totalPoolFunds, "Claim exceeds pool funds");

        uint256 claimId = _claimIdCounter++;
        claims[claimId] = Claim({
            claimId: claimId,
            claimant: msg.sender,
            claimAmount: claimAmount,
            claimDate: block.timestamp,
            approved: false,
            paid: false
        });

        emit ClaimFiled(claimId, msg.sender, claimAmount);
        return claimId;
    }

    function approveClaim(uint256 claimId) public onlyOwner {
        require(!claims[claimId].approved, "Already approved");
        claims[claimId].approved = true;

        emit ClaimApproved(claimId, claims[claimId].claimAmount);
    }

    function payClaim(uint256 claimId) public onlyOwner {
        require(claims[claimId].approved, "Claim not approved");
        require(!claims[claimId].paid, "Already paid");
        require(claims[claimId].claimAmount <= totalPoolFunds, "Insufficient funds");

        claims[claimId].paid = true;
        totalPoolFunds -= claims[claimId].claimAmount;

        payable(claims[claimId].claimant).transfer(claims[claimId].claimAmount);

        emit ClaimPaid(claimId, claims[claimId].claimant, claims[claimId].claimAmount);
    }
}

