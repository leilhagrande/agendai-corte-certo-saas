import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Scissors, 
  BarChart2, 
  Clock, 
  Settings, 
  Menu, 
  X,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

interface BarberDashboardLayoutProps {
  children: React.ReactNode;
}

const BarberDashboardLayout: React.FC<BarberDashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Verificar se o usuário é um barbeiro ou admin
  const isBarber = user?.role === "barber" || user?.role === "admin";

  // Handle logout and navigate to home
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      label: 'Agenda',
      icon: <Calendar size={20} />,
      href: '/barber/agenda',
      active: location.pathname === '/barber/agenda'
    },
    {
      label: 'Clientes',
      icon: <Users size={20} />,
      href: '/barber/clientes',
      active: location.pathname === '/barber/clientes'
    },
    {
      label: 'Serviços',
      icon: <Scissors size={20} />,
      href: '/barber/servicos',
      active: location.pathname === '/barber/servicos'
    },
    {
      label: 'Relatórios',
      icon: <BarChart2 size={20} />,
      href: '/barber/relatorios',
      active: location.pathname === '/barber/relatorios'
    },
    {
      label: 'Horários',
      icon: <Clock size={20} />,
      href: '/barber/horarios',
      active: location.pathname === '/barber/horarios'
    },
    {
      label: 'Configurações',
      icon: <Settings size={20} />,
      href: '/barber/configuracoes',
      active: location.pathname === '/barber/configuracoes'
    }
  ];

  // Redirect to login if not a barber
  useEffect(() => {
    if (user && !isBarber) {
      navigate('/');
    }
  }, [user, isBarber, navigate]);

  if (!isBarber) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <label className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p className="mb-6">Esta área é reservada para barbeiros.</p>
          <Button asChild>
            <Link to="/">Voltar para Home</Link>
          </Button>
        </label>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm md:hidden">
          <div className="container flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <Link to="/barber/agenda" className="flex items-center gap-2 font-semibold">
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">B</span>
                </div>
                <span>BarberDash</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                <LogOut size={18} />
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="border-t border-border">
              <nav className="container flex flex-col space-y-1 p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Desktop sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar className="hidden md:flex border-r">
            <SidebarHeader className="p-4">
              <Link to="/barber/agenda" className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">B</span>
                </div>
                <span className="font-bold text-lg">BarberDash</span>
              </Link>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild
                      isActive={item.active}
                      tooltip={item.label}
                    >
                      <Link to={item.href}>
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 mt-auto">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium mb-2">
                  {user?.name || user?.email}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start mb-2"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="container py-6 px-4 md:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BarberDashboardLayout;
