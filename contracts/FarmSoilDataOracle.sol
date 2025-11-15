// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmSoilDataOracle
 * @dev External soil testing data oracle integration
 */
contract FarmSoilDataOracle is Ownable {
    struct SoilData {
        uint256 ph;
        uint256 nitrogen;
        uint256 phosphorus;
        uint256 potassium;
        uint256 organicMatter;
        uint256 timestamp;
        address tester;
    }

    mapping(uint256 => SoilData) public soilData;
    mapping(address => bool) public isSoilTester;
    uint256 private _dataIdCounter;
    uint256 public dataStalenessThreshold = 30 days;

    event SoilDataSubmitted(
        uint256 indexed dataId,
        uint256 indexed fieldId,
        address indexed tester
    );
    event SoilTesterAdded(address indexed tester);
    event SoilTesterRemoved(address indexed tester);

    constructor() Ownable(msg.sender) {}

    function addSoilTester(address tester) public onlyOwner {
        isSoilTester[tester] = true;
        emit SoilTesterAdded(tester);
    }

    function submitSoilData(
        uint256 fieldId,
        uint256 ph,
        uint256 nitrogen,
        uint256 phosphorus,
        uint256 potassium,
        uint256 organicMatter
    ) public returns (uint256) {
        require(isSoilTester[msg.sender], "Not a soil tester");
        uint256 dataId = _dataIdCounter++;
        soilData[dataId] = SoilData({
            ph: ph,
            nitrogen: nitrogen,
            phosphorus: phosphorus,
            potassium: potassium,
            organicMatter: organicMatter,
            timestamp: block.timestamp,
            tester: msg.sender
        });
        emit SoilDataSubmitted(dataId, fieldId, msg.sender);
        return dataId;
    }

    function getSoilData(uint256 dataId) public view returns (SoilData memory) {
        require(
            block.timestamp - soilData[dataId].timestamp <= dataStalenessThreshold,
            "Data too stale"
        );
        return soilData[dataId];
    }
}

