import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface OtpInputProps {
  length: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export function OtpInput({ length = 6, onComplete, disabled = false }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Daxil edilən məlumatları yeniləmək
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Son daxil olunan rəqəmi götürürük
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // OTP tamamlanıbsa callback çağırılır
    const otpValue = newOtp.join('');
    if (newOtp.every(v => v !== '') && otpValue.length === length) {
      onComplete(otpValue);
    }

    // Avtomatik fokus növbəti xanaya keçir
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Yapışdırma əməliyyatı üçün handler
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    if (clipboardData && /^\d+$/.test(clipboardData)) {
      const newOtp = [...otp];
      
      // OTP-ni yapışdırılan məlumatla doldururuq
      for (let i = 0; i < Math.min(length, clipboardData.length); i++) {
        newOtp[i] = clipboardData[i];
      }
      
      setOtp(newOtp);
      
      // OTP tamamlanıbsa callback çağırılır
      const otpValue = newOtp.join('');
      if (newOtp.every(v => v !== '') && otpValue.length === length) {
        onComplete(otpValue);
      }
      
      // Son xanaya fokus veririk
      const lastFilledIndex = Math.min(length - 1, clipboardData.length - 1);
      if (inputRefs.current[lastFilledIndex]) {
        inputRefs.current[lastFilledIndex]?.focus();
      }
    }
  };

  // Klaviatura hadisələrini idarə etmək
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Hazırki xana boşdursa və backspace basılıbsa, əvvəlki xanaya qayıdırıq
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2 items-center justify-center">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(input) => (inputRefs.current[index] = input)}
          className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-md focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      ))}
    </div>
  );
} 