// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmMarketLinkages
 * @dev Market linkages and buyer connections
 */
contract FarmMarketLinkages is Ownable {
    struct MarketLink {
        uint256 linkId;
        address farmer;
        address buyer;
        string productType;
        uint256 establishedDate;
        bool active;
    }

    mapping(uint256 => MarketLink) public links;
    mapping(address => uint256[]) public linksByFarmer;
    mapping(address => uint256[]) public linksByBuyer;
    uint256 private _linkIdCounter;

    event LinkEstablished(
        uint256 indexed linkId,
        address indexed farmer,
        address indexed buyer
    );

    constructor() Ownable(msg.sender) {}

    function establishLink(
        address buyer,
        string memory productType
    ) public returns (uint256) {
        uint256 linkId = _linkIdCounter++;
        links[linkId] = MarketLink({
            linkId: linkId,
            farmer: msg.sender,
            buyer: buyer,
            productType: productType,
            establishedDate: block.timestamp,
            active: true
        });

        linksByFarmer[msg.sender].push(linkId);
        linksByBuyer[buyer].push(linkId);
        emit LinkEstablished(linkId, msg.sender, buyer);
        return linkId;
    }

    function deactivateLink(uint256 linkId) public {
        require(links[linkId].farmer == msg.sender || links[linkId].buyer == msg.sender, "Not authorized");
        links[linkId].active = false;
    }

    function getLink(uint256 linkId) public view returns (MarketLink memory) {
        return links[linkId];
    }
}
