// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmESGImpactReporting
 * @dev Onchain ESG (Environmental, Social, Governance) impact reporting for farms
 */
contract FarmESGImpactReporting is Ownable {
    struct ESGReport {
        uint256 reportId;
        address farm;
        uint256 environmentalScore;
        uint256 socialScore;
        uint256 governanceScore;
        string reportingPeriod;
        string metadata;
        uint256 timestamp;
    }

    mapping(uint256 => ESGReport) public reports;
    mapping(address => uint256[]) public reportsByFarm;
    uint256 private _reportIdCounter;

    event ESGReportSubmitted(
        uint256 indexed reportId,
        address indexed farm,
        uint256 environmentalScore,
        uint256 socialScore,
        uint256 governanceScore
    );

    constructor() Ownable(msg.sender) {}

    function submitESGReport(
        uint256 environmentalScore,
        uint256 socialScore,
        uint256 governanceScore,
        string memory reportingPeriod,
        string memory metadata
    ) public returns (uint256) {
        uint256 reportId = _reportIdCounter++;
        reports[reportId] = ESGReport({
            reportId: reportId,
            farm: msg.sender,
            environmentalScore: environmentalScore,
            socialScore: socialScore,
            governanceScore: governanceScore,
            reportingPeriod: reportingPeriod,
            metadata: metadata,
            timestamp: block.timestamp
        });

        reportsByFarm[msg.sender].push(reportId);

        emit ESGReportSubmitted(
            reportId,
            msg.sender,
            environmentalScore,
            socialScore,
            governanceScore
        );

        return reportId;
    }

    function getReport(uint256 reportId) public view returns (ESGReport memory) {
        return reports[reportId];
    }
}


