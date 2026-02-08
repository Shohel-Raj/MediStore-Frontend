"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { adminClientService } from "@/services/admin/admin.service.client";
import { OrderStatus } from "../../../../../../types/orderStatus";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
}

interface Order {
  id: string;
  userId: string;
  user: { name: string; email: string };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingFee: number;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

const ORDER_STATUSES: OrderStatus[] = Object.values(OrderStatus);

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 10; 

  // Fetch orders with pagination
  const fetchOrders = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders?page=${page}&limit=${PAGE_LIMIT}`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data)
      setOrders(data.data || []);
      setTotalPages(data.pagination.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, []);

  // Update order status
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const confirm = await Swal.fire({
      title: "Update order status?",
      text: `Change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await adminClientService.updateOrderStatus(orderId, newStatus);
      if (result.success) {
        Swal.fire("Updated", "Order status updated", "success");
        fetchOrders(currentPage);
      } else {
        Swal.fire("Error", result.message || "Failed to update order", "error");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to update order", "error");
    }
  };

  // View order details
  const handleViewDetails = (order: Order) => {
    Swal.fire({
      title: `Order Details`,
      html: `
        <p><strong>User:</strong> ${order.user.name} (${order.user.email})</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Shipping Fee:</strong> $${order.shippingFee}</p>
        <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
        <p><strong>Final Amount:</strong> $${order.finalAmount}</p>
        <hr/>
        <p><strong>Items:</strong></p>
        ${order.items.map(item => `<p>${item.productName} x${item.quantity} - $${item.price}</p>`).join("")}
        <hr/>
        <p><strong>Shipping Address:</strong></p>
        <p>${order.shippingAddress.fullName}</p>
        <p>${order.shippingAddress.phone}</p>
        <p>${order.shippingAddress.addressLine1}</p>
        <p>${order.shippingAddress.addressLine2 || ""}</p>
      `,
      icon: "info",
      width: "600px",
    });
  };

  // Skeleton loader
  const renderSkeleton = () => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell><div className="h-4 w-32 bg-gray-200 rounded" /></TableCell>
          <TableCell><div className="h-4 w-20 bg-gray-200 rounded" /></TableCell>
          <TableCell><div className="h-4 w-24 bg-gray-200 rounded" /></TableCell>
          <TableCell><div className="h-4 w-32 bg-gray-200 rounded" /></TableCell>
          <TableCell className="text-right"><div className="h-4 w-24 bg-gray-200 rounded ml-auto" /></TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              renderSkeleton()
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.user.name} ({order.user.email})</TableCell>
                  <TableCell>${order.finalAmount}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => handleViewDetails(order)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              size="sm"
              disabled={currentPage === 1}
              onClick={() => fetchOrders(currentPage - 1)}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => fetchOrders(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrderManagement;
