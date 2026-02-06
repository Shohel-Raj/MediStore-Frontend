import SellerOverViewClient from "@/components/seller/SellerOverViewClient";
import { getSellerDashboardData } from "@/services/seller/getSellerDashboardData";
import React from "react";


const SellerDashboardPage = async () => {
  const overview = await getSellerDashboardData();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <SellerOverViewClient overview={overview} />
    </div>
  );
};

export default SellerDashboardPage;
