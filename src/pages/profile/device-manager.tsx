import DeviceManagerComponent from '../../components/security/DeviceManager';

export default function DeviceManagerPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cihaz İdarəetməsi</h1>
        <p className="text-gray-600 mb-6">
          Hesabınıza daxil olmuş bütün cihazları idarə edin və şübhəli girişləri təhlükəsiz şəkildə çıxarın.
        </p>
        
        <DeviceManagerComponent />
      </div>
    </div>
  );
} 