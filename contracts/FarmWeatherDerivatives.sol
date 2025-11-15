// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWeatherDerivatives
 * @dev Onchain weather derivatives trading for risk management
 */
contract FarmWeatherDerivatives is Ownable {
    struct Derivative {
        uint256 derivativeId;
        address seller;
        address buyer;
        string weatherParameter;
        uint256 strikeValue;
        uint256 notionalAmount;
        uint256 premium;
        uint256 settlementDate;
        bool isActive;
        bool isSettled;
    }

    mapping(uint256 => Derivative) public derivatives;
    mapping(address => uint256[]) public derivativesByParty;
    uint256 private _derivativeIdCounter;

    event DerivativeCreated(
        uint256 indexed derivativeId,
        address indexed seller,
        address indexed buyer,
        string weatherParameter
    );

    event DerivativeSettled(
        uint256 indexed derivativeId,
        uint256 actualValue,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createDerivative(
        address buyer,
        string memory weatherParameter,
        uint256 strikeValue,
        uint256 notionalAmount,
        uint256 settlementDate
    ) public payable returns (uint256) {
        require(buyer != address(0), "Invalid buyer");
        require(strikeValue > 0, "Strike value must be greater than 0");
        require(notionalAmount > 0, "Notional amount must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 derivativeId = _derivativeIdCounter++;
        derivatives[derivativeId] = Derivative({
            derivativeId: derivativeId,
            seller: msg.sender,
            buyer: buyer,
            weatherParameter: weatherParameter,
            strikeValue: strikeValue,
            notionalAmount: notionalAmount,
            premium: msg.value,
            settlementDate: settlementDate,
            isActive: true,
            isSettled: false
        });

        derivativesByParty[msg.sender].push(derivativeId);
        derivativesByParty[buyer].push(derivativeId);

        emit DerivativeCreated(derivativeId, msg.sender, buyer, weatherParameter);
        return derivativeId;
    }

    function settleDerivative(uint256 derivativeId, uint256 actualValue) public onlyOwner {
        Derivative storage derivative = derivatives[derivativeId];
        require(derivative.isActive, "Derivative not active");
        require(!derivative.isSettled, "Already settled");
        require(block.timestamp >= derivative.settlementDate, "Not settlement date");

        derivative.isSettled = true;
        uint256 payoutAmount = 0;

        if (actualValue < derivative.strikeValue) {
            uint256 difference = derivative.strikeValue - actualValue;
            payoutAmount = (difference * derivative.notionalAmount) / derivative.strikeValue;
            payable(derivative.buyer).transfer(payoutAmount);
        }

        emit DerivativeSettled(derivativeId, actualValue, payoutAmount);
    }

    function getDerivative(uint256 derivativeId) public view returns (Derivative memory) {
        return derivatives[derivativeId];
    }
}

