// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmStakingRewards
 * @dev Staking mechanism with onchain reward distribution
 */
contract FarmStakingRewards is Ownable {
    struct Stake {
        address staker;
        uint256 amount;
        uint256 stakedAt;
        uint256 lastRewardClaim;
    }

    mapping(address => Stake) public stakes;
    IERC20 public stakingToken;
    uint256 public rewardRate = 10; // 10% APY
    uint256 public totalStaked;

    event Staked(address indexed staker, uint256 amount);
    event Unstaked(address indexed staker, uint256 amount);
    event RewardsClaimed(address indexed staker, uint256 amount);

    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }

    function stake(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        if (stakes[msg.sender].staker == address(0)) {
            stakes[msg.sender] = Stake({
                staker: msg.sender,
                amount: amount,
                stakedAt: block.timestamp,
                lastRewardClaim: block.timestamp
            });
        } else {
            stakes[msg.sender].amount += amount;
        }
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        require(stakes[msg.sender].amount >= amount, "Insufficient stake");
        stakes[msg.sender].amount -= amount;
        totalStaked -= amount;
        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() public {
        Stake storage stake_ = stakes[msg.sender];
        require(stake_.amount > 0, "No stake");
        
        uint256 timeStaked = block.timestamp - stake_.lastRewardClaim;
        uint256 rewards = (stake_.amount * rewardRate * timeStaked) / (365 days * 100);
        
        stake_.lastRewardClaim = block.timestamp;
        require(stakingToken.transfer(msg.sender, rewards), "Transfer failed");
        emit RewardsClaimed(msg.sender, rewards);
    }
}

