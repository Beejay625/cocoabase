// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSeedTreatmentTracking
 * @dev Track seed treatment applications and effectiveness
 */
contract FarmSeedTreatmentTracking is Ownable {
    struct Treatment {
        uint256 treatmentId;
        address farmer;
        string seedBatch;
        string treatmentType;
        uint256 treatmentDate;
        bool effective;
    }

    mapping(uint256 => Treatment) public treatments;
    mapping(address => uint256[]) public treatmentsByFarmer;
    uint256 private _treatmentIdCounter;

    event TreatmentRecorded(
        uint256 indexed treatmentId,
        address indexed farmer,
        string treatmentType
    );

    constructor() Ownable(msg.sender) {}

    function recordTreatment(
        string memory seedBatch,
        string memory treatmentType
    ) public returns (uint256) {
        uint256 treatmentId = _treatmentIdCounter++;
        treatments[treatmentId] = Treatment({
            treatmentId: treatmentId,
            farmer: msg.sender,
            seedBatch: seedBatch,
            treatmentType: treatmentType,
            treatmentDate: block.timestamp,
            effective: false
        });

        treatmentsByFarmer[msg.sender].push(treatmentId);
        emit TreatmentRecorded(treatmentId, msg.sender, treatmentType);
        return treatmentId;
    }

    function markEffective(uint256 treatmentId) public {
        require(treatments[treatmentId].farmer == msg.sender, "Not authorized");
        treatments[treatmentId].effective = true;
    }

    function getTreatment(uint256 treatmentId) public view returns (Treatment memory) {
        return treatments[treatmentId];
    }
}
