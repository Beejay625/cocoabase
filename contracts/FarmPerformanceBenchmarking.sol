// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmPerformanceBenchmarking
 * @dev Onchain performance benchmarking system
 */
contract FarmPerformanceBenchmarking is Ownable {
    struct Benchmark {
        uint256 benchmarkId;
        address farmOwner;
        uint256 metric;
        string metricType;
        uint256 benchmarkValue;
        uint256 actualValue;
        uint256 date;
        bool exceedsBenchmark;
    }

    mapping(uint256 => Benchmark) public benchmarks;
    mapping(address => uint256[]) public benchmarksByOwner;
    uint256 private _benchmarkIdCounter;

    event BenchmarkCreated(
        uint256 indexed benchmarkId,
        address indexed farmOwner,
        string metricType
    );

    event BenchmarkUpdated(
        uint256 indexed benchmarkId,
        uint256 actualValue,
        bool exceedsBenchmark
    );

    constructor() Ownable(msg.sender) {}

    function createBenchmark(
        address farmOwner,
        uint256 benchmarkValue,
        string memory metricType
    ) public returns (uint256) {
        uint256 benchmarkId = _benchmarkIdCounter++;
        benchmarks[benchmarkId] = Benchmark({
            benchmarkId: benchmarkId,
            farmOwner: farmOwner,
            metric: 0,
            metricType: metricType,
            benchmarkValue: benchmarkValue,
            actualValue: 0,
            date: block.timestamp,
            exceedsBenchmark: false
        });

        benchmarksByOwner[farmOwner].push(benchmarkId);

        emit BenchmarkCreated(benchmarkId, farmOwner, metricType);
        return benchmarkId;
    }

    function updateBenchmark(uint256 benchmarkId, uint256 actualValue) public {
        Benchmark storage benchmark = benchmarks[benchmarkId];
        require(benchmark.farmOwner == msg.sender, "Not the owner");

        benchmark.actualValue = actualValue;
        benchmark.exceedsBenchmark = actualValue >= benchmark.benchmarkValue;

        emit BenchmarkUpdated(benchmarkId, actualValue, benchmark.exceedsBenchmark);
    }

    function getBenchmark(uint256 benchmarkId) public view returns (Benchmark memory) {
        return benchmarks[benchmarkId];
    }

    function getBenchmarksByOwner(address owner) public view returns (uint256[] memory) {
        return benchmarksByOwner[owner];
    }
}

