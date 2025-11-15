// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmContractEnforcement
 * @dev Onchain smart contract enforcement and escrow system
 */
contract FarmContractEnforcement is Ownable {
    enum ContractStatus { Active, Completed, Breached, Cancelled }

    struct EnforcedContract {
        uint256 contractId;
        address partyA;
        address partyB;
        string contractTerms;
        uint256 escrowAmount;
        uint256 deadline;
        ContractStatus status;
        address arbitrator;
    }

    mapping(uint256 => EnforcedContract) public contracts;
    mapping(address => uint256[]) public contractsByParty;
    uint256 private _contractIdCounter;

    event ContractCreated(
        uint256 indexed contractId,
        address indexed partyA,
        address indexed partyB,
        uint256 escrowAmount
    );

    event ContractCompleted(
        uint256 indexed contractId,
        address indexed partyA,
        address indexed partyB
    );

    event ContractBreached(
        uint256 indexed contractId,
        address indexed breachingParty
    );

    constructor() Ownable(msg.sender) {}

    function createContract(
        address partyB,
        string memory contractTerms,
        uint256 deadline
    ) public payable returns (uint256) {
        require(partyB != address(0), "Invalid party");
        require(msg.value > 0, "Escrow amount required");
        require(deadline > block.timestamp, "Invalid deadline");

        uint256 contractId = _contractIdCounter++;
        contracts[contractId] = EnforcedContract({
            contractId: contractId,
            partyA: msg.sender,
            partyB: partyB,
            contractTerms: contractTerms,
            escrowAmount: msg.value,
            deadline: deadline,
            status: ContractStatus.Active,
            arbitrator: address(0)
        });

        contractsByParty[msg.sender].push(contractId);
        contractsByParty[partyB].push(contractId);

        emit ContractCreated(contractId, msg.sender, partyB, msg.value);
        return contractId;
    }

    function completeContract(uint256 contractId) public {
        EnforcedContract storage contract_ = contracts[contractId];
        require(contract_.status == ContractStatus.Active, "Contract not active");
        require(msg.sender == contract_.partyA || msg.sender == contract_.partyB, "Not a party");

        contract_.status = ContractStatus.Completed;
        payable(contract_.partyA).transfer(contract_.escrowAmount);

        emit ContractCompleted(contractId, contract_.partyA, contract_.partyB);
    }

    function reportBreach(uint256 contractId) public {
        EnforcedContract storage contract_ = contracts[contractId];
        require(contract_.status == ContractStatus.Active, "Contract not active");
        require(msg.sender == contract_.partyA || msg.sender == contract_.partyB, "Not a party");

        contract_.status = ContractStatus.Breached;
        emit ContractBreached(contractId, msg.sender);
    }

    function resolveBreach(uint256 contractId, address beneficiary) public onlyOwner {
        EnforcedContract storage contract_ = contracts[contractId];
        require(contract_.status == ContractStatus.Breached, "Contract not breached");

        payable(beneficiary).transfer(contract_.escrowAmount);
    }

    function getContract(uint256 contractId) public view returns (EnforcedContract memory) {
        return contracts[contractId];
    }
}

