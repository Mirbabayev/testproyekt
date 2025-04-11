<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { Edit, Save, X, User, Mail, Phone, MapPin, LogOut, AlertTriangle, Trash2, ShoppingBag, Calendar, Clock, Shield, Camera } from 'lucide-react';
import { deleteAccount } from '../../lib/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../../components/layout';

export default function Profile(): JSX.Element {
  const { t } = useTranslation();
  const { user, refreshUser, updateProfile } = useAuth();
=======
import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useTranslation } from 'react-i18next';
import { Edit, Save, X, User, Mail, Phone, MapPin, LogOut, AlertTriangle, Trash2 } from 'lucide-react';
import { signOut, deleteAccount } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { t } = useTranslation();
  const { user, refreshUser } = useAuth();
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'settings'
  const [formData, setFormData] = useState({
    fullName: user?.name || 'İstifadəçi',
    phone: (user as any)?.phone || '+994 50 123 45 67',
    address: (user as any)?.address || 'Bakı, Azərbaycan',
  });
  const [savedData, setSavedData] = useState({ ...formData });

  // User məlumatları dəyişdikdə formu yeniləmək
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || 'İstifadəçi',
        phone: (user as any)?.phone || '+994 50 123 45 67',
        address: (user as any)?.address || 'Bakı, Azərbaycan',
      });
      setSavedData({
        fullName: user.name || 'İstifadəçi',
        phone: (user as any)?.phone || '+994 50 123 45 67',
        address: (user as any)?.address || 'Bakı, Azərbaycan',
      });
    }
  }, [user]);

=======
  const [formData, setFormData] = useState({
    fullName: 'İstifadəçi',
    phone: '+994 50 123 45 67',
    address: 'Bakı, Azərbaycan',
  });
  const [savedData, setSavedData] = useState({ ...formData });

>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

<<<<<<< HEAD
  const handleSave = async () => {
    try {
      await updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address
      });
      setSavedData({ ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
=======
  const handleSave = () => {
    setSavedData({ ...formData });
    setIsEditing(false);
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
  };

  const handleCancel = () => {
    setFormData({ ...savedData });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
<<<<<<< HEAD
=======
      await signOut();
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
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
      
<<<<<<< HEAD
=======
      // Bütün localStorageni təmizləyirik (auth ilə əlaqəli)
      localStorage.removeItem('e-parfum-current-user');
      localStorage.removeItem('e-parfum-users');
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('token');
      
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
      // Session yeniləyirik
      await refreshUser();
      
      // Ana səhifəyə yönləndiririk
<<<<<<< HEAD
      navigate('/');
=======
      window.location.href = '/';
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsDeleting(false);
    }
  };

<<<<<<< HEAD
  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-lg text-gray-600">Zəhmət olmasa hesabınıza daxil olun</p>
              <button
                onClick={() => navigate('/auth/login')}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
              >
                Daxil ol
=======
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
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
              </button>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Profil header */}
        <div className="relative mb-8">
          {/* Cover photo */}
          <div className="h-48 bg-gradient-to-r from-primary/40 via-primary/25 to-primary/10 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            
            <div className="absolute right-4 top-4">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary font-medium hover:bg-white transition-colors shadow-sm"
                >
                  <Edit className="w-4 h-4" />
                  Redaktə et
                </button>
              )}
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-green-600 font-medium hover:bg-white transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Yadda saxla
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-red-600 font-medium hover:bg-white transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4" />
                    Ləğv et
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Profile picture */}
          <div className="absolute left-8 bottom-12 sm:bottom-8">
            <div className="relative">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Profile info quick summary */}
          <div className="absolute left-40 sm:left-44 bottom-16 sm:bottom-14">
            <h1 className="text-2xl font-bold text-white text-shadow">{savedData.fullName}</h1>
            <p className="text-white/90 text-shadow-sm">{user.email || 'E-poçt yoxdur'}</p>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="mb-8 border-b">
          <div className="flex space-x-8">
            <button 
              className={`pb-4 px-1 ${
                activeTab === 'profile' 
                  ? 'border-b-2 border-primary text-primary font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profil
            </button>
            <Link 
              to="/profile/orders"
              className="pb-4 px-1 text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <ShoppingBag className="w-4 h-4" />
              Sifarişlərim
            </Link>
            <button 
              className={`pb-4 px-1 ${
                activeTab === 'settings' 
                  ? 'border-b-2 border-primary text-primary font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Parametrlər
            </button>
          </div>
        </div>
        
        {/* Profile content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Account details */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Hesab məlumatları</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-gray-600 text-sm mb-2">
                        <User className="w-4 h-4 mr-2" />
                        Ad Soyad
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{savedData.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="flex items-center text-gray-600 text-sm mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        E-poçt
                      </label>
                      <p className="font-medium text-gray-900">{user.email || 'E-poçt yoxdur'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-gray-600 text-sm mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Telefon
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{savedData.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        Ünvan
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{savedData.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Son sifarişlər</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Sifariş #ORD-001</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 15 Noyabr 2023
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">192 ₼</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Çatdırılıb
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Sifariş #ORD-002</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 10 Dekabr 2023
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">215 ₼</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        Hazırlanır
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Account details */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Hesab fəaliyyəti</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Son giriş</p>
                      <p className="text-sm text-gray-500">Bu gün, 14:35</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-green-100 p-2 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Ümumi sifariş</p>
                      <p className="text-sm text-gray-500">2 sifariş</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-purple-100 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Hesab statusu</p>
                      <p className="text-sm text-gray-500">Təsdiqlənib</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      <span>Hesabdan çıx</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings content */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Hesab parametrləri</h2>
            
            <div className="space-y-6">
              <div className="pb-6 border-b">
                <h3 className="font-medium text-gray-900 mb-2">Hesabı silmək</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Hesabınızı sildikdən sonra, bütün məlumatlarınız bizim sistemdən silinəcək.
                  Bu əməliyyat geri qaytarıla bilməz.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center px-4 py-2 text-sm border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hesabı sil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hesab silmə modal pəncərəsi */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fadeIn">
              <div className="flex items-center mb-4 text-red-600">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Hesabı silmək</h3>
              </div>
              
              <p className="mb-6 text-gray-600">
                Hesabınızı silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz və bütün məlumatlarınız silinəcək.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Silinir...' : 'Hesabı sil'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
=======
      )}
    </div>
>>>>>>> a81bf9d2c487031ef7ce1ed1cbcf502ff25efaf5
  );
}