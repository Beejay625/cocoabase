// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLivestockReproductionMonitoring
 * @dev Livestock reproduction cycle monitoring
 */
contract FarmLivestockReproductionMonitoring is Ownable {
    struct ReproductionCycle {
        uint256 cycleId;
        address farmer;
        string livestockId;
        uint256 cycleStartDate;
        uint256 expectedCalvingDate;
        bool completed;
    }

    mapping(uint256 => ReproductionCycle) public cycles;
    mapping(address => uint256[]) public cyclesByFarmer;
    uint256 private _cycleIdCounter;

    event CycleRecorded(
        uint256 indexed cycleId,
        address indexed farmer,
        string livestockId
    );

    event CycleCompleted(
        uint256 indexed cycleId,
        uint256 completionDate
    );

    constructor() Ownable(msg.sender) {}

    function recordCycle(
        string memory livestockId,
        uint256 cycleStartDate,
        uint256 expectedCalvingDate
    ) public returns (uint256) {
        uint256 cycleId = _cycleIdCounter++;
        cycles[cycleId] = ReproductionCycle({
            cycleId: cycleId,
            farmer: msg.sender,
            livestockId: livestockId,
            cycleStartDate: cycleStartDate,
            expectedCalvingDate: expectedCalvingDate,
            completed: false
        });

        cyclesByFarmer[msg.sender].push(cycleId);
        emit CycleRecorded(cycleId, msg.sender, livestockId);
        return cycleId;
    }

    function completeCycle(uint256 cycleId) public {
        require(cycles[cycleId].farmer == msg.sender, "Not authorized");
        cycles[cycleId].completed = true;
        emit CycleCompleted(cycleId, block.timestamp);
    }

    function getCycle(uint256 cycleId) public view returns (ReproductionCycle memory) {
        return cycles[cycleId];
    }
}
