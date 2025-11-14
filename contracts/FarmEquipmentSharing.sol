// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmEquipmentSharing
 * @dev Onchain system for sharing farm equipment between farmers
 */
contract FarmEquipmentSharing is Ownable {
    struct EquipmentShare {
        uint256 shareId;
        uint256 equipmentId;
        address owner;
        address borrower;
        uint256 startDate;
        uint256 endDate;
        uint256 deposit;
        bool active;
        bool returned;
    }

    mapping(uint256 => EquipmentShare) public equipmentShares;
    mapping(address => uint256[]) public sharesByOwner;
    mapping(address => uint256[]) public sharesByBorrower;
    uint256 private _shareIdCounter;

    event EquipmentShared(
        uint256 indexed shareId,
        address indexed owner,
        address indexed borrower,
        uint256 equipmentId
    );

    event EquipmentReturned(uint256 indexed shareId);
    event DepositRefunded(uint256 indexed shareId, address indexed borrower);

    constructor() Ownable(msg.sender) {}

    function shareEquipment(
        uint256 equipmentId,
        address borrower,
        uint256 duration,
        uint256 deposit
    ) public returns (uint256) {
        uint256 shareId = _shareIdCounter++;
        equipmentShares[shareId] = EquipmentShare({
            shareId: shareId,
            equipmentId: equipmentId,
            owner: msg.sender,
            borrower: borrower,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            deposit: deposit,
            active: true,
            returned: false
        });

        sharesByOwner[msg.sender].push(shareId);
        sharesByBorrower[borrower].push(shareId);

        emit EquipmentShared(shareId, msg.sender, borrower, equipmentId);
        return shareId;
    }

    function returnEquipment(uint256 shareId) public {
        require(equipmentShares[shareId].borrower == msg.sender, "Not the borrower");
        require(equipmentShares[shareId].active, "Share not active");
        require(!equipmentShares[shareId].returned, "Already returned");

        equipmentShares[shareId].returned = true;
        equipmentShares[shareId].active = false;

        if (equipmentShares[shareId].deposit > 0) {
            payable(msg.sender).transfer(equipmentShares[shareId].deposit);
            emit DepositRefunded(shareId, msg.sender);
        }

        emit EquipmentReturned(shareId);
    }

    function getShare(uint256 shareId) public view returns (EquipmentShare memory) {
        return equipmentShares[shareId];
    }
}

