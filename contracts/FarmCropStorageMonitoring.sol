// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropStorageMonitoring
 * @dev Monitor storage conditions for quality preservation
 */
contract FarmCropStorageMonitoring is Ownable {
    struct StorageCheck {
        uint256 checkId;
        address farmer;
        string storageId;
        uint256 temperature;
        uint256 humidity;
        uint256 checkDate;
        bool conditionsOptimal;
    }

    mapping(uint256 => StorageCheck) public checks;
    mapping(address => uint256[]) public checksByFarmer;
    uint256 private _checkIdCounter;

    event CheckPerformed(
        uint256 indexed checkId,
        address indexed farmer,
        bool conditionsOptimal
    );

    constructor() Ownable(msg.sender) {}

    function performCheck(
        string memory storageId,
        uint256 temperature,
        uint256 humidity
    ) public returns (uint256) {
        bool conditionsOptimal = temperature >= 10 && temperature <= 20 && humidity >= 50 && humidity <= 70;
        uint256 checkId = _checkIdCounter++;
        checks[checkId] = StorageCheck({
            checkId: checkId,
            farmer: msg.sender,
            storageId: storageId,
            temperature: temperature,
            humidity: humidity,
            checkDate: block.timestamp,
            conditionsOptimal: conditionsOptimal
        });

        checksByFarmer[msg.sender].push(checkId);
        emit CheckPerformed(checkId, msg.sender, conditionsOptimal);
        return checkId;
    }

    function getCheck(uint256 checkId) public view returns (StorageCheck memory) {
        return checks[checkId];
    }
}
