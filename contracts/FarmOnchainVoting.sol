// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmOnchainVoting
 * @dev Decentralized autonomous organization voting for farm cooperatives
 */
contract FarmOnchainVoting is Ownable {
    struct Proposal {
        uint256 proposalId;
        address proposer;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => bool) public isMember;
    uint256 private _proposalIdCounter;
    uint256 public votingPeriod = 7 days;
    uint256 public quorumThreshold = 50; // percentage

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor() Ownable(msg.sender) {}

    function addMember(address member) public onlyOwner {
        isMember[member] = true;
    }

    function createProposal(string memory description) public returns (uint256) {
        require(isMember[msg.sender], "Not a member");
        uint256 proposalId = _proposalIdCounter++;
        proposals[proposalId] = Proposal({
            proposalId: proposalId,
            proposer: msg.sender,
            description: description,
            startTime: block.timestamp,
            endTime: block.timestamp + votingPeriod,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        });
        emit ProposalCreated(proposalId, msg.sender);
        return proposalId;
    }

    function vote(uint256 proposalId, bool support) public {
        require(isMember[msg.sender], "Not a member");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(block.timestamp < proposals[proposalId].endTime, "Voting ended");
        
        hasVoted[proposalId][msg.sender] = true;
        if (support) {
            proposals[proposalId].forVotes++;
        } else {
            proposals[proposalId].againstVotes++;
        }
        emit VoteCast(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.endTime, "Voting ongoing");
        require(!proposal.executed, "Already executed");
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        require(totalVotes > 0, "No votes");
        require((proposal.forVotes * 100) / totalVotes >= quorumThreshold, "Quorum not met");
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
}

