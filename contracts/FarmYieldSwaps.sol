// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmYieldSwaps
 * @dev Yield swap derivatives for risk management
 */
contract FarmYieldSwaps is Ownable {
    struct Swap {
        uint256 swapId;
        address farmer;
        address counterparty;
        uint256 expectedYield;
        uint256 fixedPrice;
        uint256 actualYield;
        bool settled;
    }

    mapping(uint256 => Swap) public swaps;
    mapping(address => uint256[]) public swapsByFarmer;
    uint256 private _swapIdCounter;

    event SwapCreated(
        uint256 indexed swapId,
        address indexed farmer,
        address indexed counterparty
    );
    event SwapSettled(uint256 indexed swapId, uint256 actualYield, uint256 settlement);

    constructor() Ownable(msg.sender) {}

    function createSwap(
        address counterparty,
        uint256 expectedYield,
        uint256 fixedPrice
    ) public returns (uint256) {
        require(expectedYield > 0, "Invalid yield");
        require(fixedPrice > 0, "Invalid price");
        
        uint256 swapId = _swapIdCounter++;
        swaps[swapId] = Swap({
            swapId: swapId,
            farmer: msg.sender,
            counterparty: counterparty,
            expectedYield: expectedYield,
            fixedPrice: fixedPrice,
            actualYield: 0,
            settled: false
        });
        swapsByFarmer[msg.sender].push(swapId);
        emit SwapCreated(swapId, msg.sender, counterparty);
        return swapId;
    }

    function settleSwap(uint256 swapId, uint256 actualYield) public {
        Swap storage swap = swaps[swapId];
        require(swap.farmer == msg.sender, "Not the farmer");
        require(!swap.settled, "Already settled");
        
        swap.actualYield = actualYield;
        swap.settled = true;
        
        uint256 settlement = 0;
        if (actualYield < swap.expectedYield) {
            uint256 shortfall = swap.expectedYield - actualYield;
            settlement = shortfall * swap.fixedPrice;
        }
        
        if (settlement > 0) {
            require(address(this).balance >= settlement, "Insufficient funds");
            payable(swap.farmer).transfer(settlement);
        }
        emit SwapSettled(swapId, actualYield, settlement);
    }

    receive() external payable {}
}

