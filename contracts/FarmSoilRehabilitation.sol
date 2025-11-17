// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilRehabilitation
 * @dev Soil rehabilitation program tracking
 */
contract FarmSoilRehabilitation is Ownable {
    struct Rehabilitation {
        uint256 rehabId;
        address farmer;
        uint256 fieldId;
        string method;
        uint256 progress;
        bool completed;
    }

    mapping(uint256 => Rehabilitation) public rehabilitations;
    mapping(address => uint256[]) public rehabsByFarmer;
    uint256 private _rehabIdCounter;

    event RehabilitationStarted(uint256 indexed rehabId, uint256 fieldId);
    event ProgressUpdated(uint256 indexed rehabId, uint256 progress);

    constructor() Ownable(msg.sender) {}

    function startRehabilitation(
        uint256 fieldId,
        string memory method
    ) public returns (uint256) {
        uint256 rehabId = _rehabIdCounter++;
        rehabilitations[rehabId] = Rehabilitation({
            rehabId: rehabId,
            farmer: msg.sender,
            fieldId: fieldId,
            method: method,
            progress: 0,
            completed: false
        });
        rehabsByFarmer[msg.sender].push(rehabId);
        emit RehabilitationStarted(rehabId, fieldId);
        return rehabId;
    }

    function updateProgress(uint256 rehabId, uint256 progress) public {
        require(rehabilitations[rehabId].farmer == msg.sender, "Not the owner");
        require(progress <= 100, "Invalid progress");
        rehabilitations[rehabId].progress = progress;
        if (progress == 100) {
            rehabilitations[rehabId].completed = true;
        }
        emit ProgressUpdated(rehabId, progress);
    }
}

