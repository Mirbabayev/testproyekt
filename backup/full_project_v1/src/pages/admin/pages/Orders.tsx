import React from 'react';
import { Filter, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const Orders: React.FC = () => {
  const mockOrders = [
    {
      id: '1',
      customer: 'Anar Məmmədov',
      email: 'anar@example.com',
      date: '12.05.2024',
      status: 'completed',
      total: 350.00,
      items: 2
    },
    {
      id: '2',
      customer: 'Nigar Əliyeva',
      email: 'nigar@example.com',
      date: '11.05.2024',
      status: 'processing',
      total: 640.00,
      items: 3
    },
    {
      id: '3',
      customer: 'Orxan Həsənli',
      email: 'orxan@example.com',
      date: '10.05.2024',
      status: 'pending',
      total: 280.00,
      items: 1
    },
    {
      id: '4',
      customer: 'Lalə Quliyeva',
      email: 'lale@example.com',
      date: '09.05.2024',
      status: 'completed',
      total: 520.00,
      items: 2
    },
    {
      id: '5',
      customer: 'Elçin Nəsirov',
      email: 'elcin@example.com',
      date: '08.05.2024',
      status: 'cancelled',
      total: 290.00,
      items: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" /> Tamamlanıb
          </span>
        );
      case 'processing':
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" /> Hazırlanır
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            <AlertTriangle size={12} className="mr-1" /> Gözləmədə
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" /> Ləğv edilib
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sifarişlər</h2>
        <div className="flex gap-2">
          <button className="px-3 py-2 flex items-center text-sm gap-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            Filtrlə
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sifariş №
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Müştəri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Məbləğ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Məhsullar
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{order.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {order.total.toFixed(2)} ₼
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {order.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-900">Bax</button>
                    <button className="text-red-600 hover:text-red-900">Ləğv et</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          5 sifarişdən 1-5 arası göstərilir
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md text-sm text-gray-600 bg-white disabled:opacity-50">
            Əvvəlki
          </button>
          <button className="px-3 py-1 border rounded-md text-sm text-gray-600 bg-white disabled:opacity-50">
            Sonrakı
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders; 