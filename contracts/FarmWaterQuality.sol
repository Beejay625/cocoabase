// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmWaterQuality
 * @dev Onchain system for tracking water quality tests
 */
contract FarmWaterQuality is Ownable {
    struct QualityTest {
        uint256 testId;
        uint256 sourceId;
        uint256 phLevel;
        uint256 turbidity;
        uint256 testDate;
        address tester;
        bool safe;
    }

    mapping(uint256 => QualityTest) public qualityTests;
    mapping(address => uint256[]) public testsByTester;
    uint256 private _testIdCounter;

    event QualityTestRecorded(
        uint256 indexed testId,
        address indexed tester,
        uint256 phLevel
    );

    constructor() Ownable(msg.sender) {}

    function recordTest(
        uint256 sourceId,
        uint256 phLevel,
        uint256 turbidity
    ) public returns (uint256) {
        uint256 testId = _testIdCounter++;
        bool safe = phLevel >= 65 && phLevel <= 85 && turbidity <= 50;
        
        qualityTests[testId] = QualityTest({
            testId: testId,
            sourceId: sourceId,
            phLevel: phLevel,
            turbidity: turbidity,
            testDate: block.timestamp,
            tester: msg.sender,
            safe: safe
        });

        testsByTester[msg.sender].push(testId);

        emit QualityTestRecorded(testId, msg.sender, phLevel);
        return testId;
    }

    function getTest(uint256 testId) public view returns (QualityTest memory) {
        return qualityTests[testId];
    }
}



