import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  admin,
  user,
  seller,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
  seller: React.ReactNode;
}) {
  const userInfo = {
    name: "MediStore User",
    email: "user@medistore.com",
    image: "",
    role: "user" as "user"| "admin"  | "seller" ,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />

      <SidebarInset>
        <DashboardTopbar user={userInfo} />

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === "admin" ? admin : userInfo.role === "seller" ? seller : user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
