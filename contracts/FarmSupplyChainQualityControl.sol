// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSupplyChainQualityControl
 * @dev Quality checks and verification at each supply chain stage
 */
contract FarmSupplyChainQualityControl is Ownable {
    struct QualityCheck {
        uint256 checkId;
        string productId;
        string stage;
        address inspector;
        uint256 qualityScore;
        bool passed;
        string[] criteria;
        uint256 checkDate;
    }

    mapping(uint256 => QualityCheck) public qualityChecks;
    mapping(string => uint256[]) public checksByProduct;
    uint256 private _checkIdCounter;

    event QualityCheckConducted(
        uint256 indexed checkId,
        string productId,
        bool passed
    );

    constructor() Ownable(msg.sender) {}

    function conductQualityCheck(
        string memory productId,
        string memory stage,
        uint256 qualityScore,
        bool passed,
        string[] memory criteria
    ) public returns (uint256) {
        uint256 checkId = _checkIdCounter++;
        qualityChecks[checkId] = QualityCheck({
            checkId: checkId,
            productId: productId,
            stage: stage,
            inspector: msg.sender,
            qualityScore: qualityScore,
            passed: passed,
            criteria: criteria,
            checkDate: block.timestamp
        });

        checksByProduct[productId].push(checkId);
        emit QualityCheckConducted(checkId, productId, passed);
        return checkId;
    }

    function getCheck(uint256 checkId) public view returns (QualityCheck memory) {
        return qualityChecks[checkId];
    }
}
