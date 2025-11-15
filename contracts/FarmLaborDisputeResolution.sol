// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLaborDisputeResolution
 * @dev Onchain dispute resolution system for labor contracts
 */
contract FarmLaborDisputeResolution is Ownable {
    enum DisputeStatus { Pending, UnderReview, Resolved, Rejected }

    struct Dispute {
        uint256 disputeId;
        address initiator;
        address respondent;
        uint256 contractId;
        string description;
        uint256 amount;
        DisputeStatus status;
        uint256 createdAt;
        address arbitrator;
        string resolution;
    }

    mapping(uint256 => Dispute) public disputes;
    mapping(address => uint256[]) public disputesByInitiator;
    mapping(address => uint256[]) public disputesByRespondent;
    uint256 private _disputeIdCounter;

    event DisputeCreated(
        uint256 indexed disputeId,
        address indexed initiator,
        address indexed respondent,
        uint256 contractId
    );

    event DisputeResolved(
        uint256 indexed disputeId,
        address indexed arbitrator,
        string resolution
    );

    constructor() Ownable(msg.sender) {}

    function createDispute(
        address respondent,
        uint256 contractId,
        string memory description,
        uint256 amount
    ) public returns (uint256) {
        require(respondent != address(0), "Invalid respondent");
        require(bytes(description).length > 0, "Description required");

        uint256 disputeId = _disputeIdCounter++;
        disputes[disputeId] = Dispute({
            disputeId: disputeId,
            initiator: msg.sender,
            respondent: respondent,
            contractId: contractId,
            description: description,
            amount: amount,
            status: DisputeStatus.Pending,
            createdAt: block.timestamp,
            arbitrator: address(0),
            resolution: ""
        });

        disputesByInitiator[msg.sender].push(disputeId);
        disputesByRespondent[respondent].push(disputeId);

        emit DisputeCreated(disputeId, msg.sender, respondent, contractId);
        return disputeId;
    }

    function resolveDispute(
        uint256 disputeId,
        string memory resolution,
        bool favorInitiator
    ) public onlyOwner {
        require(disputes[disputeId].status == DisputeStatus.Pending, "Dispute not pending");

        disputes[disputeId].status = DisputeStatus.Resolved;
        disputes[disputeId].arbitrator = msg.sender;
        disputes[disputeId].resolution = resolution;

        if (favorInitiator && disputes[disputeId].amount > 0) {
            payable(disputes[disputeId].initiator).transfer(disputes[disputeId].amount);
        }

        emit DisputeResolved(disputeId, msg.sender, resolution);
    }

    function getDispute(uint256 disputeId) public view returns (Dispute memory) {
        return disputes[disputeId];
    }
}

