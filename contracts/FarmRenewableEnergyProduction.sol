// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRenewableEnergyProduction
 * @dev Renewable energy production tracking and certification
 */
contract FarmRenewableEnergyProduction is Ownable {
    struct EnergyProduction {
        uint256 productionId;
        address farmer;
        string energyType;
        uint256 amountGenerated;
        uint256 timestamp;
        bool certified;
    }

    mapping(uint256 => EnergyProduction) public productions;
    mapping(address => uint256[]) public productionsByFarmer;
    uint256 private _productionIdCounter;

    event ProductionRecorded(
        uint256 indexed productionId,
        address indexed farmer,
        uint256 amountGenerated
    );

    constructor() Ownable(msg.sender) {}

    function recordProduction(
        string memory energyType,
        uint256 amountGenerated
    ) public returns (uint256) {
        uint256 productionId = _productionIdCounter++;
        productions[productionId] = EnergyProduction({
            productionId: productionId,
            farmer: msg.sender,
            energyType: energyType,
            amountGenerated: amountGenerated,
            timestamp: block.timestamp,
            certified: false
        });

        productionsByFarmer[msg.sender].push(productionId);
        emit ProductionRecorded(productionId, msg.sender, amountGenerated);
        return productionId;
    }

    function certifyProduction(uint256 productionId) public onlyOwner {
        productions[productionId].certified = true;
    }

    function getProduction(uint256 productionId) public view returns (EnergyProduction memory) {
        return productions[productionId];
    }
}
