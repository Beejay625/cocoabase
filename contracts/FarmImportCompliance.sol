// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmImportCompliance
 * @dev Import compliance tracking and verification
 */
contract FarmImportCompliance is Ownable {
    struct ImportRecord {
        uint256 importId;
        address importer;
        string productId;
        string originCountry;
        uint256 importDate;
        bool compliant;
        string complianceCertificate;
    }

    mapping(uint256 => ImportRecord) public imports;
    mapping(address => uint256[]) public importsByImporter;
    uint256 private _importIdCounter;

    event ImportRecorded(
        uint256 indexed importId,
        address indexed importer,
        string originCountry
    );

    event ComplianceVerified(
        uint256 indexed importId,
        bool compliant
    );

    constructor() Ownable(msg.sender) {}

    function recordImport(
        string memory productId,
        string memory originCountry,
        string memory complianceCertificate
    ) public returns (uint256) {
        uint256 importId = _importIdCounter++;
        imports[importId] = ImportRecord({
            importId: importId,
            importer: msg.sender,
            productId: productId,
            originCountry: originCountry,
            importDate: block.timestamp,
            compliant: false,
            complianceCertificate: complianceCertificate
        });

        importsByImporter[msg.sender].push(importId);
        emit ImportRecorded(importId, msg.sender, originCountry);
        return importId;
    }

    function verifyCompliance(uint256 importId, bool compliant) public onlyOwner {
        imports[importId].compliant = compliant;
        emit ComplianceVerified(importId, compliant);
    }

    function getImport(uint256 importId) public view returns (ImportRecord memory) {
        return imports[importId];
    }
}
