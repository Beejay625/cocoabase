// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPostHarvestContracts
 * @dev Post-harvest contracts and spot sales agreements
 */
contract FarmPostHarvestContracts is Ownable {
    struct PostHarvestContract {
        uint256 contractId;
        address buyer;
        address seller;
        string productType;
        uint256 quantity;
        uint256 pricePerUnit;
        uint256 deliveryDate;
        bool delivered;
    }

    mapping(uint256 => PostHarvestContract) public contracts;
    mapping(address => uint256[]) public contractsBySeller;
    uint256 private _contractIdCounter;

    event ContractCreated(
        uint256 indexed contractId,
        address indexed buyer,
        address indexed seller,
        uint256 quantity
    );

    event DeliveryConfirmed(
        uint256 indexed contractId,
        uint256 deliveryDate
    );

    constructor() Ownable(msg.sender) {}

    function createContract(
        address buyer,
        string memory productType,
        uint256 quantity,
        uint256 pricePerUnit,
        uint256 deliveryDate
    ) public returns (uint256) {
        uint256 contractId = _contractIdCounter++;
        contracts[contractId] = PostHarvestContract({
            contractId: contractId,
            buyer: buyer,
            seller: msg.sender,
            productType: productType,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            deliveryDate: deliveryDate,
            delivered: false
        });

        contractsBySeller[msg.sender].push(contractId);
        emit ContractCreated(contractId, buyer, msg.sender, quantity);
        return contractId;
    }

    function confirmDelivery(uint256 contractId) public {
        require(contracts[contractId].seller == msg.sender, "Not authorized");
        require(!contracts[contractId].delivered, "Already delivered");
        contracts[contractId].delivered = true;
        emit DeliveryConfirmed(contractId, block.timestamp);
    }

    function getContract(uint256 contractId) public view returns (PostHarvestContract memory) {
        return contracts[contractId];
    }
}
