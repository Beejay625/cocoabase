// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PlantationNFT
 * @dev ERC-721 NFT contract for cocoa plantations
 * Each plantation is minted as a unique NFT with onchain metadata
 */
contract PlantationNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    // Struct to store plantation data
    struct PlantationData {
        string location;
        uint256 areaHectares; // Area in hectares (stored as uint256, scaled by 1000 for decimals)
        string stage; // Growth stage (seedling, vegetative, flowering, fruiting, harvesting)
        uint256 treeCount;
        uint256 carbonOffsetTons; // Carbon offset in tons (scaled by 1000)
        uint256 mintDate;
        address minter;
    }
    
    // Mapping from token ID to plantation data
    mapping(uint256 => PlantationData) public plantations;
    
    // Mapping from wallet address to number of plantations owned
    mapping(address => uint256) public plantationCount;
    
    // Events
    event PlantationMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string location,
        uint256 areaHectares,
        string stage,
        uint256 treeCount
    );
    
    event PlantationStageUpdated(
        uint256 indexed tokenId,
        string oldStage,
        string newStage
    );
    
    event PlantationDataUpdated(
        uint256 indexed tokenId,
        uint256 treeCount,
        uint256 carbonOffsetTons
    );
    
    constructor() ERC721("Cocoa Plantation NFT", "COCOA") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new plantation NFT
     * @param to Address to mint the NFT to
     * @param tokenURI IPFS URI for the NFT metadata
     * @param location Location of the plantation
     * @param areaHectares Area in hectares (multiplied by 1000 for decimals)
     * @param stage Growth stage of the plantation
     * @param treeCount Number of trees
     * @param carbonOffsetTons Carbon offset in tons (multiplied by 1000 for decimals)
     * @return tokenId The ID of the newly minted token
     */
    function mintPlantation(
        address to,
        string memory tokenURI,
        string memory location,
        uint256 areaHectares,
        string memory stage,
        uint256 treeCount,
        uint256 carbonOffsetTons
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        plantations[tokenId] = PlantationData({
            location: location,
            areaHectares: areaHectares,
            stage: stage,
            treeCount: treeCount,
            carbonOffsetTons: carbonOffsetTons,
            mintDate: block.timestamp,
            minter: msg.sender
        });
        
        plantationCount[to]++;
        
        emit PlantationMinted(
            tokenId,
            to,
            location,
            areaHectares,
            stage,
            treeCount
        );
        
        return tokenId;
    }
    
    /**
     * @dev Update the growth stage of a plantation
     * @param tokenId The token ID of the plantation
     * @param newStage The new growth stage
     */
    function updateStage(uint256 tokenId, string memory newStage) public {
        require(_ownerOf(tokenId) == msg.sender, "Not the owner");
        require(bytes(plantations[tokenId].location).length > 0, "Plantation does not exist");
        
        string memory oldStage = plantations[tokenId].stage;
        plantations[tokenId].stage = newStage;
        
        emit PlantationStageUpdated(tokenId, oldStage, newStage);
    }
    
    /**
     * @dev Update plantation data (tree count and carbon offset)
     * @param tokenId The token ID of the plantation
     * @param treeCount New tree count
     * @param carbonOffsetTons New carbon offset in tons (multiplied by 1000)
     */
    function updatePlantationData(
        uint256 tokenId,
        uint256 treeCount,
        uint256 carbonOffsetTons
    ) public {
        require(_ownerOf(tokenId) == msg.sender, "Not the owner");
        require(bytes(plantations[tokenId].location).length > 0, "Plantation does not exist");
        
        plantations[tokenId].treeCount = treeCount;
        plantations[tokenId].carbonOffsetTons = carbonOffsetTons;
        
        emit PlantationDataUpdated(tokenId, treeCount, carbonOffsetTons);
    }
    
    /**
     * @dev Get plantation data
     * @param tokenId The token ID of the plantation
     * @return PlantationData struct containing all plantation information
     */
    function getPlantationData(uint256 tokenId) public view returns (PlantationData memory) {
        require(_ownerOf(tokenId) != address(0), "Plantation does not exist");
        return plantations[tokenId];
    }
    
    /**
     * @dev Get total number of plantations minted
     * @return Total supply of plantation NFTs
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Get number of plantations owned by an address
     * @param owner The address to query
     * @return Number of plantations owned
     */
    function balanceOfPlantations(address owner) public view returns (uint256) {
        return plantationCount[owner];
    }
    
    /**
     * @dev Override transfer to update plantation count
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        if (from != address(0)) {
            plantationCount[from]--;
        }
        if (to != address(0)) {
            plantationCount[to]++;
        }
        
        return super._update(to, tokenId, auth);
    }
}

