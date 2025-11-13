// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmComplianceReporting
 * @dev Onchain compliance reporting system
 */
contract FarmComplianceReporting is Ownable {
    struct ComplianceReport {
        uint256 reportId;
        address reporter;
        string reportType;
        string data;
        uint256 submissionDate;
        bool verified;
        address verifier;
    }

    mapping(uint256 => ComplianceReport) public reports;
    mapping(address => uint256[]) public reportsByReporter;
    uint256 private _reportIdCounter;

    event ReportSubmitted(
        uint256 indexed reportId,
        address indexed reporter,
        string reportType
    );

    event ReportVerified(
        uint256 indexed reportId,
        address indexed verifier
    );

    constructor() Ownable(msg.sender) {}

    function submitReport(
        string memory reportType,
        string memory data
    ) public returns (uint256) {
        uint256 reportId = _reportIdCounter++;
        reports[reportId] = ComplianceReport({
            reportId: reportId,
            reporter: msg.sender,
            reportType: reportType,
            data: data,
            submissionDate: block.timestamp,
            verified: false,
            verifier: address(0)
        });

        reportsByReporter[msg.sender].push(reportId);

        emit ReportSubmitted(reportId, msg.sender, reportType);
        return reportId;
    }

    function verifyReport(uint256 reportId) public onlyOwner {
        require(!reports[reportId].verified, "Already verified");
        reports[reportId].verified = true;
        reports[reportId].verifier = msg.sender;

        emit ReportVerified(reportId, msg.sender);
    }

    function getReport(uint256 reportId) public view returns (ComplianceReport memory) {
        return reports[reportId];
    }

    function getReportsByReporter(address reporter) public view returns (uint256[] memory) {
        return reportsByReporter[reporter];
    }
}

