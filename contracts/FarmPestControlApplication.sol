// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPestControlApplication
 * @dev Pest control application tracking and effectiveness
 */
contract FarmPestControlApplication is Ownable {
    struct Application {
        uint256 applicationId;
        address farmer;
        string fieldId;
        string pesticideType;
        uint256 quantity;
        uint256 applicationDate;
        bool effective;
    }

    mapping(uint256 => Application) public applications;
    mapping(address => uint256[]) public applicationsByFarmer;
    uint256 private _applicationIdCounter;

    event ApplicationRecorded(
        uint256 indexed applicationId,
        address indexed farmer,
        string pesticideType
    );

    constructor() Ownable(msg.sender) {}

    function recordApplication(
        string memory fieldId,
        string memory pesticideType,
        uint256 quantity
    ) public returns (uint256) {
        uint256 applicationId = _applicationIdCounter++;
        applications[applicationId] = Application({
            applicationId: applicationId,
            farmer: msg.sender,
            fieldId: fieldId,
            pesticideType: pesticideType,
            quantity: quantity,
            applicationDate: block.timestamp,
            effective: false
        });

        applicationsByFarmer[msg.sender].push(applicationId);
        emit ApplicationRecorded(applicationId, msg.sender, pesticideType);
        return applicationId;
    }

    function markEffective(uint256 applicationId) public {
        require(applications[applicationId].farmer == msg.sender, "Not authorized");
        applications[applicationId].effective = true;
    }

    function getApplication(uint256 applicationId) public view returns (Application memory) {
        return applications[applicationId];
    }
}
