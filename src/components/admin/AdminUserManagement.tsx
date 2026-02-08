"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminClientService } from "@/services/admin/admin.service.client";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
  status: "ACTIVE" | "BLOCKED";
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 10; // Users per page

  // Fetch users with pagination
  const fetchUsers = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users?page=${page}&limit=${PAGE_LIMIT}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setUsers(data.data || []);
      setTotalPages(data.pagination.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  const handleRoleChange = async (userId: string, role: User["role"]) => {
    const confirm = await Swal.fire({
      title: "Change user role?",
      text: `Set role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await adminClientService.updateUserRole(userId, role);
      if (result.success) {
        Swal.fire("Updated", "User role updated", "success");
        fetchUsers(currentPage);
      } else {
        Swal.fire("Error", result.message || "Failed to update role", "error");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to update role", "error");
    }
  };

  const handleStatusToggle = async (user: User) => {
    const action = user.status === "ACTIVE" ? "block" : "unblock";
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${action} this user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (!confirm.isConfirmed) return;

    try {
      const result = await adminClientService.blockOrUnblockUser(
        user.id,
        user.status === "ACTIVE" ? "BLOCK" : "ACTIVE"
      );
      if (result.success) {
        Swal.fire("Success", `User ${action}ed`, "success");
        fetchUsers(currentPage);
      } else {
        Swal.fire("Error", result.message || "Action failed", "error");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Action failed", "error");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirm = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      const result = await adminClientService.deleteUser(userId);
      if (result.success) {
        Swal.fire("Deleted", "User deleted successfully", "success");
        fetchUsers(currentPage);
      } else {
        Swal.fire("Error", result.message || "Failed to delete user", "error");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to delete user", "error");
    }
  };

  const handleViewDetails = (user: User) => {
    Swal.fire({
      title: `${user.name} - Details`,
      html: `<p><strong>Email:</strong> ${user.email}</p>
             <p><strong>Role:</strong> ${user.role}</p>
             <p><strong>Status:</strong> ${user.status}</p>`,
      icon: "info",
    });
  };

  const SkeletonRow = () => (
    <TableRow>
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <TableCell key={idx}>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          </TableCell>
        ))}
    </TableRow>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, idx) => <SkeletonRow key={idx} />)
              : users.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )
              : users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) =>
                          handleRoleChange(user.id, value as User["role"])
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="SELLER">SELLER</SelectItem>
                          <SelectItem value="USER">USER</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button size="sm" onClick={() => handleViewDetails(user)}>
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant={user.status === "ACTIVE" ? "destructive" : "default"}
                        onClick={() => handleStatusToggle(user)}
                      >
                        {user.status === "ACTIVE" ? "Block" : "Unblock"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              size="sm"
              disabled={currentPage === 1}
              onClick={() => fetchUsers(currentPage - 1)}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => fetchUsers(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserManagement;
