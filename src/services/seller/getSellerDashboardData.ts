import { sellerDashboardService, DashboardOverview } from "./sellerDashboardService";

export const getSellerDashboardData = async (): Promise<DashboardOverview | null> => {
  const { data, error } = await sellerDashboardService.getOverview();
  if (error) {
    console.error("Dashboard fetch error:", error.message);
    return null;
  }
  return data;
};
