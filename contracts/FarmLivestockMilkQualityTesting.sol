// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockMilkQualityTesting
 * @dev Onchain milk quality testing and certification
 */
contract FarmLivestockMilkQualityTesting is Ownable {
    struct MilkQualityTest {
        uint256 testId;
        address farmer;
        string livestockId;
        uint256 fatContent;
        uint256 proteinContent;
        uint256 somaticCellCount;
        string testResult;
        uint256 testDate;
        address tester;
    }

    mapping(uint256 => MilkQualityTest) public tests;
    mapping(address => uint256[]) public testsByFarmer;
    uint256 private _testIdCounter;

    event TestRecorded(
        uint256 indexed testId,
        address indexed farmer,
        string livestockId,
        string testResult
    );

    constructor() Ownable(msg.sender) {}

    function recordTest(
        address farmer,
        string memory livestockId,
        uint256 fatContent,
        uint256 proteinContent,
        uint256 somaticCellCount,
        string memory testResult
    ) public onlyOwner returns (uint256) {
        uint256 testId = _testIdCounter++;
        tests[testId] = MilkQualityTest({
            testId: testId,
            farmer: farmer,
            livestockId: livestockId,
            fatContent: fatContent,
            proteinContent: proteinContent,
            somaticCellCount: somaticCellCount,
            testResult: testResult,
            testDate: block.timestamp,
            tester: msg.sender
        });

        testsByFarmer[farmer].push(testId);
        emit TestRecorded(testId, farmer, livestockId, testResult);
        return testId;
    }

    function getTest(uint256 testId) public view returns (MilkQualityTest memory) {
        return tests[testId];
    }
}

