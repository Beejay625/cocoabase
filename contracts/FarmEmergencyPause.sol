// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEmergencyPause
 * @dev Emergency pause mechanism for contract security
 */
contract FarmEmergencyPause is Ownable {
    bool public paused;
    mapping(address => bool) public isPauser;

    event Paused(address indexed account);
    event Unpaused(address indexed account);
    event PauserAdded(address indexed pauser);
    event PauserRemoved(address indexed pauser);

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    modifier whenPaused() {
        require(paused, "Contract is not paused");
        _;
    }

    constructor() Ownable(msg.sender) {
        isPauser[msg.sender] = true;
    }

    function addPauser(address pauser) public onlyOwner {
        isPauser[pauser] = true;
        emit PauserAdded(pauser);
    }

    function removePauser(address pauser) public onlyOwner {
        isPauser[pauser] = false;
        emit PauserRemoved(pauser);
    }

    function pause() public {
        require(isPauser[msg.sender] || msg.sender == owner(), "Not authorized");
        require(!paused, "Already paused");
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public {
        require(isPauser[msg.sender] || msg.sender == owner(), "Not authorized");
        require(paused, "Not paused");
        paused = false;
        emit Unpaused(msg.sender);
    }
}

