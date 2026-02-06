"use client";

import { DashboardOverview } from "@/services/seller/sellerDashboardService";
import React from "react";

interface Props {
  overview: DashboardOverview | null;
}

const SellerOverViewClient: React.FC<Props> = ({ overview }) => {
  if (!overview) return <div className="text-gray-500 dark:text-gray-400">No data available</div>;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-sm dark:shadow-md">
          <h3 className="font-semibold text-gray-700 dark:text-yellow-300">Total Products</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-yellow-100">{overview.totalProducts}</p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow-sm dark:shadow-md">
          <h3 className="font-semibold text-gray-700 dark:text-green-300">In Stock</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-green-100">{overview.inStockProducts}</p>
        </div>
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg shadow-sm dark:shadow-md">
          <h3 className="font-semibold text-gray-700 dark:text-red-300">Out of Stock</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-red-100">{overview.outOfStockProducts}</p>
        </div>
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-sm dark:shadow-md">
          <h3 className="font-semibold text-gray-700 dark:text-blue-300">Discounted Products</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-blue-100">{overview.discountedProducts}</p>
        </div>
      </div>

      {/* Recent Products */}
      {overview.recentProducts.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Recent Products</h3>
          <ul className="space-y-2">
            {overview.recentProducts.map((p) => (
              <li
                key={p.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm dark:shadow-md flex justify-between items-center"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">{p.name}</span>
                <div className="text-gray-700 dark:text-gray-300">
                  ${p.price} | Stock: {p.stock}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No recent products</p>
      )}
    </div>
  );
};

export default SellerOverViewClient;
