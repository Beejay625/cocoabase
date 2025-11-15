// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRegenerativeAgricultureTracking
 * @dev Onchain tracking of regenerative agriculture practices
 */
contract FarmRegenerativeAgricultureTracking is Ownable {
    struct RegenerativePractice {
        uint256 practiceId;
        address farmer;
        string practiceType;
        string fieldId;
        uint256 implementationDate;
        string description;
        uint256 impactScore;
        bool isVerified;
    }

    mapping(uint256 => RegenerativePractice) public practices;
    mapping(address => uint256[]) public practicesByFarmer;
    mapping(address => uint256) public totalImpactScoreByFarmer;
    uint256 private _practiceIdCounter;

    event PracticeRecorded(
        uint256 indexed practiceId,
        address indexed farmer,
        string practiceType
    );

    event PracticeVerified(
        uint256 indexed practiceId,
        uint256 impactScore
    );

    constructor() Ownable(msg.sender) {}

    function recordPractice(
        string memory practiceType,
        string memory fieldId,
        string memory description
    ) public returns (uint256) {
        require(bytes(practiceType).length > 0, "Practice type required");

        uint256 practiceId = _practiceIdCounter++;
        practices[practiceId] = RegenerativePractice({
            practiceId: practiceId,
            farmer: msg.sender,
            practiceType: practiceType,
            fieldId: fieldId,
            implementationDate: block.timestamp,
            description: description,
            impactScore: 0,
            isVerified: false
        });

        practicesByFarmer[msg.sender].push(practiceId);

        emit PracticeRecorded(practiceId, msg.sender, practiceType);
        return practiceId;
    }

    function verifyPractice(uint256 practiceId, uint256 impactScore) public onlyOwner {
        require(!practices[practiceId].isVerified, "Already verified");
        practices[practiceId].isVerified = true;
        practices[practiceId].impactScore = impactScore;

        address farmer = practices[practiceId].farmer;
        totalImpactScoreByFarmer[farmer] += impactScore;

        emit PracticeVerified(practiceId, impactScore);
    }

    function getPractice(uint256 practiceId) public view returns (RegenerativePractice memory) {
        return practices[practiceId];
    }

    function getTotalImpactScore(address farmer) public view returns (uint256) {
        return totalImpactScoreByFarmer[farmer];
    }
}

