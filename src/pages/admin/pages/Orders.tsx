import React, { useState, useEffect } from 'react';
import { Filter, CheckCircle, Clock, AlertTriangle, XCircle, Eye, Trash, X, ChevronDown, ChevronUp, Calendar, DollarSign } from 'lucide-react';

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

  // Səhifələndirmə üçün state
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  // Modal pəncərələr üçün state
  const [viewOrder, setViewOrder] = useState<typeof mockOrders[0] | null>(null);
  const [cancelOrder, setCancelOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  // Filtrləmə üçün state
  const [showFilters, setShowFilters] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');

  // Filtrləri tətbiq et
  useEffect(() => {
    let result = [...mockOrders];
    
    // Status filtri
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Tarix filtri
    if (dateFilter) {
      result = result.filter(order => order.date.includes(dateFilter));
    }
    
    // Qiymət filtri - minimum
    if (minAmount && !isNaN(parseFloat(minAmount))) {
      result = result.filter(order => order.total >= parseFloat(minAmount));
    }
    
    // Qiymət filtri - maksimum
    if (maxAmount && !isNaN(parseFloat(maxAmount))) {
      result = result.filter(order => order.total <= parseFloat(maxAmount));
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Filtrləmə nəticəsində səhifəni sıfırla
  }, [statusFilter, dateFilter, minAmount, maxAmount]);

  // Filtrləri sıfırla
  const resetFilters = () => {
    setStatusFilter('all');
    setDateFilter('');
    setMinAmount('');
    setMaxAmount('');
  };

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

  // Sifariş haqqında ətraflı məlumat göstər
  const handleViewOrder = (order: typeof mockOrders[0]) => {
    setViewOrder(order);
  };

  // Sifarişi ləğv etmə
  const handleCancelOrderClick = (order: typeof mockOrders[0]) => {
    setCancelOrder(order);
  };

  // Sifarişi ləğv et
  const confirmCancelOrder = () => {
    if (!cancelOrder) return;
    
    setIsCancelling(true);
    
    // Simulyasiya edək ki, API-ə sorğu göndəririk
    setTimeout(() => {
      // Mockup: Statusu "cancelled" olaraq yeniləyək
      const updatedOrders = mockOrders.map(order => 
        order.id === cancelOrder.id 
          ? { ...order, status: 'cancelled' } 
          : order
      );
      
      // Filterlənmiş sifarişləri də yeniləyək
      setFilteredOrders(filteredOrders.map(order => 
        order.id === cancelOrder.id 
          ? { ...order, status: 'cancelled' } 
          : order
      ));
      
      setIsCancelling(false);
      setCancelSuccess(true);
      
      // 2 saniyə sonra modalı bağlayaq
      setTimeout(() => {
        setCancelOrder(null);
        setCancelSuccess(false);
      }, 2000);
    }, 1000);
  };

  // Modal pəncərələri bağla
  const closeModals = () => {
    setViewOrder(null);
    setCancelOrder(null);
    setCancelSuccess(false);
  };

  // Cari səhifədəki sifarişləri hesabla
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Əvvəlki səhifəyə keç
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // Sonrakı səhifəyə keç
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Sifarişlər ({filteredOrders.length})
        </h2>
        <button 
          className={`px-3 py-2 flex items-center text-sm gap-1 rounded-md transition-colors ${
            showFilters ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          Filtrlə
          {showFilters ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
      </div>

      {/* Filtr paneli */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status filtri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
              >
                <option value="all">Bütün statuslar</option>
                <option value="completed">Tamamlanıb</option>
                <option value="processing">Hazırlanır</option>
                <option value="pending">Gözləmədə</option>
                <option value="cancelled">Ləğv edilib</option>
              </select>
            </div>
            
            {/* Tarix filtri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar size={14} className="mr-1" /> Tarix
              </label>
              <input
                type="text"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="nöqtə ilə ayırın (05.2024)"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
              />
            </div>
            
            {/* Minimum məbləğ filtri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <DollarSign size={14} className="mr-1" /> Min məbləğ (₼)
              </label>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Min məbləğ"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
              />
            </div>
            
            {/* Maksimum məbləğ filtri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <DollarSign size={14} className="mr-1" /> Max məbləğ (₼)
              </label>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Max məbləğ"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
              />
            </div>
          </div>
          
          {/* Filtr düymələri */}
          <div className="flex justify-end mt-4">
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md mr-2 hover:bg-gray-100 transition-colors"
            >
              Sıfırla
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Tətbiq et
            </button>
          </div>
        </div>
      )}

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
            {currentOrders.map((order) => (
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
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-colors" 
                      title="Bax"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleCancelOrderClick(order)}
                      className="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-colors" 
                      title="Ləğv et"
                      disabled={order.status === 'cancelled'}
                      style={{ opacity: order.status === 'cancelled' ? 0.5 : 1, cursor: order.status === 'cancelled' ? 'not-allowed' : 'pointer' }}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredOrders.length === 0 && (
        <div className="py-6 text-center text-gray-500">
          Filtrləmə nəticəsinə uyğun sifariş tapılmadı
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          {filteredOrders.length} sifarişdən {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} arası göstərilir
        </div>
        <div className="flex gap-2">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Əvvəlki
          </button>
          <button 
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Sonrakı
          </button>
        </div>
      </div>

      {/* Sifariş haqqında məlumat modalı */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-auto max-h-[90vh] flex flex-col animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium">Sifariş #{viewOrder.id} haqqında məlumat</h3>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">Müştəri məlumatları</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Ad, Soyad:</div>
                    <div>{viewOrder.customer}</div>
                    <div className="text-gray-500">E-poçt:</div>
                    <div>{viewOrder.email}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Sifariş məlumatları</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Sifariş tarixi:</div>
                    <div>{viewOrder.date}</div>
                    <div className="text-gray-500">Ümumi məbləğ:</div>
                    <div>{viewOrder.total.toFixed(2)} ₼</div>
                    <div className="text-gray-500">Məhsul sayı:</div>
                    <div>{viewOrder.items}</div>
                    <div className="text-gray-500">Status:</div>
                    <div>{getStatusBadge(viewOrder.status)}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">Sifariş olunan məhsullar</h4>
                  <div className="text-sm text-gray-500 italic">
                    (Demo məlumatlar üçün məhsulların detalları göstərilmir)
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t sticky bottom-0 bg-white">
              <div className="flex justify-end">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sifarişi ləğv etmək üçün modal */}
      {cancelOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Sifarişi ləğv et</h3>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isCancelling}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {cancelSuccess ? (
                <div className="bg-green-50 p-4 rounded-md text-green-800 flex items-center">
                  <CheckCircle className="mr-2" size={20} />
                  <span>Sifariş uğurla ləğv edildi!</span>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-gray-700">
                    #{cancelOrder.id} nömrəli <strong>{cancelOrder.customer}</strong> adlı müştərinin sifarişini ləğv etmək istədiyinizə əminsiniz?
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mb-4">
                    <AlertTriangle className="inline-block mr-1" size={16} />
                    Diqqət: Bu əməliyyat geri qaytarıla bilməz.
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeModals}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      disabled={isCancelling}
                    >
                      Ləğv et
                    </button>
                    <button
                      onClick={confirmCancelOrder}
                      className={`px-4 py-2 text-white rounded-md flex items-center gap-2 bg-red-600 hover:bg-red-700`}
                      disabled={isCancelling}
                    >
                      {isCancelling ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          İcra edilir...
                        </>
                      ) : (
                        "Təsdiq et"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders; 