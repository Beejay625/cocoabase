// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPollinatorSupport
 * @dev Onchain system for tracking pollinator support initiatives and habitat
 */
contract FarmPollinatorSupport is Ownable {
    struct PollinatorSupport {
        uint256 supportId;
        uint256 farmId;
        string habitatType;
        uint256 habitatArea;
        uint256 pollinatorCount;
        uint256 recordDate;
        address recorder;
    }

    mapping(uint256 => PollinatorSupport) public pollinatorSupports;
    mapping(address => uint256[]) public supportsByRecorder;
    uint256 private _supportIdCounter;

    event PollinatorSupportRecorded(
        uint256 indexed supportId,
        address indexed recorder,
        string habitatType
    );

    constructor() Ownable(msg.sender) {}

    function recordPollinatorSupport(
        uint256 farmId,
        string memory habitatType,
        uint256 habitatArea,
        uint256 pollinatorCount,
        uint256 recordDate
    ) public returns (uint256) {
        uint256 supportId = _supportIdCounter++;
        pollinatorSupports[supportId] = PollinatorSupport({
            supportId: supportId,
            farmId: farmId,
            habitatType: habitatType,
            habitatArea: habitatArea,
            pollinatorCount: pollinatorCount,
            recordDate: recordDate,
            recorder: msg.sender
        });

        supportsByRecorder[msg.sender].push(supportId);

        emit PollinatorSupportRecorded(supportId, msg.sender, habitatType);
        return supportId;
    }

    function getSupport(uint256 supportId) public view returns (PollinatorSupport memory) {
        return pollinatorSupports[supportId];
    }
}

