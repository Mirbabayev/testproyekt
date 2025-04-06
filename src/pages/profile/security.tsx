import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import TwoFactorAuth from '../../components/security/TwoFactorAuth';
import PasswordStrengthMeter from '../../components/security/PasswordStrengthMeter';
import { Eye, EyeOff, Save, Lock, Shield, RefreshCw } from 'lucide-react';

export default function Security() {
  const [activeTab, setActiveTab] = useState('password');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Şifrə dəyişdirmə formulunu emal et
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formun düzgünlüyünü yoxla
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Zəhmət olmasa bütün xanaları doldurun.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setErrorMessage('Yeni şifrə ilə təkrarı uyğun gəlmir.');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      // Demo məqsədilə gecikdirmə
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Real apidə: await api.changePassword(currentPassword, newPassword);
      
      setSuccessMessage('Şifrəniz uğurla dəyişdirildi!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage('Şifrə dəyişdirilməsi zamanı xəta baş verdi.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Şifrə göstər/gizlə
  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Təhlükəsizlik Parametrləri</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="password" className="flex items-center justify-center">
              <Lock className="h-4 w-4 mr-2" />
              Şifrə Parametrləri
            </TabsTrigger>
            <TabsTrigger value="2fa" className="flex items-center justify-center">
              <Shield className="h-4 w-4 mr-2" />
              İki Faktorlu Təhlükəsizlik
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="password">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Şifrə Dəyişdirmə</h2>
              
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Hazırki şifrə
                  </label>
                  <div className="relative">
                    <input
                      id="current-password"
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleShowPasswords}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPasswords ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Yeni şifrə
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <PasswordStrengthMeter password={newPassword} />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Yeni şifrəni təsdiqləyin
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showPasswords ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
                        confirmPassword && newPassword !== confirmPassword
                          ? 'border-red-300 text-red-900 placeholder-red-300'
                          : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">Şifrələr uyğun gəlmir.</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Şifrəni dəyişdir
                  </button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="2fa">
            <TwoFactorAuth />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 