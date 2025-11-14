// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFarmerCooperative
 * @dev Onchain farmer cooperative management
 */
contract FarmFarmerCooperative is Ownable {
    struct CooperativeMember {
        address farmer;
        uint256 shares;
        uint256 joinDate;
        bool isActive;
        uint256 contribution;
    }

    struct Proposal {
        uint256 proposalId;
        address proposer;
        string description;
        uint256 votingDeadline;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(address => CooperativeMember) public members;
    mapping(uint256 => Proposal) public proposals;
    address[] public memberList;
    uint256 private _proposalIdCounter;
    uint256 public totalShares;
    uint256 public minimumShares;

    event MemberJoined(address indexed farmer, uint256 shares, uint256 contribution);
    event MemberLeft(address indexed farmer);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor(uint256 _minimumShares) Ownable(msg.sender) {
        minimumShares = _minimumShares;
    }

    function joinCooperative(uint256 shares) public payable {
        require(msg.value > 0, "Contribution required");
        require(shares >= minimumShares, "Insufficient shares");
        require(!members[msg.sender].isActive, "Already a member");

        members[msg.sender] = CooperativeMember({
            farmer: msg.sender,
            shares: shares,
            joinDate: block.timestamp,
            isActive: true,
            contribution: msg.value
        });

        memberList.push(msg.sender);
        totalShares += shares;

        emit MemberJoined(msg.sender, shares, msg.value);
    }

    function leaveCooperative() public {
        require(members[msg.sender].isActive, "Not a member");

        members[msg.sender].isActive = false;
        totalShares -= members[msg.sender].shares;

        emit MemberLeft(msg.sender);
    }

    function createProposal(
        string memory description,
        uint256 votingDeadline
    ) public returns (uint256) {
        require(members[msg.sender].isActive, "Not a member");
        require(votingDeadline > block.timestamp, "Invalid deadline");

        uint256 proposalId = _proposalIdCounter++;
        Proposal storage proposal = proposals[proposalId];
        proposal.proposalId = proposalId;
        proposal.proposer = msg.sender;
        proposal.description = description;
        proposal.votingDeadline = votingDeadline;
        proposal.votesFor = 0;
        proposal.votesAgainst = 0;
        proposal.executed = false;

        emit ProposalCreated(proposalId, msg.sender, description);
        return proposalId;
    }

    function vote(uint256 proposalId, bool support) public {
        require(members[msg.sender].isActive, "Not a member");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(block.timestamp <= proposal.votingDeadline, "Voting closed");
        require(!proposal.executed, "Already executed");

        proposal.hasVoted[msg.sender] = true;
        if (support) {
            proposal.votesFor += members[msg.sender].shares;
        } else {
            proposal.votesAgainst += members[msg.sender].shares;
        }

        emit VoteCast(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.votingDeadline, "Voting not closed");
        require(!proposal.executed, "Already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal not passed");

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    function getMember(address farmer) public view returns (CooperativeMember memory) {
        return members[farmer];
    }

    function getMemberCount() public view returns (uint256) {
        return memberList.length;
    }
}

