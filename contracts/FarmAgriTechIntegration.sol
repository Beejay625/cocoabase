// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAgriTechIntegration
 * @dev Integration platform for agricultural technology devices and IoT sensors
 */
contract FarmAgriTechIntegration is Ownable {
    struct Device {
        uint256 deviceId;
        address owner;
        string deviceType;
        string deviceIdentifier;
        uint256 registrationDate;
        bool active;
        string metadata;
    }

    mapping(uint256 => Device) public devices;
    mapping(address => uint256[]) public devicesByOwner;
    mapping(string => uint256) public deviceIdentifierToId;
    uint256 private _deviceIdCounter;

    event DeviceRegistered(
        uint256 indexed deviceId,
        address indexed owner,
        string deviceType
    );

    event DataReceived(
        uint256 indexed deviceId,
        string dataHash,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {}

    function registerDevice(
        string memory deviceType,
        string memory deviceIdentifier,
        string memory metadata
    ) public returns (uint256) {
        require(deviceIdentifierToId[deviceIdentifier] == 0, "Device already registered");
        uint256 deviceId = _deviceIdCounter++;
        devices[deviceId] = Device({
            deviceId: deviceId,
            owner: msg.sender,
            deviceType: deviceType,
            deviceIdentifier: deviceIdentifier,
            registrationDate: block.timestamp,
            active: true,
            metadata: metadata
        });

        deviceIdentifierToId[deviceIdentifier] = deviceId;
        devicesByOwner[msg.sender].push(deviceId);
        emit DeviceRegistered(deviceId, msg.sender, deviceType);
        return deviceId;
    }

    function recordData(uint256 deviceId, string memory dataHash) public {
        require(devices[deviceId].owner == msg.sender, "Not authorized");
        require(devices[deviceId].active, "Device not active");
        emit DataReceived(deviceId, dataHash, block.timestamp);
    }

    function deactivateDevice(uint256 deviceId) public {
        require(devices[deviceId].owner == msg.sender, "Not authorized");
        devices[deviceId].active = false;
    }

    function getDevice(uint256 deviceId) public view returns (Device memory) {
        return devices[deviceId];
    }
}
