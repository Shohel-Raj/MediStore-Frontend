import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BadgeDollarSign,
  PlusCircle,
} from "lucide-react";
import { Route } from "../types/routes.type";

export const sellerRoutes: Route[] = [
  {
    title: "Seller",
    items: [
      { title: "Overview", url: "/seller-dashboard", icon: LayoutDashboard },
      { title: "Add Product", url: "/seller-dashboard/create-product", icon: PlusCircle },
      { title: "My Products", url: "/seller-dashboard/my-products", icon: Package },
      { title: "Orders", url: "/seller-dashboard/orders", icon: ClipboardList },
      { title: "Payments", url: "seller-dashboard/payments", icon: BadgeDollarSign },
    ],
  },
];
