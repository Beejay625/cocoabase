// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropVariety
 * @dev Onchain crop variety management
 */
contract FarmCropVariety is Ownable {
    struct CropVariety {
        uint256 varietyId;
        address farmer;
        string varietyName;
        string cropType;
        string characteristics;
        uint256 yield;
        uint256 resistance;
        uint256 quality;
        bool isActive;
        uint256 registrationDate;
    }

    mapping(uint256 => CropVariety) public cropVarieties;
    mapping(address => uint256[]) public varietiesByFarmer;
    mapping(string => uint256[]) public varietiesByCropType;
    uint256 private _varietyIdCounter;

    event CropVarietyRegistered(
        uint256 indexed varietyId,
        address indexed farmer,
        string varietyName,
        string cropType
    );

    constructor() Ownable(msg.sender) {}

    function registerCropVariety(
        string memory varietyName,
        string memory cropType,
        string memory characteristics,
        uint256 yield,
        uint256 resistance,
        uint256 quality
    ) public returns (uint256) {
        require(yield > 0, "Yield must be greater than 0");
        require(resistance >= 0 && resistance <= 100, "Invalid resistance");
        require(quality >= 0 && quality <= 100, "Invalid quality");

        uint256 varietyId = _varietyIdCounter++;
        cropVarieties[varietyId] = CropVariety({
            varietyId: varietyId,
            farmer: msg.sender,
            varietyName: varietyName,
            cropType: cropType,
            characteristics: characteristics,
            yield: yield,
            resistance: resistance,
            quality: quality,
            isActive: true,
            registrationDate: block.timestamp
        });

        varietiesByFarmer[msg.sender].push(varietyId);
        varietiesByCropType[cropType].push(varietyId);

        emit CropVarietyRegistered(varietyId, msg.sender, varietyName, cropType);
        return varietyId;
    }

    function updateCropVariety(
        uint256 varietyId,
        uint256 yield,
        uint256 resistance,
        uint256 quality
    ) public {
        require(cropVarieties[varietyId].farmer == msg.sender, "Not the farmer");
        require(cropVarieties[varietyId].isActive, "Variety not active");

        cropVarieties[varietyId].yield = yield;
        cropVarieties[varietyId].resistance = resistance;
        cropVarieties[varietyId].quality = quality;
    }

    function getCropVariety(uint256 varietyId) public view returns (CropVariety memory) {
        return cropVarieties[varietyId];
    }

    function getVarietiesByFarmer(address farmer) public view returns (uint256[] memory) {
        return varietiesByFarmer[farmer];
    }

    function getVarietiesByCropType(string memory cropType) public view returns (uint256[] memory) {
        return varietiesByCropType[cropType];
    }
}

