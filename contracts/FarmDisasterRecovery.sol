// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmDisasterRecovery
 * @dev Disaster recovery fund and emergency assistance system
 */
contract FarmDisasterRecovery is Ownable {
    struct DisasterEvent {
        uint256 eventId;
        address farmer;
        string disasterType;
        string location;
        uint256 eventDate;
        uint256 estimatedLoss;
        bool verified;
        bool assistanceGranted;
    }

    struct RecoveryFund {
        address donor;
        uint256 amount;
        uint256 donationDate;
    }

    mapping(uint256 => DisasterEvent) public events;
    mapping(address => uint256[]) public eventsByFarmer;
    RecoveryFund[] public funds;
    uint256 public totalFunds;
    uint256 private _eventIdCounter;

    event DisasterReported(
        uint256 indexed eventId,
        address indexed farmer,
        string disasterType
    );

    event FundDonated(
        address indexed donor,
        uint256 amount
    );

    event AssistanceGranted(
        uint256 indexed eventId,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function reportDisaster(
        string memory disasterType,
        string memory location,
        uint256 estimatedLoss
    ) public returns (uint256) {
        uint256 eventId = _eventIdCounter++;
        events[eventId] = DisasterEvent({
            eventId: eventId,
            farmer: msg.sender,
            disasterType: disasterType,
            location: location,
            eventDate: block.timestamp,
            estimatedLoss: estimatedLoss,
            verified: false,
            assistanceGranted: false
        });

        eventsByFarmer[msg.sender].push(eventId);
        emit DisasterReported(eventId, msg.sender, disasterType);
        return eventId;
    }

    function donateToFund() public payable {
        require(msg.value > 0, "Invalid donation amount");
        funds.push(RecoveryFund({
            donor: msg.sender,
            amount: msg.value,
            donationDate: block.timestamp
        }));
        totalFunds += msg.value;
        emit FundDonated(msg.sender, msg.value);
    }

    function grantAssistance(uint256 eventId, uint256 amount) public onlyOwner {
        require(events[eventId].verified, "Event not verified");
        require(!events[eventId].assistanceGranted, "Already granted");
        require(amount <= totalFunds, "Insufficient funds");
        events[eventId].assistanceGranted = true;
        totalFunds -= amount;
        payable(events[eventId].farmer).transfer(amount);
        emit AssistanceGranted(eventId, amount);
    }

    function verifyDisaster(uint256 eventId) public onlyOwner {
        events[eventId].verified = true;
    }

    function getEvent(uint256 eventId) public view returns (DisasterEvent memory) {
        return events[eventId];
    }
}
