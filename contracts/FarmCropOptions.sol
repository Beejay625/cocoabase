// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropOptions
 * @dev Onchain options trading for crop price protection
 */
contract FarmCropOptions is Ownable {
    enum OptionType { Call, Put }

    struct Option {
        uint256 optionId;
        address seller;
        address buyer;
        string cropType;
        uint256 quantity;
        uint256 strikePrice;
        uint256 premium;
        uint256 expirationDate;
        OptionType optionType;
        bool isExercised;
        bool isActive;
    }

    mapping(uint256 => Option) public options;
    mapping(address => uint256[]) public optionsByParty;
    uint256 private _optionIdCounter;

    event OptionCreated(
        uint256 indexed optionId,
        address indexed seller,
        address indexed buyer,
        OptionType optionType
    );

    event OptionExercised(
        uint256 indexed optionId,
        address indexed exerciser,
        uint256 payoutAmount
    );

    constructor() Ownable(msg.sender) {}

    function createOption(
        address buyer,
        string memory cropType,
        uint256 quantity,
        uint256 strikePrice,
        uint256 expirationDate,
        OptionType optionType
    ) public payable returns (uint256) {
        require(buyer != address(0), "Invalid buyer");
        require(quantity > 0, "Quantity must be greater than 0");
        require(strikePrice > 0, "Strike price must be greater than 0");
        require(msg.value > 0, "Premium required");

        uint256 optionId = _optionIdCounter++;
        options[optionId] = Option({
            optionId: optionId,
            seller: msg.sender,
            buyer: buyer,
            cropType: cropType,
            quantity: quantity,
            strikePrice: strikePrice,
            premium: msg.value,
            expirationDate: expirationDate,
            optionType: optionType,
            isExercised: false,
            isActive: true
        });

        optionsByParty[msg.sender].push(optionId);
        optionsByParty[buyer].push(optionId);

        emit OptionCreated(optionId, msg.sender, buyer, optionType);
        return optionId;
    }

    function exerciseOption(uint256 optionId, uint256 marketPrice) public payable {
        Option storage option = options[optionId];
        require(option.buyer == msg.sender, "Not option buyer");
        require(option.isActive, "Option not active");
        require(!option.isExercised, "Option already exercised");
        require(block.timestamp <= option.expirationDate, "Option expired");

        uint256 payoutAmount = 0;

        if (option.optionType == OptionType.Call && marketPrice > option.strikePrice) {
            payoutAmount = (marketPrice - option.strikePrice) * option.quantity;
        } else if (option.optionType == OptionType.Put && marketPrice < option.strikePrice) {
            payoutAmount = (option.strikePrice - marketPrice) * option.quantity;
        }

        if (payoutAmount > 0) {
            option.isExercised = true;
            payable(msg.sender).transfer(payoutAmount);
            emit OptionExercised(optionId, msg.sender, payoutAmount);
        }
    }

    function getOption(uint256 optionId) public view returns (Option memory) {
        return options[optionId];
    }
}

