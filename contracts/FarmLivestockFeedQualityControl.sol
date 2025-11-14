// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockFeedQualityControl
 * @dev Control and monitor feed quality for livestock
 */
contract FarmLivestockFeedQualityControl is Ownable {
    struct QualityTest {
        uint256 testId;
        uint256 feedBatchId;
        uint256 proteinContent;
        uint256 moistureContent;
        uint256 contaminationLevel;
        bool passed;
        uint256 testDate;
        address tester;
    }

    struct FeedBatch {
        uint256 batchId;
        string feedType;
        uint256 quantity;
        uint256 receivedDate;
        address supplier;
        bool approved;
    }

    mapping(uint256 => QualityTest) public qualityTests;
    mapping(uint256 => FeedBatch) public feedBatches;
    mapping(address => uint256[]) public testsByOwner;
    uint256 private _testIdCounter;
    uint256 private _batchIdCounter;

    event QualityTestPerformed(
        uint256 indexed testId,
        address indexed owner,
        uint256 feedBatchId,
        bool passed
    );

    event FeedBatchApproved(
        uint256 indexed batchId,
        address indexed approver
    );

    constructor() Ownable(msg.sender) {}

    function createFeedBatch(
        string memory feedType,
        uint256 quantity,
        address supplier
    ) public returns (uint256) {
        uint256 batchId = _batchIdCounter++;
        feedBatches[batchId] = FeedBatch({
            batchId: batchId,
            feedType: feedType,
            quantity: quantity,
            receivedDate: block.timestamp,
            supplier: supplier,
            approved: false
        });

        return batchId;
    }

    function performQualityTest(
        uint256 feedBatchId,
        uint256 proteinContent,
        uint256 moistureContent,
        uint256 contaminationLevel
    ) public returns (uint256) {
        bool passed = proteinContent >= 15 && moistureContent <= 12 && contaminationLevel < 5;
        
        uint256 testId = _testIdCounter++;
        qualityTests[testId] = QualityTest({
            testId: testId,
            feedBatchId: feedBatchId,
            proteinContent: proteinContent,
            moistureContent: moistureContent,
            contaminationLevel: contaminationLevel,
            passed: passed,
            testDate: block.timestamp,
            tester: msg.sender
        });

        testsByOwner[msg.sender].push(testId);

        if (passed) {
            feedBatches[feedBatchId].approved = true;
            emit FeedBatchApproved(feedBatchId, msg.sender);
        }

        emit QualityTestPerformed(testId, msg.sender, feedBatchId, passed);
        return testId;
    }

    function getQualityTest(uint256 testId) public view returns (QualityTest memory) {
        return qualityTests[testId];
    }

    function getTestsByOwner(address owner) public view returns (uint256[] memory) {
        return testsByOwner[owner];
    }
}

