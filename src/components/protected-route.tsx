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
    // Əgər istifadəçi yoxdursa və ya rol tələb olunmursa, rol yoxlamasına ehtiyac yoxdur
    if (!user || !requiredRole) {
      setRoleCheckComplete(true);
      return;
    }

    // Əgər istifadəçi varsa və rol tələb olunursa, rolu yoxlayırıq
    const checkUserRole = async () => {
      const hasRole = await checkRole(requiredRole);
      setHasRequiredRole(hasRole);
      setRoleCheckComplete(true);
    };

    checkUserRole();
  }, [user, requiredRole, checkRole]);

  // Yükləmə zamanı və ya rol yoxlanılana qədər gözləmə ekranını göstəririk
  if (isLoading || !roleCheckComplete) {
    return <div className="container py-8 text-center">Yüklənir...</div>;
  }

  // İstifadəçi daxil olmayıbsa və admin rolu tələb olunursa, admin login səhifəsinə yönləndiririk
  if (!user && requiredRole === UserRole.ADMIN) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  // İstifadəçi daxil olmayıbsa və normal istifadəçi rolları tələb olunursa, normal login səhifəsinə yönləndiririk
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Əgər rol tələb olunubsa və istifadəçinin rolu uyğun gəlmirsə, icazəsiz səhifəyə yönləndiririk
  if (requiredRole && !hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Bütün yoxlamalara keçdisə, qorunan komponenti göstəririk
  return <>{children}</>;
} 