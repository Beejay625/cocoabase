// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilTesting
 * @dev Onchain system for recording and tracking soil test results
 */
contract FarmSoilTesting is Ownable {
    struct SoilTest {
        uint256 testId;
        uint256 plantationId;
        uint256 phLevel;
        uint256 nitrogenLevel;
        uint256 phosphorusLevel;
        uint256 potassiumLevel;
        uint256 testDate;
        address tester;
        bool verified;
    }

    mapping(uint256 => SoilTest) public soilTests;
    mapping(address => uint256[]) public testsByTester;
    uint256 private _testIdCounter;

    event SoilTestRecorded(
        uint256 indexed testId,
        address indexed tester,
        uint256 phLevel
    );

    event SoilTestVerified(uint256 indexed testId);

    constructor() Ownable(msg.sender) {}

    function recordTest(
        uint256 plantationId,
        uint256 phLevel,
        uint256 nitrogenLevel,
        uint256 phosphorusLevel,
        uint256 potassiumLevel
    ) public returns (uint256) {
        uint256 testId = _testIdCounter++;
        soilTests[testId] = SoilTest({
            testId: testId,
            plantationId: plantationId,
            phLevel: phLevel,
            nitrogenLevel: nitrogenLevel,
            phosphorusLevel: phosphorusLevel,
            potassiumLevel: potassiumLevel,
            testDate: block.timestamp,
            tester: msg.sender,
            verified: false
        });

        testsByTester[msg.sender].push(testId);

        emit SoilTestRecorded(testId, msg.sender, phLevel);
        return testId;
    }

    function verifyTest(uint256 testId) public onlyOwner {
        require(!soilTests[testId].verified, "Already verified");
        soilTests[testId].verified = true;
        emit SoilTestVerified(testId);
    }

    function getTest(uint256 testId) public view returns (SoilTest memory) {
        return soilTests[testId];
    }
}



