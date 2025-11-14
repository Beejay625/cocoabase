// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSustainabilityRewards
 * @dev Onchain reward system for sustainable farming practices
 */
contract FarmSustainabilityRewards is Ownable {
    struct SustainabilityAction {
        uint256 actionId;
        uint256 plantationId;
        address farmer;
        string actionType;
        uint256 pointsEarned;
        uint256 rewardAmount;
        uint256 actionDate;
        bool verified;
    }

    mapping(uint256 => SustainabilityAction) public sustainabilityActions;
    mapping(address => uint256) public totalPoints;
    mapping(address => uint256[]) public actionsByFarmer;
    uint256 private _actionIdCounter;
    uint256 public pointsPerReward = 100; // 100 points = 1 reward unit

    event SustainabilityActionRecorded(
        uint256 indexed actionId,
        address indexed farmer,
        string actionType,
        uint256 pointsEarned
    );

    event RewardClaimed(address indexed farmer, uint256 rewardAmount);
    event ActionVerified(uint256 indexed actionId);

    constructor() Ownable(msg.sender) {}

    function recordAction(
        uint256 plantationId,
        string memory actionType,
        uint256 points
    ) public returns (uint256) {
        uint256 actionId = _actionIdCounter++;
        uint256 rewardAmount = points * pointsPerReward;

        sustainabilityActions[actionId] = SustainabilityAction({
            actionId: actionId,
            plantationId: plantationId,
            farmer: msg.sender,
            actionType: actionType,
            pointsEarned: points,
            rewardAmount: rewardAmount,
            actionDate: block.timestamp,
            verified: false
        });

        actionsByFarmer[msg.sender].push(actionId);

        emit SustainabilityActionRecorded(actionId, msg.sender, actionType, points);
        return actionId;
    }

    function verifyAction(uint256 actionId) public onlyOwner {
        require(!sustainabilityActions[actionId].verified, "Already verified");
        sustainabilityActions[actionId].verified = true;

        address farmer = sustainabilityActions[actionId].farmer;
        totalPoints[farmer] += sustainabilityActions[actionId].pointsEarned;

        emit ActionVerified(actionId);
    }

    function claimReward() public {
        uint256 totalReward = (totalPoints[msg.sender] * pointsPerReward);
        require(totalReward > 0, "No rewards available");

        uint256 rewardToClaim = totalReward;
        totalPoints[msg.sender] = 0;

        payable(msg.sender).transfer(rewardToClaim);

        emit RewardClaimed(msg.sender, rewardToClaim);
    }

    function getAction(uint256 actionId) public view returns (SustainabilityAction memory) {
        return sustainabilityActions[actionId];
    }

    function getTotalPoints(address farmer) public view returns (uint256) {
        return totalPoints[farmer];
    }
}

