import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OtpInput } from '../../components/ui/otp-input';

describe('OtpInput komponenti', () => {
  // Təməl render testi
  test('Düzgün sayda input elementi render etməlidir', () => {
    const mockOnComplete = jest.fn();
    const testLength = 6;
    
    render(<OtpInput length={testLength} onComplete={mockOnComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(testLength);
  });
  
  // Daxil edilən məlumatların işləməsi
  test('Daxil edilən rəqəmləri düzgün işləməlidir', async () => {
    const mockOnComplete = jest.fn();
    const user = userEvent.setup();
    
    render(<OtpInput length={4} onComplete={mockOnComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Birinci xanaya 1 rəqəmini daxil edirik
    await user.type(inputs[0], '1');
    
    // Fokus avtomatik olaraq ikinci xanaya keçməlidir
    expect(document.activeElement).toBe(inputs[1]);
    
    // İkinci xanaya 2 rəqəmini daxil edirik
    await user.type(inputs[1], '2');
    
    // Üçüncü xanaya 3 rəqəmini daxil edirik
    await user.type(inputs[2], '3');
    
    // Dördüncü xanaya 4 rəqəmini daxil edirik
    await user.type(inputs[3], '4');
    
    // onComplete callback-i çağrılmalıdır
    expect(mockOnComplete).toHaveBeenCalledWith('1234');
  });
  
  // Yalnız rəqəmlərin daxil edilməsi
  test('Yalnız rəqəm daxil edilməsinə icazə verməlidir', async () => {
    const mockOnComplete = jest.fn();
    const user = userEvent.setup();
    
    render(<OtpInput length={4} onComplete={mockOnComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Birinci xanaya a hərfini daxil etməyə çalışırıq
    await user.type(inputs[0], 'a');
    
    // Input dəyəri boş olmalıdır
    expect(inputs[0]).toHaveValue('');
    
    // Birinci xanaya 5 rəqəmini daxil edirik
    await user.type(inputs[0], '5');
    
    // Input dəyəri 5 olmalıdır
    expect(inputs[0]).toHaveValue('5');
  });
  
  // Yapışdırma funksionallığı
  test('Yapışdırma funksionallığı düzgün işləməlidir', () => {
    const mockOnComplete = jest.fn();
    
    render(<OtpInput length={6} onComplete={mockOnComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Yapışdırma hadisəsini simulyasiya edirik
    const clipboardData = {
      getData: jest.fn().mockReturnValue('123456')
    };
    
    fireEvent.paste(inputs[0], { clipboardData });
    
    // Bütün xanalara uyğun rəqəmlər doldurulmalıdır
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(inputs[4]).toHaveValue('5');
    expect(inputs[5]).toHaveValue('6');
    
    // onComplete callback-i çağrılmalıdır
    expect(mockOnComplete).toHaveBeenCalledWith('123456');
  });
  
  // Yarımçıq yapışdırma
  test('Qismən yapışdırma düzgün işləməlidir', () => {
    const mockOnComplete = jest.fn();
    
    render(<OtpInput length={6} onComplete={mockOnComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Yapışdırma hadisəsini simulyasiya edirik (daha qısa kod)
    const clipboardData = {
      getData: jest.fn().mockReturnValue('123')
    };
    
    fireEvent.paste(inputs[0], { clipboardData });
    
    // Yalnız ilk 3 xana doldurulmalıdır
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('');
    expect(inputs[4]).toHaveValue('');
    expect(inputs[5]).toHaveValue('');
    
    // onComplete callback-i çağrılmamalıdır
    expect(mockOnComplete).not.toHaveBeenCalled();
  });
  
  // Backspace işləməsi
  test('Backspace düyməsi düzgün işləməlidir', async () => {
    const mockOnComplete = jest.fn();
    const user = userEvent.setup();
    
    render(<OtpInput length={4} onComplete={mockOnComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Birinci xanaya 1 rəqəmini daxil edirik
    await user.type(inputs[0], '1');
    
    // İkinci xanaya 2 rəqəmini daxil edirik
    await user.type(inputs[1], '2');
    
    // İkinci xanada Backspace düyməsini basırıq
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    
    // İkinci xana təmizlənməlidir
    expect(inputs[1]).toHaveValue('');
    
    // Boş xanada Backspace düyməsini basırıq (əvvəlki xanaya keçməli)
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    
    // Fokus birinci xanaya qayıtmalıdır
    expect(document.activeElement).toBe(inputs[0]);
    
    // Birinci xanada Backspace düyməsini basırıq
    fireEvent.keyDown(inputs[0], { key: 'Backspace' });
    
    // Birinci xana təmizlənməlidir
    expect(inputs[0]).toHaveValue('');
  });
  
  // Disabled rejimi
  test('Disabled rejimi düzgün işləməlidir', async () => {
    const mockOnComplete = jest.fn();
    const user = userEvent.setup();
    
    render(<OtpInput length={4} onComplete={mockOnComplete} disabled={true} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Bütün inputlar disabled olmalıdır
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
    
    // Birinci xanaya 1 rəqəmini daxil etməyə çalışırıq
    await user.type(inputs[0], '1');
    
    // Input dəyəri dəyişməməlidir
    expect(inputs[0]).toHaveValue('');
    
    // onComplete callback-i çağrılmamalıdır
    expect(mockOnComplete).not.toHaveBeenCalled();
  });
}); 