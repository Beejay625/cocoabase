// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedQualityTesting
 * @dev Onchain feed quality testing and certification
 */
contract FarmLivestockFeedQualityTesting is Ownable {
    struct QualityTest {
        uint256 testId;
        address farmer;
        string feedBatchId;
        uint256 proteinContent;
        uint256 fiberContent;
        uint256 moistureContent;
        string testResult;
        uint256 testDate;
        address tester;
    }

    mapping(uint256 => QualityTest) public tests;
    mapping(address => uint256[]) public testsByFarmer;
    uint256 private _testIdCounter;

    event TestRecorded(
        uint256 indexed testId,
        address indexed farmer,
        string feedBatchId,
        string testResult
    );

    constructor() Ownable(msg.sender) {}

    function recordTest(
        address farmer,
        string memory feedBatchId,
        uint256 proteinContent,
        uint256 fiberContent,
        uint256 moistureContent,
        string memory testResult
    ) public onlyOwner returns (uint256) {
        uint256 testId = _testIdCounter++;
        tests[testId] = QualityTest({
            testId: testId,
            farmer: farmer,
            feedBatchId: feedBatchId,
            proteinContent: proteinContent,
            fiberContent: fiberContent,
            moistureContent: moistureContent,
            testResult: testResult,
            testDate: block.timestamp,
            tester: msg.sender
        });

        testsByFarmer[farmer].push(testId);
        emit TestRecorded(testId, farmer, feedBatchId, testResult);
        return testId;
    }

    function getTest(uint256 testId) public view returns (QualityTest memory) {
        return tests[testId];
    }
}

