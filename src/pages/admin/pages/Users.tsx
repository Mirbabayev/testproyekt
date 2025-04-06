import React, { useState, useEffect } from 'react';
import { Filter, Shield, Users as UsersIcon, User, Mail, Phone, Calendar, Edit, Trash, ChevronLeft, ChevronRight, X, AlertTriangle, CheckCircle, Save, Search, RefreshCw } from 'lucide-react';
import { UserRole } from '../../../lib/auth';

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // İstifadəçi məlumatları
  const mockUsers = [
    // Data bütün məlumatları burada
  ];

  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [showFilters, setShowFilters] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [deleteUser, setDeleteUser] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Filtr Modal Pəncərəsi
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    role: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Yeni applyFilters funksiyası
  const applyFilters = () => {
    let result = [...mockUsers];
    
    // Rol filtrləmə
    if (filterOptions.role) {
      result = result.filter(user => user.role === filterOptions.role);
    }
    
    // Status filtrləmə
    if (filterOptions.status) {
      result = result.filter(user => user.status === filterOptions.status);
    }
    
    // Tarix filtrləmə - başlanğıc
    if (filterOptions.dateFrom) {
      const fromDate = new Date(filterOptions.dateFrom);
      result = result.filter(user => {
        const userDate = new Date(user.registered);
        return userDate >= fromDate;
      });
    }
    
    // Tarix filtrləmə - son
    if (filterOptions.dateTo) {
      const toDate = new Date(filterOptions.dateTo);
      toDate.setHours(23, 59, 59, 999); // Günün sonuna qədər
      result = result.filter(user => {
        const userDate = new Date(user.registered);
        return userDate <= toDate;
      });
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Filtr tətbiq olunanda birinci səhifəyə qayıt
  };
  
  // Filtrləri təmizləmə
  const clearFilters = () => {
    setFilterOptions({
      role: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
  };
  
  // İstifadəçi siyahısını filtrlərdən sonra yeniləmək üçün
  useEffect(() => {
    applyFilters();
  }, [mockUsers]);

  const handleEditClick = (user: any) => {
    setEditUser(user);
    setEditFormData({ ...user });
  };

  const handleDeleteClick = (user: any) => {
    setDeleteUser(user);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setDeleteUser(null);
    setEditFormData({});
    setIsProcessing(false);
    setIsSuccess(false);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulyasiya edək ki, API-yə sorğu göndəririk
    setTimeout(() => {
      // Uğurlu oldu
      setIsProcessing(false);
      setIsSuccess(true);
      
      // 2 saniyə sonra modalı bağla
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1000);
  };

  const handleDeleteSubmit = () => {
    setIsProcessing(true);
    
    // Simulyasiya edək ki, API-yə sorğu göndəririk
    setTimeout(() => {
      // Uğurlu oldu
      setIsProcessing(false);
      setIsSuccess(true);
      
      // 2 saniyə sonra modalı bağla
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1000);
  };

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-xl font-semibold text-gray-800">
          İstifadəçilər ({filteredUsers.length})
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            className="px-3 py-2 flex items-center text-sm gap-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter size={16} />
            Filtrlə
          </button>
        </div>
      </div>

      {/* Filtr Modal Pəncərəsi */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto translate-y-0 animate-fadeIn">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">İstifadəçiləri Filtrlə</h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="filterRole" className="block text-sm font-medium text-gray-700 mb-1">
                      Rol
                    </label>
                    <select
                      id="filterRole"
                      value={filterOptions.role || ''}
                      onChange={(e) => handleFilterChange('role', e.target.value)}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Bütün Rollar</option>
                      <option value={UserRole.USER}>İstifadəçi</option>
                      <option value={UserRole.SELLER}>Satıcı</option>
                      <option value={UserRole.ADMIN}>Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="filterStatus"
                      value={filterOptions.status || ''}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Bütün Statuslar</option>
                      <option value="active">Aktiv</option>
                      <option value="inactive">Deaktiv</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Qeydiyyat Tarixi
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="filterDateFrom" className="block text-xs text-gray-500 mb-1">
                          Başlanğıc
                        </label>
                        <input
                          type="date"
                          id="filterDateFrom"
                          value={filterOptions.dateFrom || ''}
                          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="filterDateTo" className="block text-xs text-gray-500 mb-1">
                          Son
                        </label>
                        <input
                          type="date"
                          id="filterDateTo"
                          value={filterOptions.dateTo || ''}
                          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                  >
                    <RefreshCw className="h-4 w-4 inline-block mr-1" />
                    Sıfırla
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      applyFilters();
                      setIsFilterModalOpen(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none"
                  >
                    <Filter className="h-4 w-4 inline-block mr-1" />
                    Tətbiq Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
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
                      <button 
                        className="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-colors" 
                        title="Redaktə et"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-colors" 
                        title={user.status === 'active' ? 'Deaktiv et' : 'Aktiv et'}
                        onClick={() => handleDeleteClick(user)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  Bu filtrlərə uyğun istifadəçi tapılmadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
             {filteredUsers.length} istifadəçidən {(currentPage - 1) * usersPerPage + 1}- {Math.min(currentPage * usersPerPage, filteredUsers.length)} arası göstərilir
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 border rounded-md text-sm ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            <span className="px-3 py-1 text-sm text-gray-700">Səhifə {currentPage} / {totalPages}</span>
            
            <button 
              className={`px-3 py-1 border rounded-md text-sm ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Redaktə Modal Pəncərəsi */}
      {editUser && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg max-w-2xl w-full mx-auto max-h-[90vh] flex flex-col translate-y-0 animate-fadeIn">
              <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                <h3 className="text-lg font-medium">İstifadəçi məlumatlarını redaktə et</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto">
                {isSuccess ? (
                  <div className="p-4">
                    <div className="bg-green-50 p-4 rounded-md text-green-800 flex items-center">
                      <CheckCircle className="mr-2" size={20} />
                      <span>İstifadəçi məlumatları uğurla yeniləndi!</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEditSubmit}>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          {editUser.name.split(' ').map(n=>n[0]).join('').toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{editUser.name}</h4>
                          <p className="text-sm text-gray-500">ID: {editUser.id}</p>
                        </div>
                      </div>
                      
                      <div className="mb-0">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Ad Soyad
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editFormData.name || ''}
                          onChange={handleEditFormChange}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="mb-0">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-poçt
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editFormData.email || ''}
                          onChange={handleEditFormChange}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="mb-0">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                          Rol
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={editFormData.role || ''}
                          onChange={handleEditFormChange}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value={UserRole.USER}>İstifadəçi</option>
                          <option value={UserRole.SELLER}>Satıcı</option>
                          <option value={UserRole.ADMIN}>Admin</option>
                        </select>
                      </div>
                      
                      <div className="mb-0">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={editFormData.status || ''}
                          onChange={handleEditFormChange}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="active">Aktiv</option>
                          <option value="inactive">Deaktiv</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 p-4 border-t sticky bottom-0 bg-white">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                        disabled={isProcessing}
                      >
                        Ləğv Et
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none flex items-center"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İcra edilir...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-1" />
                            Yadda Saxla
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sil/Deaktiv et Modal Pəncərəsi */}
      {deleteUser && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto translate-y-0 animate-fadeIn">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">
                  {deleteUser.status === 'active' ? 'İstifadəçini deaktiv et' : 'İstifadəçini aktiv et'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isProcessing}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                {isSuccess ? (
                  <div className="bg-green-50 p-4 rounded-md text-green-800 flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    <span>
                      {deleteUser.status === 'active' 
                        ? 'İstifadəçi uğurla deaktiv edildi!' 
                        : 'İstifadəçi uğurla aktiv edildi!'}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 text-gray-700">
                      <strong>{deleteUser.name}</strong> adlı istifadəçini 
                      {deleteUser.status === 'active' ? ' deaktiv' : ' aktiv'} etmək istədiyinizə əminsiniz?
                    </div>
                    
                    {deleteUser.status === 'active' && (
                      <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mb-4">
                        <AlertTriangle className="inline-block mr-1" size={16} />
                        Diqqət: Deaktiv edilmiş istifadəçi sistemə daxil ola bilməyəcək.
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        disabled={isProcessing}
                      >
                        Ləğv et
                      </button>
                      <button
                        onClick={handleDeleteSubmit}
                        className={`px-4 py-2 text-white rounded-md flex items-center gap-2 ${
                          deleteUser.status === 'active' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İcra edilir...
                          </>
                        ) : (
                          deleteUser.status === 'active' ? 'Deaktiv et' : 'Aktiv et'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 