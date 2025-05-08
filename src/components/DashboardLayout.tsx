
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useAppointment } from '@/contexts/AppointmentContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { userSubscription, remainingAppointments } = useAppointment();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      label: 'Dashboard',
      icon: <Home size={20} />,
      href: '/dashboard',
    },
    {
      label: 'Agendar',
      icon: <Calendar size={20} />,
      href: '/agendar',
    },
    {
      label: 'Perfil',
      icon: <User size={20} />,
      href: '/perfil',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header com navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-bold text-white">AI</span>
              </div>
              <span className="font-bold text-xl hidden md:block">AgendAI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user && userSubscription && (
              <div className="hidden md:block text-sm">
                <span className="font-medium">Plano: {userSubscription.planName}</span>
                {remainingAppointments !== null && (
                  <span className="ml-2 text-muted-foreground">
                    ({remainingAppointments} agendamentos restantes)
                  </span>
                )}
              </div>
            )}
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm">{user?.name}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="container flex flex-col space-y-1 p-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                    location.pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-2">
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" />
                  <span>Sair</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Layout principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar para desktop */}
        <aside className="hidden md:block border-r border-border w-64 shrink-0">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid items-start px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                      location.pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              {userSubscription && (
                <div className="mb-4 text-sm">
                  <div className="font-medium">Plano: {userSubscription.planName}</div>
                  {remainingAppointments !== null && (
                    <div className="text-muted-foreground">
                      {remainingAppointments} agendamentos restantes
                    </div>
                  )}
                </div>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                <LogOut size={18} className="mr-2" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
