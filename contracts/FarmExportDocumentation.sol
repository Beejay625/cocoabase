// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmExportDocumentation
 * @dev Export documentation and certification management
 */
contract FarmExportDocumentation is Ownable {
    struct ExportDocument {
        uint256 documentId;
        address exporter;
        string productId;
        string destinationCountry;
        uint256 exportDate;
        string certificateHash;
        bool verified;
    }

    mapping(uint256 => ExportDocument) public documents;
    mapping(address => uint256[]) public documentsByExporter;
    uint256 private _documentIdCounter;

    event DocumentIssued(
        uint256 indexed documentId,
        address indexed exporter,
        string destinationCountry
    );

    event DocumentVerified(
        uint256 indexed documentId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function issueDocument(
        string memory productId,
        string memory destinationCountry,
        string memory certificateHash
    ) public returns (uint256) {
        uint256 documentId = _documentIdCounter++;
        documents[documentId] = ExportDocument({
            documentId: documentId,
            exporter: msg.sender,
            productId: productId,
            destinationCountry: destinationCountry,
            exportDate: block.timestamp,
            certificateHash: certificateHash,
            verified: false
        });

        documentsByExporter[msg.sender].push(documentId);
        emit DocumentIssued(documentId, msg.sender, destinationCountry);
        return documentId;
    }

    function verifyDocument(uint256 documentId) public onlyOwner {
        documents[documentId].verified = true;
        emit DocumentVerified(documentId, msg.sender);
    }

    function getDocument(uint256 documentId) public view returns (ExportDocument memory) {
        return documents[documentId];
    }
}
