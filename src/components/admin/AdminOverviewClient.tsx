"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Store, Package, ShoppingCart, DollarSign } from "lucide-react";

interface OverviewStats {
  totalUsers: number;
  totalCustomers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface Props {
  overview: OverviewStats;
}

// Define type for stat items
interface StatItem {
  title: string;
  key: keyof OverviewStats;
  icon: React.ComponentType<{ className?: string }>;
  isMoney?: boolean;
}

// Stats array
const stats: StatItem[] = [
  { title: "Total Users", key: "totalUsers", icon: Users },
  { title: "Customers", key: "totalCustomers", icon: Users },
  { title: "Sellers", key: "totalSellers", icon: Store },
  { title: "Products", key: "totalProducts", icon: Package },
  { title: "Orders", key: "totalOrders", icon: ShoppingCart },
  { title: "Revenue", key: "totalRevenue", icon: DollarSign, isMoney: true },
];

export default function AdminOverviewClient({ overview }: Props) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of platform activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ title, key, icon: Icon, isMoney }) => (
          <Card key={key} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isMoney
                  ? `৳ ${overview[key].toLocaleString()}`
                  : overview[key].toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
