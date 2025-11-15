// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilMoistureAlerts
 * @dev Onchain soil moisture alert system for irrigation management
 */
contract FarmSoilMoistureAlerts is Ownable {
    struct MoistureAlert {
        uint256 alertId;
        address farmer;
        string fieldId;
        uint256 moistureLevel;
        string alertType;
        uint256 threshold;
        uint256 alertDate;
        bool isAcknowledged;
    }

    mapping(uint256 => MoistureAlert) public alerts;
    mapping(address => uint256[]) public alertsByFarmer;
    uint256 private _alertIdCounter;

    event AlertGenerated(
        uint256 indexed alertId,
        address indexed farmer,
        string fieldId,
        string alertType
    );

    constructor() Ownable(msg.sender) {}

    function generateAlert(
        string memory fieldId,
        uint256 moistureLevel,
        string memory alertType,
        uint256 threshold
    ) public returns (uint256) {
        uint256 alertId = _alertIdCounter++;
        alerts[alertId] = MoistureAlert({
            alertId: alertId,
            farmer: msg.sender,
            fieldId: fieldId,
            moistureLevel: moistureLevel,
            alertType: alertType,
            threshold: threshold,
            alertDate: block.timestamp,
            isAcknowledged: false
        });

        alertsByFarmer[msg.sender].push(alertId);
        emit AlertGenerated(alertId, msg.sender, fieldId, alertType);
        return alertId;
    }

    function acknowledgeAlert(uint256 alertId) public {
        require(alerts[alertId].farmer == msg.sender, "Not alert owner");
        alerts[alertId].isAcknowledged = true;
    }

    function getAlert(uint256 alertId) public view returns (MoistureAlert memory) {
        return alerts[alertId];
    }
}

