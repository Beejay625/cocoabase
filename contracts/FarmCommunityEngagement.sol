// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCommunityEngagement
 * @dev Community engagement initiatives tracking
 */
contract FarmCommunityEngagement is Ownable {
    struct Engagement {
        uint256 engagementId;
        address farmer;
        string initiativeType;
        uint256 participantCount;
        uint256 engagementDate;
        string description;
    }

    mapping(uint256 => Engagement) public engagements;
    mapping(address => uint256[]) public engagementsByFarmer;
    uint256 private _engagementIdCounter;

    event EngagementRecorded(
        uint256 indexed engagementId,
        address indexed farmer,
        string initiativeType
    );

    constructor() Ownable(msg.sender) {}

    function recordEngagement(
        string memory initiativeType,
        uint256 participantCount,
        string memory description
    ) public returns (uint256) {
        uint256 engagementId = _engagementIdCounter++;
        engagements[engagementId] = Engagement({
            engagementId: engagementId,
            farmer: msg.sender,
            initiativeType: initiativeType,
            participantCount: participantCount,
            engagementDate: block.timestamp,
            description: description
        });

        engagementsByFarmer[msg.sender].push(engagementId);
        emit EngagementRecorded(engagementId, msg.sender, initiativeType);
        return engagementId;
    }

    function getEngagement(uint256 engagementId) public view returns (Engagement memory) {
        return engagements[engagementId];
    }
}
