import { ReactNode, useRef } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div ref={headerRef} className="layout-header-wrapper">
        <Header />
      </div>
      
      <main className="flex-1 py-8">{children}</main>
      <Footer />
    </div>
  );
}