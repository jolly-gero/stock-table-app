"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { mockStockData } from "@/lib/mock-data";
import SearchForm from "@/components/search-form";
import OrderTable from "@/components/order-table";

export default function OrdersPage() {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    setFilteredOrders(mockStockData);
  }, []);

  const onlyDate = (input: string) => new Date(input.split("T")[0]);

  const handleSearch = (
    start?: string,
    end?: string,
    period?: string,
    status?: string
  ) => {
    const result = mockStockData.filter((order) => {
      const orderDate = onlyDate(order.date);
      // Check date range
      if (start && orderDate < new Date(start)) return false;
      if (end && orderDate > new Date(end)) return false;

      // Check status match
      if (status && order.status !== status) return false;

      return true;
    });

    console.log("Filtered:", result);
    setFilteredOrders(result);
  };

  const handleReset = () => {
    setFilteredOrders(mockStockData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <p className="text-sm text-gray-400">
        Search results :{" "}
        <span className="font-medium text-white">{filteredOrders.length}</span>
      </p>
      <SearchForm onSearch={handleSearch} onReset={handleReset} />
      <OrderTable orders={filteredOrders} />
    </div>
  );
}
