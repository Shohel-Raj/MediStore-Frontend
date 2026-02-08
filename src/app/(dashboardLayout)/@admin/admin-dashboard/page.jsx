import { adminServerService } from "@/services/admin/admin.service.server";
import AdminOverviewClient from "@/components/admin/AdminOverviewClient";
import MonthlySalesChart from "@/components/admin/MonthlySalesChart";

export default async function AdminDashboardPage() {
  const overviewRes = await adminServerService.getOverviewStats();
  const salesRes = await adminServerService.getMonthlySalesStats(2026);

  console.log(salesRes)


  return (
    <>
    <AdminOverviewClient overview={overviewRes.data} />
    <MonthlySalesChart data={salesRes.data.monthly} />
    </>
    

  );
}
