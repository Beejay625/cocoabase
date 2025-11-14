// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCooperativeVoting
 * @dev Onchain voting system for farm cooperatives
 */
contract FarmCooperativeVoting is Ownable {
    struct Proposal {
        uint256 proposalId;
        string description;
        address proposer;
        uint256 startDate;
        uint256 endDate;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => bool) public members;
    uint256 private _proposalIdCounter;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor() Ownable(msg.sender) {}

    function addMember(address member) public onlyOwner {
        members[member] = true;
    }

    function createProposal(
        string memory description,
        uint256 votingDuration
    ) public returns (uint256) {
        require(members[msg.sender], "Not a member");

        uint256 proposalId = _proposalIdCounter++;
        proposals[proposalId] = Proposal({
            proposalId: proposalId,
            description: description,
            proposer: msg.sender,
            startDate: block.timestamp,
            endDate: block.timestamp + votingDuration,
            yesVotes: 0,
            noVotes: 0,
            executed: false
        });

        emit ProposalCreated(proposalId, msg.sender, description);
        return proposalId;
    }

    function vote(uint256 proposalId, bool support) public {
        require(members[msg.sender], "Not a member");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(block.timestamp <= proposals[proposalId].endDate, "Voting ended");
        require(!proposals[proposalId].executed, "Proposal executed");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposals[proposalId].yesVotes++;
        } else {
            proposals[proposalId].noVotes++;
        }

        emit VoteCast(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) public {
        require(block.timestamp > proposals[proposalId].endDate, "Voting not ended");
        require(!proposals[proposalId].executed, "Already executed");
        require(proposals[proposalId].yesVotes > proposals[proposalId].noVotes, "Proposal failed");

        proposals[proposalId].executed = true;

        emit ProposalExecuted(proposalId);
    }

    function getProposal(uint256 proposalId) public view returns (Proposal memory) {
        return proposals[proposalId];
    }
}

