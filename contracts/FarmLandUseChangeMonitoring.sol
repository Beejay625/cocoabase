// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmLandUseChangeMonitoring
 * @dev Monitor land use changes, habitat conversion, and soil degradation onchain
 */
contract FarmLandUseChangeMonitoring is Ownable {
    struct LandUseChange {
        uint256 changeId;
        address reporter;
        string parcelId;
        string previousUse;
        string newUse;
        string impactSummary;
        uint256 timestamp;
    }

    mapping(uint256 => LandUseChange) public changes;
    mapping(string => uint256[]) public changesByParcel;
    uint256 private _changeIdCounter;

    event LandUseChangeRecorded(
        uint256 indexed changeId,
        string parcelId,
        string previousUse,
        string newUse
    );

    constructor() Ownable(msg.sender) {}

    function recordLandUseChange(
        string memory parcelId,
        string memory previousUse,
        string memory newUse,
        string memory impactSummary
    ) public returns (uint256) {
        uint256 changeId = _changeIdCounter++;
        changes[changeId] = LandUseChange({
            changeId: changeId,
            reporter: msg.sender,
            parcelId: parcelId,
            previousUse: previousUse,
            newUse: newUse,
            impactSummary: impactSummary,
            timestamp: block.timestamp
        });

        changesByParcel[parcelId].push(changeId);

        emit LandUseChangeRecorded(changeId, parcelId, previousUse, newUse);
        return changeId;
    }

    function getChange(uint256 changeId) public view returns (LandUseChange memory) {
        return changes[changeId];
    }
}


