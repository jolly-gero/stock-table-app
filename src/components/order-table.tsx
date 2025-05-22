import { useState } from "react";
import { Order } from "@/types/order";
import dayjs from "dayjs";
import React from "react";

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  return (
    <div className="overflow-x-auto">
      <table className="bg-white text-black w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border w-8"></th>
            <th className="px-2 py-1 border">Account</th>
            <th className="px-2 py-1 border">Operation</th>
            <th className="px-2 py-1 border">Symbol</th>
            <th className="px-2 py-1 border">Status</th>
            <th className="px-2 py-1 border hidden md:table-cell">
              Description
            </th>
            <th className="px-2 py-1 border hidden md:table-cell">Quantity</th>
            <th className="px-2 py-1 border hidden md:table-cell">
              Filled Qty
            </th>
            <th className="px-2 py-1 border hidden md:table-cell">Price</th>
            <th className="px-2 py-1 border hidden md:table-cell">Date</th>
            <th className="px-2 py-1 border hidden md:table-cell">
              Expiration
            </th>
            <th className="px-2 py-1 border hidden md:table-cell">No Ref</th>
            <th className="px-2 py-1 border hidden md:table-cell">
              External Ref
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={13} className="text-center p-4 text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <React.Fragment key={index}>
                <tr key={`main-${index}`} className="hover:bg-gray-50">
                  <td className="border text-center">
                    <button
                      onClick={() => toggleRow(index)}
                      className="text-gray-500 hover:text-black"
                    >
                      {expandedRow === index ? "▲" : "▼"}
                    </button>
                  </td>
                  <td className="border px-2 py-1">{order.account}</td>
                  <td className="border px-2 py-1">{order.operation}</td>
                  <td className="border px-2 py-1">{order.symbol}</td>
                  <td className="border px-2 py-1">{order.status}</td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {order.description}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {order.quantity}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {order.filledQty}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {order.price.toFixed(2)}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {dayjs(order.date).format("YYYY/MM/DD HH:mm")}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {dayjs(order.expiration).format("YYYY/MM/DD HH:mm")}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {order.noRef}
                  </td>
                  <td className="border px-2 py-1 hidden md:table-cell">
                    {order.externalRef}
                  </td>
                </tr>

                {/* Expanded Row (Detail) */}
                {expandedRow === index && (
                  <tr key={`expand-${index}`} className="bg-blue-50">
                    <td
                      colSpan={13}
                      className="px-4 py-3 text-sm text-gray-700"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                          <strong>Net Amount:</strong> {order.detail.netAmount}
                        </div>
                        <div>
                          <strong>Currency:</strong> {order.detail.currencyUnit}
                        </div>
                        <div>
                          <strong>Exchange Rate:</strong>{" "}
                          {order.detail.exchangeRate}
                        </div>
                        <div>
                          <strong>Reference #:</strong>{" "}
                          {order.detail.referenceNumber}
                        </div>
                        <div>
                          <strong>Detail Date:</strong>{" "}
                          {dayjs(order.date).format("YYYY/MM/DD HH:mm")}
                        </div>
                        <div>
                          <strong>Telephone:</strong> {order.detail.telephone}
                        </div>
                        <div>
                          <strong>User ID:</strong> {order.detail.userId}
                        </div>
                      </div>

                      <div className="bg-gray-100 p-3 rounded border border-gray-400 mt-6">
                        <p className="font-semibold text-gray-700 mb-2">
                          Warning(s)
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                          <li>
                            To trade this security in this account, a currency
                            conversion will be made at the current rate.
                          </li>
                          <li>A similar order has already been submitted.</li>
                          <li>
                            Your transaction will be processed the following
                            business day.
                          </li>
                          <li>
                            It is not possible to calculate the buying power of
                            this order.
                          </li>
                          <li>
                            A cancellation will not be possible during business
                            hours on market orders. You can call a
                            representative for more information.
                          </li>
                          <li>
                            For the above-mentioned reason(s), your order will
                            be processed by one of our representatives.
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
