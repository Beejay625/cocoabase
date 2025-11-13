// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLandValuation
 * @dev Onchain land valuation system
 */
contract FarmLandValuation is Ownable {
    struct Valuation {
        uint256 valuationId;
        address landOwner;
        uint256 landId;
        uint256 value;
        uint256 valuationDate;
        string valuationMethod;
        address appraiser;
        bool verified;
    }

    mapping(uint256 => Valuation) public valuations;
    mapping(address => uint256[]) public valuationsByOwner;
    mapping(uint256 => uint256[]) public valuationsByLand;
    uint256 private _valuationIdCounter;

    event ValuationCreated(
        uint256 indexed valuationId,
        address indexed landOwner,
        uint256 landId,
        uint256 value
    );

    event ValuationVerified(
        uint256 indexed valuationId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function createValuation(
        address landOwner,
        uint256 landId,
        uint256 value,
        string memory valuationMethod
    ) public returns (uint256) {
        uint256 valuationId = _valuationIdCounter++;
        valuations[valuationId] = Valuation({
            valuationId: valuationId,
            landOwner: landOwner,
            landId: landId,
            value: value,
            valuationDate: block.timestamp,
            valuationMethod: valuationMethod,
            appraiser: msg.sender,
            verified: false
        });

        valuationsByOwner[landOwner].push(valuationId);
        valuationsByLand[landId].push(valuationId);

        emit ValuationCreated(valuationId, landOwner, landId, value);
        return valuationId;
    }

    function verifyValuation(uint256 valuationId) public onlyOwner {
        require(!valuations[valuationId].verified, "Already verified");
        valuations[valuationId].verified = true;

        emit ValuationVerified(valuationId, msg.sender);
    }

    function getValuation(uint256 valuationId) public view returns (Valuation memory) {
        return valuations[valuationId];
    }

    function getValuationsByLand(uint256 landId) public view returns (uint256[] memory) {
        return valuationsByLand[landId];
    }
}

