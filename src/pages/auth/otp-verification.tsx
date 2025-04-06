import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OtpInput } from '../../components/ui/otp-input';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';

export default function OtpVerification() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // state-dən məlumatları əldə edirik
  const { email, action, redirectUrl } = location.state || {};
  
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  
  // Əgər email və action mövcud deyilsə, login səhifəsinə yönləndirik
  useEffect(() => {
    if (!email || !action) {
      navigate('/auth/login');
    }
  }, [email, action, navigate]);
  
  // Geri sayım üçün timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  // OTP kodu tamamlandıqda
  const handleOtpComplete = async (otp: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Backend API çağırışı
      // Aşağıdakı kod nümunə üçündür və real tətbiqdə backendə sorğu göndərməlidir
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === '123456') { // Demo məqsədləri üçün sabit kod
        setSuccess('OTP uğurla təsdiqləndi');
        
        // İstifadəçini müvafiq səhifəyə yönləndiririk
        setTimeout(() => {
          if (action === 'register') {
            navigate(redirectUrl || '/profile');
          } else if (action === 'login') {
            navigate(redirectUrl || '/');
          } else if (action === 'reset-password') {
            navigate('/auth/reset-password/new', { 
              state: { email, verified: true } 
            });
          }
        }, 1500);
      } else {
        setError('Yanlış OTP kod. Zəhmət olmasa yenidən cəhd edin.');
      }
    } catch (err) {
      setError('Təsdiqləmə zamanı xəta baş verdi');
      console.error('OTP verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // OTP kodunu yenidən göndərmək
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    setError(null);
    
    try {
      // TODO: Backend API çağırışı
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCountdown(60);
      setSuccess('Yeni OTP kodu e-poçt ünvanınıza göndərildi');
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError('OTP kodunu yenidən göndərərkən xəta baş verdi');
      console.error('Resend OTP error:', err);
    } finally {
      setIsResending(false);
    }
  };
  
  const getActionText = () => {
    switch (action) {
      case 'register': return t('registration');
      case 'login': return t('login');
      case 'reset-password': return t('passwordReset');
      default: return t('verification');
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">OTP Təsdiqləmə</h2>
          <p className="mt-2 text-gray-600">{getActionText()} prosesi üçün kodu daxil edin</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          {error && (
            <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 text-sm text-green-600 bg-green-50 rounded-lg">
              {success}
            </div>
          )}
          
          <div className="mb-6 text-center">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">{email}</span> ünvanına göndərilən 6 rəqəmli kodu daxil edin
            </p>
          </div>
          
          <div className="mb-6">
            <OtpInput 
              length={6} 
              onComplete={handleOtpComplete} 
              disabled={isLoading || !!success}
            />
          </div>
          
          <div className="text-center mb-6">
            <button
              disabled={countdown > 0 || isResending}
              onClick={handleResendOtp}
              className="text-primary hover:text-primary/80 disabled:text-gray-400 text-sm flex items-center mx-auto"
            >
              {isResending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1" />
              )}
              
              {countdown > 0 
                ? `Yenidən göndər (${countdown}s)`
                : 'Kodu yenidən göndər'
              }
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Geri qayıt
            </button>
            
            {isLoading && (
              <div className="flex items-center text-primary">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Yoxlanılır...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 