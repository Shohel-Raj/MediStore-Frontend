import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  Megaphone,
  PlusIcon,
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
      { title: "Add Product", url: "/admin-dashboard/create-product", icon: PlusIcon },
      { title: "My Product", url: "/admin-dashboard/my-products", icon: Package },
      // { title: "Advertisements", url: "/admin-dashboard/ads", icon: Megaphone },
    ],
  },
];
