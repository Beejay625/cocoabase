// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmCropOriginVerification
 * @dev Onchain crop geographic origin verification and certification
 */
contract FarmCropOriginVerification is Ownable {
    struct OriginVerification {
        uint256 verificationId;
        address farmer;
        string cropBatchId;
        string originLocation;
        string coordinates;
        uint256 verificationDate;
        bool isVerified;
        address verifier;
    }

    mapping(uint256 => OriginVerification) public verifications;
    mapping(address => uint256[]) public verificationsByFarmer;
    uint256 private _verificationIdCounter;

    event OriginVerified(
        uint256 indexed verificationId,
        address indexed farmer,
        string cropBatchId,
        string originLocation
    );

    constructor() Ownable(msg.sender) {}

    function requestVerification(
        string memory cropBatchId,
        string memory originLocation,
        string memory coordinates
    ) public returns (uint256) {
        uint256 verificationId = _verificationIdCounter++;
        verifications[verificationId] = OriginVerification({
            verificationId: verificationId,
            farmer: msg.sender,
            cropBatchId: cropBatchId,
            originLocation: originLocation,
            coordinates: coordinates,
            verificationDate: 0,
            isVerified: false,
            verifier: address(0)
        });

        verificationsByFarmer[msg.sender].push(verificationId);
        return verificationId;
    }

    function verifyOrigin(uint256 verificationId) public onlyOwner {
        require(!verifications[verificationId].isVerified, "Already verified");
        verifications[verificationId].isVerified = true;
        verifications[verificationId].verifier = msg.sender;
        verifications[verificationId].verificationDate = block.timestamp;

        emit OriginVerified(
            verificationId,
            verifications[verificationId].farmer,
            verifications[verificationId].cropBatchId,
            verifications[verificationId].originLocation
        );
    }

    function getVerification(uint256 verificationId) public view returns (OriginVerification memory) {
        return verifications[verificationId];
    }
}
