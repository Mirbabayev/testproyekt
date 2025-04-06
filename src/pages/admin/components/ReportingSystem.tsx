import { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Download, Filter, RefreshCw, 
  ChevronDown, Table, BarChart, PieChart, List, 
  FileSpreadsheet, FileBar, FilePieChart, Printer
} from 'lucide-react';

// Mühüm hesabat növləri
enum ReportType {
  SALES = 'sales',
  INVENTORY = 'inventory',
  CUSTOMERS = 'customers',
  REVENUE = 'revenue',
  ORDERS = 'orders',
}

// Demo hesabat növləri
const reportTypes = [
  { id: ReportType.SALES, name: 'Satış hesabatı', icon: <BarChart className="h-5 w-5 text-blue-500" /> },
  { id: ReportType.INVENTORY, name: 'İnventar hesabatı', icon: <Table className="h-5 w-5 text-green-500" /> },
  { id: ReportType.CUSTOMERS, name: 'Müştəri hesabatı', icon: <PieChart className="h-5 w-5 text-purple-500" /> },
  { id: ReportType.REVENUE, name: 'Gəlir hesabatı', icon: <BarChart className="h-5 w-5 text-amber-500" /> },
  { id: ReportType.ORDERS, name: 'Sifariş hesabatı', icon: <List className="h-5 w-5 text-red-500" /> },
];

// Hesabat format növləri
enum ReportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
  PDF = 'pdf',
}

// Format seçenekleri
const reportFormats = [
  { id: ReportFormat.CSV, name: 'CSV', icon: <FileText className="h-5 w-5" /> },
  { id: ReportFormat.EXCEL, name: 'Excel', icon: <FileSpreadsheet className="h-5 w-5" /> },
  { id: ReportFormat.PDF, name: 'PDF', icon: <FileBar className="h-5 w-5" /> },
];

// Zaman aralığı seçenekleri
const timeRanges = [
  { id: 'today', name: 'Bu gün' },
  { id: 'yesterday', name: 'Dünən' },
  { id: 'week', name: 'Bu həftə' },
  { id: 'month', name: 'Bu ay' },
  { id: 'quarter', name: 'Bu rüb' },
  { id: 'year', name: 'Bu il' },
  { id: 'custom', name: 'Xüsusi aralıq' },
];

// Demo özət məlumatları
const demoReportSummary = {
  [ReportType.SALES]: {
    title: 'Satış Hesabatı',
    description: 'Məhsul və zaman üzrə satış statistikaları',
    metrics: [
      { name: 'Ümumi satış', value: '294 məhsul' },
      { name: 'Orta aylıq satış', value: '98 məhsul' },
      { name: 'Ən çox satılan məhsul', value: 'Creed Aventus (32)' },
    ],
    columnHeaders: ['Məhsul', 'Brend', 'Kateqoriya', 'Satış sayı', 'Toplam məbləğ'],
  },
  [ReportType.INVENTORY]: {
    title: 'İnventar Hesabatı',
    description: 'Stok vəziyyəti və məhsul mövcudluğu',
    metrics: [
      { name: 'Ümumi məhsul sayı', value: '125 məhsul' },
      { name: 'Stokda bitmək üzrə', value: '8 məhsul' },
      { name: 'Ən çox stokda olan', value: 'Dior Sauvage (45)' },
    ],
    columnHeaders: ['Məhsul', 'Brend', 'Kateqoriya', 'Stok sayı', 'Status'],
  },
  [ReportType.CUSTOMERS]: {
    title: 'Müştəri Hesabatı',
    description: 'Müştəri demoqrafikası və alış-veriş davranışları',
    metrics: [
      { name: 'Ümumi müştəri sayı', value: '573 müştəri' },
      { name: 'Yeni müştərilər (bu ay)', value: '42 müştəri' },
      { name: 'Ən aktiv müştəri', value: 'Nicat Həsənli (12 sifariş)' },
    ],
    columnHeaders: ['Müştəri', 'Tarix', 'Sifarişlər', 'Toplam məbləğ', 'Son aktivlik'],
  },
  [ReportType.REVENUE]: {
    title: 'Gəlir Hesabatı',
    description: 'Gəlir, xərclər və mənfəət məlumatları',
    metrics: [
      { name: 'Ümumi gəlir', value: '32,450 ₼' },
      { name: 'Orta aylıq gəlir', value: '10,816 ₼' },
      { name: 'Ən yüksək gəlirli məhsul', value: 'Creed Aventus (6,500 ₼)' },
    ],
    columnHeaders: ['Tarix', 'Gəlir', 'Xərclər', 'Mənfəət', 'Artış'],
  },
  [ReportType.ORDERS]: {
    title: 'Sifariş Hesabatı',
    description: 'Sifariş statistikaları və status məlumatları',
    metrics: [
      { name: 'Ümumi sifariş', value: '294 sifariş' },
      { name: 'Orta sifariş məbləği', value: '110 ₼' },
      { name: 'Tamamlanma nisbəti', value: '94%' },
    ],
    columnHeaders: ['Sifariş #', 'Müştəri', 'Tarix', 'Məbləğ', 'Status'],
  },
};

