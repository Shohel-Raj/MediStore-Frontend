import { LayoutDashboard, ShoppingCart } from "lucide-react";
import { Route } from "../types/routes.type";

export const userRoutes: Route[] = [
  {
    title: "User",
    items: [
      { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Orders", url: "/dashboard/orders", icon: ShoppingCart },
      { title: "Cart", url: "/dashboard/cart", icon: ShoppingCart },
    ],
  },
];
