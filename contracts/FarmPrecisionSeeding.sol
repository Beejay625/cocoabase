// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPrecisionSeeding
 * @dev Precision seeding operations and seed placement tracking
 */
contract FarmPrecisionSeeding is Ownable {
    struct SeedingOperation {
        uint256 operationId;
        address farmer;
        string fieldId;
        string cropType;
        uint256 seedsPlanted;
        uint256 spacingDistance;
        uint256 operationDate;
    }

    mapping(uint256 => SeedingOperation) public operations;
    mapping(address => uint256[]) public operationsByFarmer;
    uint256 private _operationIdCounter;

    event OperationRecorded(
        uint256 indexed operationId,
        address indexed farmer,
        string cropType
    );

    constructor() Ownable(msg.sender) {}

    function recordOperation(
        string memory fieldId,
        string memory cropType,
        uint256 seedsPlanted,
        uint256 spacingDistance
    ) public returns (uint256) {
        uint256 operationId = _operationIdCounter++;
        operations[operationId] = SeedingOperation({
            operationId: operationId,
            farmer: msg.sender,
            fieldId: fieldId,
            cropType: cropType,
            seedsPlanted: seedsPlanted,
            spacingDistance: spacingDistance,
            operationDate: block.timestamp
        });

        operationsByFarmer[msg.sender].push(operationId);
        emit OperationRecorded(operationId, msg.sender, cropType);
        return operationId;
    }

    function getOperation(uint256 operationId) public view returns (SeedingOperation memory) {
        return operations[operationId];
    }
}
