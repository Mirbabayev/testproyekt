import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

interface PasswordStrengthMeterProps {
  password: string;
  showRequirements?: boolean;
}

// Şifrə gücü şərtləri
const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'Ən azı 8 simvol',
    validator: (password) => password.length >= 8,
  },
  {
    id: 'lowercase',
    label: 'Kiçik hərf istifadə edin (a-z)',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    label: 'Böyük hərf istifadə edin (A-Z)',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    label: 'Rəqəm istifadə edin (0-9)',
    validator: (password) => /[0-9]/.test(password),
  },
  {
    id: 'special',
    label: 'Xüsusi simvol istifadə edin (!, @, #, və s.)',
    validator: (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  },
];

// Şifrə gücünü hesablama funksiyası
const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  // Tələblərin sayını hesablayaq
  const fulfilledRequirements = passwordRequirements.filter(req => 
    req.validator(password)
  ).length;
  
  // 5 tələbdən neçəsi yerinə yetirilib
  return Math.floor((fulfilledRequirements / passwordRequirements.length) * 100);
};

// Şifrə gücünə əsasən rəng və mətn təyin etmə
const getStrengthInfo = (strength: number): { color: string; label: string } => {
  if (strength < 20) return { color: 'bg-red-500', label: 'Çox zəif' };
  if (strength < 40) return { color: 'bg-orange-500', label: 'Zəif' };
  if (strength < 60) return { color: 'bg-yellow-500', label: 'Orta' };
  if (strength < 80) return { color: 'bg-blue-500', label: 'Yaxşı' };
  return { color: 'bg-green-500', label: 'Güclü' };
};

export default function PasswordStrengthMeter({ 
  password, 
  showRequirements = true 
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [requirementsMet, setRequirementsMet] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Şifrə gücünü hesablayaq
    const passwordStrength = calculatePasswordStrength(password);
    setStrength(passwordStrength);
    
    // Tələblərin yerinə yetirilməsini yoxlayaq
    const metRequirements = passwordRequirements.reduce((acc, req) => {
      acc[req.id] = req.validator(password);
      return acc;
    }, {} as Record<string, boolean>);
    
    setRequirementsMet(metRequirements);
  }, [password]);
  
  const strengthInfo = getStrengthInfo(strength);
  
  return (
    <div className="mt-2 space-y-2">
      {/* Şifrə gücü proqres çubuğu */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strengthInfo.color} transition-all duration-300 ease-in-out`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>
      
      {/* Şifrə gücü göstəricisi */}
      <div className="flex items-center text-xs">
        <span className="text-gray-600 mr-1">Şifrə gücü:</span>
        <span className={`font-medium ${
          strength < 40 ? 'text-red-600' : 
          strength < 60 ? 'text-yellow-600' : 
          strength < 80 ? 'text-blue-600' : 'text-green-600'
        }`}>
          {strengthInfo.label}
        </span>
      </div>
      
      {/* Şifrə tələbləri (əgər göstərilməlidirsə) */}
      {showRequirements && (
        <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded-md border border-gray-200">
          <div className="text-xs font-medium text-gray-600 mb-2 flex items-center">
            <Info className="w-3 h-3 mr-1" />
            <span>Şifrə tələbləri:</span>
          </div>
          <ul className="space-y-1.5">
            {passwordRequirements.map((req) => (
              <li key={req.id} className="flex items-start">
                {requirementsMet[req.id] ? (
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                ) : password ? (
                  <XCircle className="w-3.5 h-3.5 text-red-500 mr-1.5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400 mr-1.5 flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-xs ${
                  requirementsMet[req.id] 
                    ? 'text-green-700' 
                    : password 
                      ? 'text-red-700' 
                      : 'text-gray-600'
                }`}>
                  {req.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 