// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkQuality
 * @dev Milk quality testing and certification
 */
contract FarmLivestockMilkQuality is Ownable {
    struct QualityTest {
        uint256 testId;
        address farmer;
        string milkBatch;
        uint256 fatContent;
        uint256 proteinContent;
        uint256 somaticCellCount;
        uint256 testDate;
        bool meetsStandards;
    }

    mapping(uint256 => QualityTest) public tests;
    uint256 private _testIdCounter;

    event TestRecorded(
        uint256 indexed testId,
        address indexed farmer,
        bool meetsStandards
    );

    constructor() Ownable(msg.sender) {}

    function recordTest(
        string memory milkBatch,
        uint256 fatContent,
        uint256 proteinContent,
        uint256 somaticCellCount
    ) public returns (uint256) {
        bool meetsStandards = fatContent >= 35 && proteinContent >= 30 && somaticCellCount < 400000;
        uint256 testId = _testIdCounter++;
        tests[testId] = QualityTest({
            testId: testId,
            farmer: msg.sender,
            milkBatch: milkBatch,
            fatContent: fatContent,
            proteinContent: proteinContent,
            somaticCellCount: somaticCellCount,
            testDate: block.timestamp,
            meetsStandards: meetsStandards
        });

        emit TestRecorded(testId, msg.sender, meetsStandards);
        return testId;
    }

    function getTest(uint256 testId) public view returns (QualityTest memory) {
        return tests[testId];
    }
}