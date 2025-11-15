// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropOptions
 * @dev Options contracts for crop price hedging
 */
contract FarmCropOptions is Ownable {
    struct Option {
        uint256 optionId;
        address buyer;
        address seller;
        string commodity;
        uint256 strikePrice;
        uint256 premium;
        uint256 expiryDate;
        bool exercised;
    }

    mapping(uint256 => Option) public options;
    mapping(address => uint256[]) public optionsByBuyer;
    mapping(address => uint256[]) public optionsBySeller;
    uint256 private _optionIdCounter;

    event OptionCreated(
        uint256 indexed optionId,
        address indexed buyer,
        address indexed seller,
        string commodity
    );
    event OptionExercised(uint256 indexed optionId, uint256 currentPrice);

    constructor() Ownable(msg.sender) {}

    function createOption(
        address buyer,
        string memory commodity,
        uint256 strikePrice,
        uint256 expiryDate
    ) public payable returns (uint256) {
        require(msg.value > 0, "Premium required");
        require(expiryDate > block.timestamp, "Invalid expiry");
        
        uint256 optionId = _optionIdCounter++;
        options[optionId] = Option({
            optionId: optionId,
            buyer: buyer,
            seller: msg.sender,
            commodity: commodity,
            strikePrice: strikePrice,
            premium: msg.value,
            expiryDate: expiryDate,
            exercised: false
        });
        optionsByBuyer[buyer].push(optionId);
        optionsBySeller[msg.sender].push(optionId);
        payable(msg.sender).transfer(msg.value);
        emit OptionCreated(optionId, buyer, msg.sender, commodity);
        return optionId;
    }

    function exerciseOption(uint256 optionId, uint256 currentPrice) public payable {
        Option storage option = options[optionId];
        require(option.buyer == msg.sender, "Not the buyer");
        require(!option.exercised, "Already exercised");
        require(block.timestamp <= option.expiryDate, "Option expired");
        require(currentPrice > option.strikePrice, "Not profitable");
        
        option.exercised = true;
        uint256 profit = currentPrice - option.strikePrice;
        require(msg.value >= profit, "Insufficient payment");
        payable(option.seller).transfer(profit);
        emit OptionExercised(optionId, currentPrice);
    }
}
