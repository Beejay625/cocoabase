// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFieldMapping
 * @dev Onchain system for mapping farm fields with GPS coordinates
 */
contract FarmFieldMapping is Ownable {
    struct FieldMap {
        uint256 mapId;
        uint256 plantationId;
        string coordinates;
        uint256 areaHectares;
        string fieldType;
        address mapper;
        uint256 mappingDate;
    }

    mapping(uint256 => FieldMap) public fieldMaps;
    mapping(address => uint256[]) public mapsByMapper;
    uint256 private _mapIdCounter;

    event FieldMapped(
        uint256 indexed mapId,
        address indexed mapper,
        uint256 plantationId
    );

    constructor() Ownable(msg.sender) {}

    function createFieldMap(
        uint256 plantationId,
        string memory coordinates,
        uint256 areaHectares,
        string memory fieldType
    ) public returns (uint256) {
        uint256 mapId = _mapIdCounter++;
        fieldMaps[mapId] = FieldMap({
            mapId: mapId,
            plantationId: plantationId,
            coordinates: coordinates,
            areaHectares: areaHectares,
            fieldType: fieldType,
            mapper: msg.sender,
            mappingDate: block.timestamp
        });

        mapsByMapper[msg.sender].push(mapId);

        emit FieldMapped(mapId, msg.sender, plantationId);
        return mapId;
    }

    function getMap(uint256 mapId) public view returns (FieldMap memory) {
        return fieldMaps[mapId];
    }
}



