// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPreHarvestContracts
 * @dev Pre-harvest contracts and forward sales agreements
 */
contract FarmPreHarvestContracts is Ownable {
    struct PreHarvestContract {
        uint256 contractId;
        address buyer;
        address farmer;
        string cropType;
        uint256 expectedYield;
        uint256 agreedPrice;
        uint256 deliveryDate;
        bool fulfilled;
    }

    mapping(uint256 => PreHarvestContract) public contracts;
    mapping(address => uint256[]) public contractsByFarmer;
    uint256 private _contractIdCounter;

    event ContractCreated(
        uint256 indexed contractId,
        address indexed buyer,
        address indexed farmer,
        uint256 agreedPrice
    );

    event ContractFulfilled(
        uint256 indexed contractId,
        uint256 actualYield
    );

    constructor() Ownable(msg.sender) {}

    function createContract(
        address farmer,
        string memory cropType,
        uint256 expectedYield,
        uint256 agreedPrice,
        uint256 deliveryDate
    ) public returns (uint256) {
        uint256 contractId = _contractIdCounter++;
        contracts[contractId] = PreHarvestContract({
            contractId: contractId,
            buyer: msg.sender,
            farmer: farmer,
            cropType: cropType,
            expectedYield: expectedYield,
            agreedPrice: agreedPrice,
            deliveryDate: deliveryDate,
            fulfilled: false
        });

        contractsByFarmer[farmer].push(contractId);
        emit ContractCreated(contractId, msg.sender, farmer, agreedPrice);
        return contractId;
    }

    function fulfillContract(uint256 contractId, uint256 actualYield) public {
        require(contracts[contractId].farmer == msg.sender, "Not authorized");
        require(!contracts[contractId].fulfilled, "Already fulfilled");
        contracts[contractId].fulfilled = true;
        emit ContractFulfilled(contractId, actualYield);
    }

    function getContract(uint256 contractId) public view returns (PreHarvestContract memory) {
        return contracts[contractId];
    }
}
