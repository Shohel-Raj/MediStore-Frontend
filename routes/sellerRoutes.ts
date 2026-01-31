import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BadgeDollarSign,
} from "lucide-react";
import { Route } from "../types/routes.type";

export const sellerRoutes: Route[] = [
  {
    title: "Seller",
    items: [
      { title: "Overview", url: "/seller-dashboard", icon: LayoutDashboard },
      { title: "My Products", url: "/seller-dashboard/products", icon: Package },
      { title: "Orders", url: "/seller-dashboard/orders", icon: ClipboardList },
      { title: "Payments", url: "seller-dashboard/payments", icon: BadgeDollarSign },
    ],
  },
];