export default function ReportingSystem() {
  const [selectedReportType, setSelectedReportType] = useState<ReportType>(ReportType.SALES);
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>(ReportFormat.EXCEL);
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedReport, setLastGeneratedReport] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  
  // Demo məlumatları
  const currentReport = demoReportSummary[selectedReportType];
  
  // Xüsusi tarix aralığı göstərilsin mi
  const showCustomDateRange = selectedTimeRange === 'custom';
  
  // Hesabat generasiyası
  const generateReport = async () => {
    setIsGenerating(true);
    
    // Demo gecikdirmə
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Son generasiya etdiyimiz hesabat məlumatlarını saxla
    setLastGeneratedReport({
      type: reportTypes.find(t => t.id === selectedReportType)?.name,
      format: reportFormats.find(f => f.id === selectedFormat)?.name,
      timeRange: selectedTimeRange === 'custom' 
        ? `${startDate} - ${endDate}` 
        : timeRanges.find(t => t.id === selectedTimeRange)?.name,
      timestamp: new Date().toLocaleString('az-AZ'),
    });
    
    setIsGenerating(false);
  };
  
  // Hesabat yüklə
  const downloadReport = () => {
    // Real tətbiqdə backend-dən hesabat yüklənməsini emal edəcək
    alert(`${selectedReportType} hesabatı ${selectedFormat} formatında yüklənir...`);
  };
  
  // Hesabat çap et
  const printReport = () => {
    // Real tətbiqdə çap pəncərəsini açacaq
    alert(`${selectedReportType} hesabatı çap edilir...`);
  };
  
  // Dropdown-ları idarə et
  const toggleDropdown = (dropdown: string) => {
    if (showDropdown === dropdown) {
      setShowDropdown(null);
    } else {
      setShowDropdown(dropdown);
    }
  };
  
  // Klik hadisələrini izlə və açıq dropdown-ları bağla
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && !(event.target as HTMLElement).closest('.dropdown-container')) {
        setShowDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);
  
  return (
    <div className="space-y-6">
      {/* Başlıq */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hesabat Sistemi</h1>
          <p className="text-gray-500 text-sm mt-1">Satışlar, məhsullar və daha çox haqqında ətraflı hesabatlar yaradın</p>
        </div>
      </div>
      
      {/* Filtr paneli */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-lg font-medium flex items-center mb-4 md:mb-0">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Hesabat parametrləri
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => generateReport()}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isGenerating ? (
                <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
              ) : (
                <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
              )}
              Hesabat yarat
            </button>
            
            <button 
              onClick={downloadReport}
              disabled={isGenerating || !lastGeneratedReport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              <Download className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
              Yüklə
            </button>
            
            <button 
              onClick={printReport}
              disabled={isGenerating || !lastGeneratedReport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              <Printer className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
              Çap et
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Hesabat növü seçimi */}
          <div className="dropdown-container">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hesabat növü</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('reportType')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <div className="flex items-center">
                  {reportTypes.find(t => t.id === selectedReportType)?.icon}
                  <span className="ml-2">
                    {reportTypes.find(t => t.id === selectedReportType)?.name}
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              
              {showDropdown === 'reportType' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedReportType(type.id as ReportType);
                        setShowDropdown(null);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        selectedReportType === type.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      {type.icon}
                      <span className="ml-2">{type.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Format seçimi */}
          <div className="dropdown-container">
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('format')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <div className="flex items-center">
                  {reportFormats.find(f => f.id === selectedFormat)?.icon}
                  <span className="ml-2">
                    {reportFormats.find(f => f.id === selectedFormat)?.name}
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              
              {showDropdown === 'format' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1">
                  {reportFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => {
                        setSelectedFormat(format.id as ReportFormat);
                        setShowDropdown(null);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        selectedFormat === format.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      {format.icon}
                      <span className="ml-2">{format.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Zaman aralığı seçimi */}
          <div className="dropdown-container">
            <label className="block text-sm font-medium text-gray-700 mb-1">Zaman aralığı</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('timeRange')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="ml-2">
                    {timeRanges.find(t => t.id === selectedTimeRange)?.name}
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              
              {showDropdown === 'timeRange' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1">
                  {timeRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setSelectedTimeRange(range.id);
                        setShowDropdown(null);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        selectedTimeRange === range.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <span>{range.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Xüsusi tarix aralığı */}
          {showCustomDateRange && (
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Xüsusi tarix</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Son yaradılmış hesabat haqqında məlumat */}
      {lastGeneratedReport && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800">Son yaradılan hesabat</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hesabat növü: {lastGeneratedReport.type}</li>
                  <li>Format: {lastGeneratedReport.format}</li>
                  <li>Zaman aralığı: {lastGeneratedReport.timeRange}</li>
                  <li>Yaradılma tarixi: {lastGeneratedReport.timestamp}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hesabat önizləməsi */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">{currentReport.title} - Önizləmə</h2>
          <p className="text-sm text-gray-500 mt-1">{currentReport.description}</p>
        </div>
        
        {/* Əsas metrikalar */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentReport.metrics.map((metric, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-sm text-gray-500">{metric.name}</h3>
                <p className="text-xl font-semibold mt-1">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hesabat cədvəli */}
        <div className="px-6 py-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {currentReport.columnHeaders.map((header, index) => (
                  <th 
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Demo məlumatlar göstərmək üçün */}
              <tr className="text-gray-400 italic">
                <td colSpan={currentReport.columnHeaders.length} className="px-6 py-4 text-center">
                  <p>Hesabat yaratmaq üçün parametrləri seçin və "Hesabat yarat" düyməsinə klikləyin</p>
                  {isGenerating && (
                    <div className="mt-2 flex items-center justify-center">
                      <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                      Hesabat yaradılır...
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 