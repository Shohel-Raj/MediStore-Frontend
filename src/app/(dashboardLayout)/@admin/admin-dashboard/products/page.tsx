"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminClientService } from "@/services/admin/admin.service.client";

interface Seller {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  status: "ACTIVE" | "INACTIVE";
  stock: number;
  lowStockThreshold: number;
  manufacturer: string;
  packSize: string;
  strength: string;
  dosageForm: string;
  description: string;
  image: string;
  images: string[];
  seller: Seller;
}

const PAGE_LIMIT = 10; // Number of products per page

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products with pagination
  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products?page=${page}&limit=${PAGE_LIMIT}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setProducts(data.data || []);
      setTotalPages(data.pagination.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  // Update product status
  const handleStatusChange = async (product: Product) => {
    const newStatus = product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const confirm = await Swal.fire({
      title: "Change product status?",
      text: `Set status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (!confirm.isConfirmed) return;

    try {
      const result = await adminClientService.updateProductStatus(product.id, newStatus);
      if (result.success) {
        Swal.fire("Updated", "Product status updated", "success");
        fetchProducts(currentPage);
      } else {
        Swal.fire("Error", result.message || "Failed to update status", "error");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to update status", "error");
    }
  };

  // View product details
  const handleViewDetails = (product: Product) => {
    const imagesHtml = product.images
      .map((img) => `<img src="${img}" class="max-w-25 mr-2 mb-2 rounded"/>`)
      .join("");

    Swal.fire({
      title: `${product.name} - Details`,
      html: `
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Discount Price:</strong> $${product.discountPrice}</p>
        <p><strong>Status:</strong> ${product.status}</p>
        <p><strong>Stock:</strong> ${product.stock} (Low Stock Threshold: ${product.lowStockThreshold})</p>
        <p><strong>Manufacturer:</strong> ${product.manufacturer}</p>
        <p><strong>Pack Size:</strong> ${product.packSize}</p>
        <p><strong>Strength:</strong> ${product.strength}</p>
        <p><strong>Dosage Form:</strong> ${product.dosageForm}</p>
        <p><strong>Seller:</strong> ${product.seller.name} (${product.seller.email})</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <div class="flex flex-wrap mt-2">${imagesHtml}</div>
      `,
      width: "600px",
      icon: "info",
    });
  };

  const SkeletonRow = () => (
    <TableRow>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <TableCell key={idx}>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          </TableCell>
        ))}
    </TableRow>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, idx) => <SkeletonRow key={idx} />)
              : products.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )
              : products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Select
                        value={product.status}
                        onValueChange={() => handleStatusChange(product)}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.seller.name}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button size="sm" onClick={() => handleViewDetails(product)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              size="sm"
              disabled={currentPage === 1}
              onClick={() => fetchProducts(currentPage - 1)}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => fetchProducts(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
