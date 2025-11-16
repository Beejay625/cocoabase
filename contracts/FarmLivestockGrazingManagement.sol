// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockGrazingManagement
 * @dev Onchain grazing schedules and pasture rotation management
 */
contract FarmLivestockGrazingManagement is Ownable {
    struct GrazingManagement {
        uint256 managementId;
        address farmer;
        string livestockGroupId;
        string currentPasture;
        uint256 grazingStartDate;
        uint256 grazingEndDate;
        uint256 carryingCapacity;
        uint256 livestockCount;
        bool isActive;
    }

    mapping(uint256 => GrazingManagement) public managements;
    mapping(address => uint256[]) public managementsByFarmer;
    uint256 private _managementIdCounter;

    event ManagementRecorded(
        uint256 indexed managementId,
        address indexed farmer,
        string livestockGroupId,
        string currentPasture
    );

    constructor() Ownable(msg.sender) {}

    function recordManagement(
        string memory livestockGroupId,
        string memory currentPasture,
        uint256 grazingStartDate,
        uint256 carryingCapacity,
        uint256 livestockCount
    ) public returns (uint256) {
        uint256 managementId = _managementIdCounter++;
        managements[managementId] = GrazingManagement({
            managementId: managementId,
            farmer: msg.sender,
            livestockGroupId: livestockGroupId,
            currentPasture: currentPasture,
            grazingStartDate: grazingStartDate,
            grazingEndDate: 0,
            carryingCapacity: carryingCapacity,
            livestockCount: livestockCount,
            isActive: true
        });

        managementsByFarmer[msg.sender].push(managementId);
        emit ManagementRecorded(managementId, msg.sender, livestockGroupId, currentPasture);
        return managementId;
    }

    function endGrazing(uint256 managementId) public {
        require(managements[managementId].farmer == msg.sender, "Not management owner");
        managements[managementId].grazingEndDate = block.timestamp;
        managements[managementId].isActive = false;
    }

    function getManagement(uint256 managementId) public view returns (GrazingManagement memory) {
        return managements[managementId];
    }
}
