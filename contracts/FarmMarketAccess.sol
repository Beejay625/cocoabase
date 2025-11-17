// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmMarketAccess
 * @dev Market access facilitation system
 */
contract FarmMarketAccess is Ownable {
    struct MarketAccess {
        uint256 accessId;
        address farmer;
        address market;
        string productType;
        bool approved;
        uint256 timestamp;
    }

    mapping(uint256 => MarketAccess) public accesses;
    mapping(address => uint256[]) public accessesByFarmer;
    mapping(address => bool) public isMarketOperator;
    uint256 private _accessIdCounter;

    event AccessRequested(uint256 indexed accessId, address indexed farmer);
    event AccessApproved(uint256 indexed accessId);

    constructor() Ownable(msg.sender) {
        isMarketOperator[msg.sender] = true;
    }

    function addMarketOperator(address operator) public onlyOwner {
        isMarketOperator[operator] = true;
    }

    function requestAccess(
        address market,
        string memory productType
    ) public returns (uint256) {
        uint256 accessId = _accessIdCounter++;
        accesses[accessId] = MarketAccess({
            accessId: accessId,
            farmer: msg.sender,
            market: market,
            productType: productType,
            approved: false,
            timestamp: block.timestamp
        });
        accessesByFarmer[msg.sender].push(accessId);
        emit AccessRequested(accessId, msg.sender);
        return accessId;
    }

    function approveAccess(uint256 accessId) public {
        require(isMarketOperator[msg.sender], "Not a market operator");
        accesses[accessId].approved = true;
        emit AccessApproved(accessId);
    }
}

