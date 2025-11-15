// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmRoleBasedAccess
 * @dev Role-based access control with onchain permissions
 */
contract FarmRoleBasedAccess is Ownable {
    enum Role {
        NONE,
        FARMER,
        ADMIN,
        AUDITOR,
        OPERATOR
    }

    mapping(address => Role) public userRoles;
    mapping(Role => mapping(bytes32 => bool)) public rolePermissions;
    mapping(bytes32 => bool) public permissions;

    event RoleAssigned(address indexed user, Role role);
    event PermissionGranted(Role indexed role, bytes32 permission);
    event PermissionRevoked(Role indexed role, bytes32 permission);

    constructor() Ownable(msg.sender) {
        userRoles[msg.sender] = Role.ADMIN;
    }

    function assignRole(address user, Role role) public onlyOwner {
        userRoles[user] = role;
        emit RoleAssigned(user, role);
    }

    function grantPermission(Role role, bytes32 permission) public onlyOwner {
        rolePermissions[role][permission] = true;
        permissions[permission] = true;
        emit PermissionGranted(role, permission);
    }

    function revokePermission(Role role, bytes32 permission) public onlyOwner {
        rolePermissions[role][permission] = false;
        emit PermissionRevoked(role, permission);
    }

    function hasPermission(address user, bytes32 permission) public view returns (bool) {
        Role role = userRoles[user];
        return rolePermissions[role][permission] || role == Role.ADMIN;
    }
}

