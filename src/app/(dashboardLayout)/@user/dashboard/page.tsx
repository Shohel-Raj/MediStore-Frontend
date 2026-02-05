"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500">
          Here’s an overview of your account
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Role" value={user?.role} />
        <StatCard label="Account Status" value={user?.status} />
        <StatCard
          label="Email Verified"
          value={user?.emailVerified ? "Yes" : "No"}
        />
        <StatCard
          label="Member Since"
          value={new Date(user?.createdAt).toLocaleDateString()}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Profile Summary</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium">{user?.name}</span>
            </p>
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium">{user?.email}</span>
            </p>
            <p>
              <span className="text-gray-500">User ID:</span>{" "}
              <span className="font-medium break-all">{user?.id}</span>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-medium my-1 mb-4">Quick Actions</h2>

          <div className="space-y-3">
            <ActionButton href="profile" label="View Profile" />
            <ActionButton href="orders" label="My Orders" />
            <button
              onClick={() => authClient.signOut()}
              className="w-full text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Components */

function StatCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value ?? "—"}</p>
    </div>
  );
}

function ActionButton({ label,href }: { label: string,href:string }) {
  return (
    <Link href={`/dashboard/${href}`} className="my-1">
     <button className="w-full text-sm px-4 py-2 rounded-md border hover:bg-gray-50 transition">
      {label}
    </button>
    
    </Link>
   
  );
}
