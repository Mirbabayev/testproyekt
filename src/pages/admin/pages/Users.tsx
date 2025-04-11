import React, { useState } from 'react';
import { Filter, Shield, Users as UsersIcon, User, Mail, Phone, Calendar, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserRole } from '../../../types/user';

const Users: React.FC = () => {
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  const mockUsers = [
    {
      id: '1',
      name: 'Anar Məmmədov',
      email: 'anar@example.com',
      role: UserRole.ADMIN,
      registered: '12.01.2024',
      orders: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Nigar Əliyeva',
      email: 'nigar@example.com',
      role: UserRole.USER,
      registered: '15.02.2024',
      orders: 3,
      status: 'active'
    },
    {
      id: '3',
      name: 'Orxan Həsənli',
      email: 'orxan@example.com',
      role: UserRole.SELLER,
      registered: '20.03.2024',
      orders: 0,
      status: 'active'
    },
    {
      id: '4',
      name: 'Lalə Quliyeva',
      email: 'lale@example.com',
      role: UserRole.USER,
      registered: '05.04.2024',
      orders: 2,
      status: 'active'
    },
    {
      id: '5',
      name: 'Elçin Nəsirov',
      email: 'elcin@example.com',
      role: UserRole.USER,
      registered: '10.04.2024',
      orders: 1,
      status: 'inactive'
    },
    { id: '6', name: 'Günay İsmayılova', email: 'gunay@example.com', role: UserRole.USER, registered: '11.04.2024', orders: 7, status: 'active' },
    { id: '7', name: 'Rəşad Bağırov', email: 'rashad@example.com', role: UserRole.USER, registered: '12.04.2024', orders: 0, status: 'active' },
    { id: '8', name: 'Fidan Ağayeva', email: 'fidan@example.com', role: UserRole.SELLER, registered: '14.04.2024', orders: 10, status: 'active' },
    { id: '9', name: 'Tural Abbasov', email: 'tural@example.com', role: UserRole.USER, registered: '16.04.2024', orders: 4, status: 'inactive' },
    { id: '10', name: 'Aygün Rəhimova', email: 'aygun@example.com', role: UserRole.USER, registered: '18.04.2024', orders: 2, status: 'active' },
    { id: '11', name: 'Kənan Əhmədov', email: 'kanan@example.com', role: UserRole.USER, registered: '20.04.2024', orders: 1, status: 'active' },
    { id: '12', name: 'Sevinc Məmmədli', email: 'sevinc@example.com', role: UserRole.USER, registered: '22.04.2024', orders: 3, status: 'active' },
  ];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            <Shield size={12} className="mr-1" /> Admin
          </span>
        );
      case UserRole.SELLER:
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            <UsersIcon size={12} className="mr-1" /> Satıcı
          </span>
        );
      case UserRole.USER:
        return (
          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            <User size={12} className="mr-1" /> İstifadəçi
          </span>
        );
      default:
        return null;
    }
  };

  const currentUsers = mockUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  const totalPages = Math.ceil(mockUsers.length / usersPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="px-3 py-2 flex items-center text-sm gap-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center">
            <Filter size={16} />
            Filtrlə
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İstifadəçi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-poçt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qeydiyyat</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
                      {user.name.split(' ').map(n=>n[0]).join('').toUpperCase() || 'U'}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail size={14} className="mr-1 text-gray-400 flex-shrink-0" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1 text-gray-400 flex-shrink-0" />
                    {user.registered}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1" title="Redaktə et">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1" title={user.status === 'active' ? 'Deaktiv et' : 'Aktiv et'}>
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
             {mockUsers.length} istifadəçidən {(page - 1) * usersPerPage + 1}- {Math.min(page * usersPerPage, mockUsers.length)} arası göstərilir
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 border rounded-md text-sm ${page === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            <span className="px-3 py-1 text-sm text-gray-700">Səhifə {page} / {totalPages}</span>
            
            <button 
              className={`px-3 py-1 border rounded-md text-sm ${page === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 