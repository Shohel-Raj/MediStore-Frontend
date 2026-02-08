"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function UserProfile() {
  const { data: session, isPending, error } = authClient.useSession();
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const user = session?.user;

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire(
        "Error",
        "New password and confirm password do not match",
        "error",
      );
      return;
    }

    setUpdatingPassword(true);

    try {
      // This will throw if the password change fails
      const { data, error } = await authClient.changePassword({
        newPassword: newPassword, // required
        currentPassword: currentPassword, // required
        revokeOtherSessions: true,
      });
      console.log(data);
      // Only show success if no error was thrown
      Swal.fire(
        "Success",
        "Your password has been updated successfully!",
        "success",
      );

      // Clear fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      Swal.fire("Error", err?.message || "Failed to update password", "error");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <p className="text-gray-500">Account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-lg font-medium">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info label="User ID" value={user?.id} />
          <Info label="Role" value={user?.role} />
          <Info label="Status" value={user?.status} />
          <Info
            label="Email Verified"
            value={user?.emailVerified ? "Yes" : "No"}
          />
          <Info
            label="Joined"
            value={new Date(user?.createdAt).toLocaleDateString()}
          />
          <Info
            label="Last Updated"
            value={new Date(user?.updatedAt).toLocaleDateString()}
          />
        </div>

        {/* Password Update */}
        <div className="pt-4 border-t space-y-4">
          <h3 className="text-md font-medium">Change Password</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="border rounded-md p-2 w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="border rounded-md p-2 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="border rounded-md p-2 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handlePasswordUpdate}
              disabled={updatingPassword}
              className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
            >
              {updatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={() => authClient.signOut()}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="bg-gray-50 rounded-md p-3">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="font-medium break-all">{value ?? "—"}</p>
    </div>
  );
}
