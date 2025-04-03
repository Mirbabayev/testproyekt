import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">İcazə yoxdur</h1>
        
        <p className="text-gray-600 mb-6">
          Bu səhifəyə giriş üçün icazəniz yoxdur. Bu səhifəyə daxil olmaq üçün lazımi səlahiyyətlərə sahib olmalısınız.
        </p>
        
        <div className="space-y-3">
          <Link 
            to="/"
            className="block w-full px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Ana səhifəyə qayıt
          </Link>
          
          <Link 
            to="/auth/login"
            className="block w-full px-4 py-2 bg-white text-primary border border-primary font-medium rounded-md hover:bg-primary/10 transition-colors"
          >
            Hesaba daxil ol
          </Link>
        </div>
      </div>
    </div>
  );
} 