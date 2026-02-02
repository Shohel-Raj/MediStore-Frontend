import { getUserData } from "@/actions/getUserData";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { UserInfo } from "../../../types/sessionUser";
import { UserRole } from "../../../types/role.type";

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

//   const cookieStore= await cookies()

//   console.log(cookieStore.get("better-auth.session_token"))

    
// const res =await fetch("http://localhost:5000/api/auth/get-session",{
//   headers:{
//     Cookie :cookieStore.toString()
//   }
// })
// const cookieUser=await res.json()

const userInfo : UserInfo =await getUserData()
// console.log(" this is from layout ",userData)
// const userData = cookieUser.user;
    // if (!userData) return null;
  // const userInfo = {
  //       name: userData.name ?? "MediStore User",
  //       email: userData.email ?? "user@medistore.com",
  //       image: userData.image ?? null,
  //       role: (userData.role as UserRole) ?? "USER",
  //     };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />

      <SidebarInset>
        <DashboardTopbar user={userInfo} />

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === "ADMIN" ? admin : userInfo.role === "SELLER" ? seller : user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
