// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPrecisionSeeding
 * @dev Onchain precision seeding operations and seed placement tracking
 */
contract FarmPrecisionSeeding is Ownable {
    struct SeedingOperation {
        uint256 operationId;
        address farmer;
        string fieldId;
        string seedType;
        uint256 seedsPerHectare;
        uint256 depth;
        string spacing;
        uint256 operationDate;
        uint256 accuracy;
    }

    mapping(uint256 => SeedingOperation) public operations;
    mapping(address => uint256[]) public operationsByFarmer;
    uint256 private _operationIdCounter;

    event OperationRecorded(
        uint256 indexed operationId,
        address indexed farmer,
        string fieldId,
        uint256 seedsPerHectare
    );

    constructor() Ownable(msg.sender) {}

    function recordOperation(
        string memory fieldId,
        string memory seedType,
        uint256 seedsPerHectare,
        uint256 depth,
        string memory spacing,
        uint256 accuracy
    ) public returns (uint256) {
        uint256 operationId = _operationIdCounter++;
        operations[operationId] = SeedingOperation({
            operationId: operationId,
            farmer: msg.sender,
            fieldId: fieldId,
            seedType: seedType,
            seedsPerHectare: seedsPerHectare,
            depth: depth,
            spacing: spacing,
            operationDate: block.timestamp,
            accuracy: accuracy
        });

        operationsByFarmer[msg.sender].push(operationId);
        emit OperationRecorded(operationId, msg.sender, fieldId, seedsPerHectare);
        return operationId;
    }

    function getOperation(uint256 operationId) public view returns (SeedingOperation memory) {
        return operations[operationId];
    }
}
