// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropPriceInsurance
 * @dev Onchain price protection insurance for crops
 */
contract FarmCropPriceInsurance is Ownable {
    struct Policy {
        uint256 policyId;
        address farmer;
        string cropType;
        uint256 quantity;
        uint256 strikePrice;
        uint256 coverageAmount;
        uint256 premium;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
    }

    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public policiesByFarmer;
    uint256 private _policyIdCounter;

    event PolicyCreated(
        uint256 indexed policyId,
        address indexed farmer,
        string cropType,
        uint256 strikePrice
    );

    event ClaimFiled(
        uint256 indexed policyId,
        address indexed farmer,
        uint256 marketPrice,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createPolicy(
        string memory cropType,
        uint256 quantity,
        uint256 strikePrice,
        uint256 duration
    ) public payable returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        require(strikePrice > 0, "Strike price must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 policyId = _policyIdCounter++;
        uint256 coverageAmount = quantity * strikePrice;

        policies[policyId] = Policy({
            policyId: policyId,
            farmer: msg.sender,
            cropType: cropType,
            quantity: quantity,
            strikePrice: strikePrice,
            coverageAmount: coverageAmount,
            premium: msg.value,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            isActive: true
        });

        policiesByFarmer[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, cropType, strikePrice);
        return policyId;
    }

    function fileClaim(uint256 policyId, uint256 marketPrice) public {
        require(policies[policyId].farmer == msg.sender, "Not policy owner");
        require(policies[policyId].isActive, "Policy not active");
        require(block.timestamp >= policies[policyId].endDate, "Policy not expired");

        if (marketPrice < policies[policyId].strikePrice) {
            uint256 priceDifference = policies[policyId].strikePrice - marketPrice;
            uint256 payoutAmount = priceDifference * policies[policyId].quantity;
            
            policies[policyId].isActive = false;
            payable(msg.sender).transfer(payoutAmount);

            emit ClaimFiled(policyId, msg.sender, marketPrice, payoutAmount);
        }
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }
}

