import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { Edit, Save, X, User, Mail, Phone, MapPin, LogOut, AlertTriangle, Trash2 } from 'lucide-react';
import { signOut, deleteAccount } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { t } = useTranslation();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'İstifadəçi',
    phone: '+994 50 123 45 67',
    address: 'Bakı, Azərbaycan',
  });
  const [savedData, setSavedData] = useState({ ...formData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setSavedData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...savedData });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      await refreshUser(); // Session yeniləmək
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      
      // Hesabı silirik
      await deleteAccount();
      
      // Bütün localStorageni təmizləyirik (auth ilə əlaqəli)
      localStorage.removeItem('e-parfum-current-user');
      localStorage.removeItem('e-parfum-users');
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('token');
      
      // Session yeniləyirik
      await refreshUser();
      
      // Ana səhifəyə yönləndiririk
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profil</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm text-primary hover:underline"
          >
            <Edit className="w-4 h-4 mr-1" />
            Redaktə et
          </button>
        )}
        {isEditing && (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center text-sm text-green-600 hover:underline"
            >
              <Save className="w-4 h-4 mr-1" />
              Yadda saxla
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center text-sm text-red-600 hover:underline"
            >
              <X className="w-4 h-4 mr-1" />
              Ləğv et
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-16 w-16 text-gray-400" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Hesab məlumatları</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <User className="w-4 h-4 mr-2" />
                  Ad Soyad
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="font-medium">{savedData.fullName}</p>
                )}
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  E-poçt
                </div>
                <p className="font-medium">{user?.email || 'E-poçt yoxdur'}</p>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Telefon
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="font-medium">{savedData.phone}</p>
                )}
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ünvan
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="font-medium">{savedData.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Hesab parametrləri</h2>
        
        <div className="border-t pt-4 mt-4 space-y-4">
          <button
            onClick={handleSignOut}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Hesabdan çıx
          </button>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Hesabı sil
          </button>
        </div>
      </div>

      {/* Hesab silmə modal pəncərəsi */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4 text-red-600">
              <AlertTriangle className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">Hesabı silmək</h3>
            </div>
            
            <p className="mb-6">
              Hesabınızı silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz və bütün məlumatlarınız silinəcək.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Ləğv et
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Silinir...
                  </>
                ) : (
                  'Hesabı sil'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}