// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEcosystemServices
 * @dev Onchain system for valuing and tracking ecosystem services provided by farms
 */
contract FarmEcosystemServices is Ownable {
    struct EcosystemService {
        uint256 serviceId;
        uint256 farmId;
        string serviceType;
        uint256 serviceValue;
        string description;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => EcosystemService) public ecosystemServices;
    mapping(address => uint256[]) public servicesByRecorder;
    uint256 private _serviceIdCounter;

    event EcosystemServiceRecorded(
        uint256 indexed serviceId,
        address indexed recorder,
        string serviceType
    );

    constructor() Ownable(msg.sender) {}

    function recordEcosystemService(
        uint256 farmId,
        string memory serviceType,
        uint256 serviceValue,
        string memory description,
        uint256 recordDate
    ) public returns (uint256) {
        uint256 serviceId = _serviceIdCounter++;
        ecosystemServices[serviceId] = EcosystemService({
            serviceId: serviceId,
            farmId: farmId,
            serviceType: serviceType,
            serviceValue: serviceValue,
            description: description,
            recordDate: recordDate,
            recorder: msg.sender
        });

        servicesByRecorder[msg.sender].push(serviceId);

        emit EcosystemServiceRecorded(serviceId, msg.sender, serviceType);
        return serviceId;
    }

    function getService(uint256 serviceId) public view returns (EcosystemService memory) {
        return ecosystemServices[serviceId];
    }
}

