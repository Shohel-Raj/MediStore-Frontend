import { getUserData } from "@/actions/getUserData";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserInfo } from "../../../types/sessionUser";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  user,
  seller,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
  seller: React.ReactNode;
}) {
  const rawUser = await getUserData();
if (!rawUser) {
    redirect("/");
  }
  // Normalize image to match UserInfo type
  const userInfo: UserInfo = {
    ...rawUser,
    image: rawUser.image ?? undefined,
  };

 const passUserTop={
            ...userInfo,
            image: userInfo.image ?? undefined, // normalize null → undefined
          }
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />

      <SidebarInset>
        <DashboardTopbar
          user={passUserTop} />

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === "ADMIN"
            ? admin
            : userInfo.role === "SELLER"
              ? seller
              : user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
