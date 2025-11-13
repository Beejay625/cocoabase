// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmAssetTokenization
 * @dev Tokenize farm assets as NFTs
 */
contract FarmAssetTokenization is ERC721, Ownable {
    struct Asset {
        uint256 assetId;
        string assetType;
        uint256 value;
        string metadata;
        uint256 tokenizationDate;
    }

    mapping(uint256 => Asset) public assets;
    mapping(address => uint256[]) public assetsByOwner;
    uint256 private _tokenIdCounter;

    event AssetTokenized(
        uint256 indexed tokenId,
        address indexed owner,
        string assetType,
        uint256 value
    );

    constructor() ERC721("Farm Asset", "FARMASSET") Ownable(msg.sender) {}

    function tokenizeAsset(
        address to,
        string memory assetType,
        uint256 value,
        string memory metadata
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);

        assets[tokenId] = Asset({
            assetId: tokenId,
            assetType: assetType,
            value: value,
            metadata: metadata,
            tokenizationDate: block.timestamp
        });

        assetsByOwner[to].push(tokenId);

        emit AssetTokenized(tokenId, to, assetType, value);
        return tokenId;
    }

    function getAsset(uint256 tokenId) public view returns (Asset memory) {
        return assets[tokenId];
    }

    function getAssetsByOwner(address owner) public view returns (uint256[] memory) {
        return assetsByOwner[owner];
    }
}

