import { useState, useEffect } from 'react';
import { QrCode, Copy, Check, Loader2, Smartphone, Shield, Lock } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

// OTP input komponenti
const OTPInput = ({ length = 6, onComplete }: { length: number, onComplete: (value: string) => void }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = Array(length).fill(0).map(() => React.createRef<HTMLInputElement>());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    if (isNaN(Number(value))) return;
    
    // Yeni kodun massivini yaradırıq
    const newCode = [...code];
    // Hər zaman son rəqəmi alırıq (birində çox yazdıqda)
    newCode[index] = value.slice(-1);
    setCode(newCode);
    
    // Bütün xanaların dolduğunu yoxlayırıq
    const filled = newCode.every(digit => digit !== '');
    if (filled && !newCode.includes('')) {
      onComplete(newCode.join(''));
    }
    
    // Avtomatik növbəti xanaya keç
    if (value && index < length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Backspace basıldıqda əvvəlki xanaya qayıt
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length).split('');
    if (pastedData.some(char => isNaN(Number(char)))) return;
    
    const newCode = [...code];
    pastedData.forEach((digit, index) => {
      if (index < length) newCode[index] = digit;
    });
    
    setCode(newCode);
    inputRefs[Math.min(pastedData.length, length - 1)].current?.focus();
    
    if (pastedData.length >= length) {
      onComplete(newCode.join(''));
    }
  };
  
  return (
    <div className="flex justify-center space-x-2 my-6">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={1}
          className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20 text-lg font-medium"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

// Aktivləşdirmə prosesinin mərhələləri
enum SetupStep {
  START = 'start',
  SHOW_QR = 'show_qr',
  VERIFY_CODE = 'verify_code',
  SUCCESS = 'success',
}

export default function TwoFactorAuth() {
  const { user } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [step, setStep] = useState<SetupStep>(SetupStep.START);
  const [secretKey, setSecretKey] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mövcud 2FA statusunu yoxlayırıq
  useEffect(() => {
    // TODO: Real API çağırışı
    // Bu simulyasiya üçündür
    const checkTwoFactorStatus = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch('/api/user/two-factor-status');
        // const data = await response.json();
        // setTwoFactorEnabled(data.enabled);
        
        // Simulyasiya üçün:
        setTimeout(() => {
          setTwoFactorEnabled(localStorage.getItem('2fa_enabled') === 'true');
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('İki faktorlu autentifikasiya statusunu yoxlayarkən xəta baş verdi');
        setIsLoading(false);
      }
    };
    
    checkTwoFactorStatus();
  }, []);
  
  // 2FA-nı aktiv etmək üçün
  const startTwoFactorSetup = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı
      // const response = await fetch('/api/user/two-factor-setup', { method: 'POST' });
      // const data = await response.json();
      // setSecretKey(data.secretKey);
      // setQrCodeUrl(data.qrCodeUrl);
      
      // Simulyasiya üçün:
      setTimeout(() => {
        // Demo məqsədli test açarı
        const demoSecretKey = 'JBSWY3DPEHPK3PXP';
        setSecretKey(demoSecretKey);
        setQrCodeUrl(`https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/Fragrance:${user?.email}?secret=${demoSecretKey}&issuer=FragranceApp`);
        setStep(SetupStep.SHOW_QR);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('İki faktorlu autentifikasiyanı quraşdırarkən xəta baş verdi');
      setIsLoading(false);
    }
  };
  
  // Açarı kopyala
  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Təsdiqlənmiş kod
  const verifyTwoFactorCode = async (code: string) => {
    setVerificationCode(code);
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı
      // const response = await fetch('/api/user/two-factor-verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code })
      // });
      // if (!response.ok) throw new Error('Kod yanlışdır');
      
      // Simulyasiya üçün: (real həllində kod serverdə yoxlanılmalıdır)
      setTimeout(() => {
        // Demo məqsədli - 123456 düzgün koddur
        if (code === '123456') {
          setTwoFactorEnabled(true);
          localStorage.setItem('2fa_enabled', 'true');
          setStep(SetupStep.SUCCESS);
        } else {
          setError('Yanlış kod. Zəhmət olmasa yenidən cəhd edin.');
        }
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Kodu yoxlayarkən xəta baş verdi');
      setIsLoading(false);
    }
  };
  
  // 2FA-nı deaktiv et
  const disableTwoFactor = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı
      // const response = await fetch('/api/user/two-factor-disable', { method: 'POST' });
      // if (!response.ok) throw new Error('Deaktivasiya zamanı xəta');
      
      // Simulyasiya üçün:
      setTimeout(() => {
        setTwoFactorEnabled(false);
        localStorage.removeItem('2fa_enabled');
        setStep(SetupStep.START);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('İki faktorlu autentifikasiyanı deaktiv edərkən xəta baş verdi');
      setIsLoading(false);
    }
  };
  
  if (isLoading && step === SetupStep.START) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-2 text-gray-600">Məlumatlar yüklənir...</p>
      </div>
    );
  }
  
  // 2FA aktiv və ya deaktiv etmək üçün başlanğıc səhifə
  if (step === SetupStep.START) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-xl font-semibold">İki faktorlu autentifikasiya</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          İki faktorlu autentifikasiya hesabınız üçün əlavə təhlükəsizlik təbəqəsi təmin edir. 
          Aktivləşdirildikdə, hesabınıza giriş edərkən parolunuzla yanaşı, mobil cihazınızdan 
          əldə etdiyiniz kodu da daxil etməli olacaqsınız.
        </p>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Smartphone className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Necə işləyir?</h3>
              <p className="mt-1 text-sm text-gray-600">
                1. Google Authenticator və ya oxşar bir tətbiq yükləyin<br />
                2. QR kodu skan edin və ya açarı daxil edin<br />
                3. Tətbiqin yaratdığı 6 rəqəmli kodu daxil edin<br />
                4. Giriş edərkən, parolunuzla yanaşı bu kodu da istifadə edin
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          {twoFactorEnabled ? (
            <button
              onClick={disableTwoFactor}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Lock className="h-4 w-4 mr-2" />
              )}
              İki faktorlu autentifikasiyanı deaktiv et
            </button>
          ) : (
            <button
              onClick={startTwoFactorSetup}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              İki faktorlu autentifikasiyanı aktiv et
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // QR kodu göstərmə mərhələsi
  if (step === SetupStep.SHOW_QR) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Authenticator tətbiqinizi quraşdırın</h2>
        
        <p className="text-gray-600 mb-6">
          Google Authenticator, Microsoft Authenticator və ya oxşar bir tətbiq istifadə edərək 
          aşağıdakı QR kodu skan edin. Alternativ olaraq, göstərilən gizli açarı əl ilə daxil edə bilərsiniz.
        </p>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        <div className="flex flex-col items-center mb-4">
          <div className="bg-white p-2 border rounded-md shadow-sm mb-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
          
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 w-full max-w-md">
            <QrCode className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700 flex-grow font-mono">{secretKey}</span>
            <button
              onClick={copySecretKey}
              className="ml-2 text-gray-500 hover:text-primary focus:outline-none"
              title="Kopyala"
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Authenticator tətbiqində görünən 6 rəqəmli kodu daxil edin:
          </p>
          
          <OTPInput
            length={6}
            onComplete={(code) => {
              setStep(SetupStep.VERIFY_CODE);
              verifyTwoFactorCode(code);
            }}
          />
          
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setStep(SetupStep.START)}
              className="text-gray-500 text-sm hover:text-gray-700"
              disabled={isLoading}
            >
              Ləğv et
            </button>
            
            {isLoading && (
              <span className="text-gray-500 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Yoxlanılır...
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Kod yoxlama mərhələsi (ayrıca göstərilmirsə)
  if (step === SetupStep.VERIFY_CODE) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-gray-600">Kod yoxlanılır...</p>
      </div>
    );
  }
  
  // Uğurlu aktivləşdirmə mərhələsi
  if (step === SetupStep.SUCCESS) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-6 w-6 text-green-600" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">İki faktorlu autentifikasiya aktiv edildi!</h2>
        
        <p className="text-gray-600 mb-6">
          Hesabınız indi iki faktorlu autentifikasiya ilə qorunur. Növbəti dəfə giriş edərkən, 
          mobil cihazınızda generasiya olunan kodu daxil etməli olacaqsınız.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <Smartphone className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Vacib!</strong> Ehtiyat kodlarınızı təhlükəsiz bir yerdə saxlayın. 
                Mobil cihazınıza giriş əldə edə bilmədiyiniz halda, bu kodlar hesabınıza giriş etməyə imkan verəcək.
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setStep(SetupStep.START)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Check className="h-4 w-4 mr-2" />
          Tamamla
        </button>
      </div>
    );
  }
  
  return null;
} 