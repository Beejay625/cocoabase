// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmFarmerEducation
 * @dev Farmer education and certification tracking
 */
contract FarmFarmerEducation is Ownable {
    struct Course {
        uint256 courseId;
        string courseName;
        address instructor;
        uint256 completionDate;
        bytes32 certificateHash;
    }

    struct Enrollment {
        uint256 enrollmentId;
        address farmer;
        uint256 courseId;
        uint256 enrollmentDate;
        bool completed;
    }

    mapping(uint256 => Course) public courses;
    mapping(uint256 => Enrollment) public enrollments;
    mapping(address => uint256[]) public enrollmentsByFarmer;
    mapping(address => bool) public isInstructor;
    uint256 private _courseIdCounter;
    uint256 private _enrollmentIdCounter;

    event CourseCreated(uint256 indexed courseId, string courseName);
    event EnrollmentCreated(uint256 indexed enrollmentId, address indexed farmer);
    event CourseCompleted(uint256 indexed enrollmentId);

    constructor() Ownable(msg.sender) {
        isInstructor[msg.sender] = true;
    }

    function addInstructor(address instructor) public onlyOwner {
        isInstructor[instructor] = true;
    }

    function createCourse(
        string memory courseName,
        bytes32 certificateHash
    ) public returns (uint256) {
        require(isInstructor[msg.sender], "Not an instructor");
        uint256 courseId = _courseIdCounter++;
        courses[courseId] = Course({
            courseId: courseId,
            courseName: courseName,
            instructor: msg.sender,
            completionDate: 0,
            certificateHash: certificateHash
        });
        emit CourseCreated(courseId, courseName);
        return courseId;
    }

    function enrollInCourse(uint256 courseId) public returns (uint256) {
        uint256 enrollmentId = _enrollmentIdCounter++;
        enrollments[enrollmentId] = Enrollment({
            enrollmentId: enrollmentId,
            farmer: msg.sender,
            courseId: courseId,
            enrollmentDate: block.timestamp,
            completed: false
        });
        enrollmentsByFarmer[msg.sender].push(enrollmentId);
        emit EnrollmentCreated(enrollmentId, msg.sender);
        return enrollmentId;
    }

    function completeCourse(uint256 enrollmentId) public {
        require(enrollments[enrollmentId].farmer == msg.sender, "Not enrolled");
        enrollments[enrollmentId].completed = true;
        emit CourseCompleted(enrollmentId);
    }
}

