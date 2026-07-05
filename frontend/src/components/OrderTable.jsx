import React from 'react';
import { formatCurrency } from '../utils/formatters';

const OrderTable = ({ orders, onRowDoubleClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-300 text-sm">
                        <th className="border border-gray-400 p-2 text-left">▼ Invoice No</th>
                        <th className="border border-gray-400 p-2 text-left">▼ Customer</th>
                        <th className="border border-gray-400 p-2 text-left">▼ Date</th>
                        <th className="border border-gray-400 p-2 text-right">▼ Total Excl</th>
                        <th className="border border-gray-400 p-2 text-right">▼ Total Tax</th>
                        <th className="border border-gray-400 p-2 text-right">▼ Total Incl</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr 
                            key={order.id} 
                            onDoubleClick={() => onRowDoubleClick(order)} 
                            className="cursor-pointer hover:bg-gray-50 text-sm"
                        >
                            <td className="border border-gray-400 p-2">{order.invoiceNo}</td>
                            <td className="border border-gray-400 p-2">{order.customerName}</td>
                            <td className="border border-gray-400 p-2">{new Date(order.invoiceDate).toLocaleDateString()}</td>
                            <td className="border border-gray-400 p-2 text-right">{formatCurrency(order.totalExcl)}</td>
                            <td className="border border-gray-400 p-2 text-right">{formatCurrency(order.totalTax)}</td>
                            <td className="border border-gray-400 p-2 text-right">{formatCurrency(order.totalIncl)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
