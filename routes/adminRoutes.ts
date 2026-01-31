import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  Megaphone,
} from "lucide-react";
import { Route } from "../types/routes.type";

export const adminRoutes: Route[] = [
  {
    title: "Admin",
    items: [
      { title: "Overview", url: "/admin-dashboard", icon: LayoutDashboard },
      { title: "Manage Users", url: "/admin-dashboard/users", icon: Users },
      { title: "Manage Products", url: "/admin-dashboard/products", icon: Package },
      { title: "Manage Orders", url: "/admin-dashboard/orders", icon: ClipboardList },
      { title: "Advertisements", url: "/admin-dashboard/ads", icon: Megaphone },
    ],
  },
];
