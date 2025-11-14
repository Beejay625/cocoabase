// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmQualityAssurance
 * @dev Onchain quality assurance and certification system
 */
contract FarmQualityAssurance is Ownable {
    struct QualityCheck {
        uint256 checkId;
        uint256 productId;
        address inspector;
        uint256 checkDate;
        uint256 qualityScore;
        string standards;
        bool passed;
        string notes;
    }

    mapping(uint256 => QualityCheck) public qualityChecks;
    mapping(address => uint256[]) public checksByInspector;
    mapping(uint256 => uint256[]) public checksByProduct;
    uint256 private _checkIdCounter;

    event QualityCheckPerformed(
        uint256 indexed checkId,
        uint256 indexed productId,
        address indexed inspector,
        bool passed
    );

    event QualityCertificationIssued(
        uint256 indexed checkId,
        uint256 indexed productId,
        string standards
    );

    constructor() Ownable(msg.sender) {}

    function performQualityCheck(
        uint256 productId,
        uint256 qualityScore,
        string memory standards,
        string memory notes
    ) public returns (uint256) {
        bool passed = qualityScore >= 80; // Minimum score for passing

        uint256 checkId = _checkIdCounter++;
        qualityChecks[checkId] = QualityCheck({
            checkId: checkId,
            productId: productId,
            inspector: msg.sender,
            checkDate: block.timestamp,
            qualityScore: qualityScore,
            standards: standards,
            passed: passed,
            notes: notes
        });

        checksByInspector[msg.sender].push(checkId);
        checksByProduct[productId].push(checkId);

        emit QualityCheckPerformed(checkId, productId, msg.sender, passed);

        if (passed) {
            emit QualityCertificationIssued(checkId, productId, standards);
        }

        return checkId;
    }

    function getQualityCheck(uint256 checkId) public view returns (QualityCheck memory) {
        return qualityChecks[checkId];
    }

    function getProductChecks(uint256 productId) public view returns (uint256[] memory) {
        return checksByProduct[productId];
    }
}

