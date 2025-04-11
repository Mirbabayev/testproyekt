import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { UserRole } from '../lib/auth';
import { ReactNode, useEffect, useState } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: UserRole;
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading, checkRole } = useAuth();
  const location = useLocation();
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean | null>(null);
  const [roleCheckComplete, setRoleCheckComplete] = useState(false);

  useEffect(() => {
    console.log('Protected Route - User:', user); // Debug log
    console.log('Protected Route - Required Role:', requiredRole); // Debug log
    
    // Əgər istifadəçi yoxdursa, rol yoxlamasına ehtiyac yoxdur
    if (!user || !requiredRole) {
      console.log('No user or no required role'); // Debug log
      setRoleCheckComplete(true);
      return;
    }

    const checkUserRole = async () => {
      console.log('Checking user role...'); // Debug log
      const hasRole = await checkRole(requiredRole);
      console.log('Has required role:', hasRole); // Debug log
      setHasRequiredRole(hasRole);
      setRoleCheckComplete(true);
    };

    checkUserRole();
  }, [user, requiredRole, checkRole]);

  // Yükləmə zamanı gözləmə ekranını göstəririk
  if (isLoading || !roleCheckComplete) {
    console.log('Loading or role check not complete'); // Debug log
    return <div className="container py-8 text-center">Yüklənir...</div>;
  }

  // İstifadəçi daxil olmayıbsa və admin rolu tələb olunursa, admin login səhifəsinə yönləndiririk
  if (!user && requiredRole === UserRole.ADMIN) {
    console.log('No user with admin role required, redirecting to admin login'); // Debug log
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  // İstifadəçi daxil olmayıbsa və normal istifadəçi rolları tələb olunursa, normal login səhifəsinə yönləndiririk
  if (!user) {
    console.log('No user, redirecting to login'); // Debug log
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Əgər rol tələb olunubsa və istifadəçinin rolu uyğun gəlmirsə, icazəsiz səhifəyə yönləndiririk
  if (requiredRole && !hasRequiredRole) {
    console.log('User does not have required role, redirecting to unauthorized'); // Debug log
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  console.log('Access granted'); // Debug log
  return <>{children}</>;
} 