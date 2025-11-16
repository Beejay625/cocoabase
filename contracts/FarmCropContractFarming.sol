// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropContractFarming
 * @dev Contract farming agreements and execution tracking
 */
contract FarmCropContractFarming is Ownable {
    struct ContractAgreement {
        uint256 contractId;
        address buyer;
        address farmer;
        string cropType;
        uint256 quantity;
        uint256 pricePerUnit;
        uint256 deliveryDate;
        bool fulfilled;
    }

    mapping(uint256 => ContractAgreement) public contracts;
    mapping(address => uint256[]) public contractsByFarmer;
    uint256 private _contractIdCounter;

    event ContractCreated(
        uint256 indexed contractId,
        address indexed buyer,
        address indexed farmer
    );

    event ContractFulfilled(
        uint256 indexed contractId,
        uint256 quantity
    );

    constructor() Ownable(msg.sender) {}

    function createContract(
        address farmer,
        string memory cropType,
        uint256 quantity,
        uint256 pricePerUnit,
        uint256 deliveryDate
    ) public returns (uint256) {
        uint256 contractId = _contractIdCounter++;
        contracts[contractId] = ContractAgreement({
            contractId: contractId,
            buyer: msg.sender,
            farmer: farmer,
            cropType: cropType,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            deliveryDate: deliveryDate,
            fulfilled: false
        });

        contractsByFarmer[farmer].push(contractId);
        emit ContractCreated(contractId, msg.sender, farmer);
        return contractId;
    }

    function fulfillContract(uint256 contractId) public {
        require(contracts[contractId].farmer == msg.sender, "Not authorized");
        require(!contracts[contractId].fulfilled, "Already fulfilled");
        contracts[contractId].fulfilled = true;
        emit ContractFulfilled(contractId, contracts[contractId].quantity);
    }

    function getContract(uint256 contractId) public view returns (ContractAgreement memory) {
        return contracts[contractId];
    }
}
