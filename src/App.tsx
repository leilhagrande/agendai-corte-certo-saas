
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { useAuth } from "./contexts/AuthContext";

// Páginas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import NewAppointment from "./pages/NewAppointment";
import AppointmentDetails from "./pages/AppointmentDetails";
import Profile from "./pages/Profile";

// Novas páginas do Barber Dashboard
import BarberAgenda from "./pages/barber/BarberAgenda";
import BarberClientes from "./pages/barber/BarberClientes";
import BarberRelatorios from "./pages/barber/BarberRelatorios";

// Criando o QueryClient fora do componente para evitar recriações
const queryClient = new QueryClient();

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Enquanto verifica autenticação, mostra uma tela de carregamento
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Se não estiver autenticado, redireciona para login
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componente BarberRoute para rotas específicas da barbearia
const BarberRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Verifica se está autenticado e se o usuário tem a role 'barber' ou 'admin'
  const isBarber = user?.role === 'barber' || user?.role === 'admin';
  return isAuthenticated && isBarber ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componente AppContent para usar os hooks de contexto
const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/demo" element={<Demo />} />
      
      {/* Rotas protegidas para clientes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/agendar" element={<ProtectedRoute><NewAppointment /></ProtectedRoute>} />
      <Route path="/agendamento/:id" element={<ProtectedRoute><AppointmentDetails /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Novas rotas do Barber Dashboard */}
      <Route path="/barber/agenda" element={<BarberRoute><BarberAgenda /></BarberRoute>} />
      <Route path="/barber/clientes" element={<BarberRoute><BarberClientes /></BarberRoute>} />
      <Route path="/barber/servicos" element={<BarberRoute><BarberAgenda /></BarberRoute>} />
      <Route path="/barber/relatorios" element={<BarberRoute><BarberRelatorios /></BarberRoute>} />
      <Route path="/barber/horarios" element={<BarberRoute><BarberAgenda /></BarberRoute>} />
      <Route path="/barber/configuracoes" element={<BarberRoute><BarberAgenda /></BarberRoute>} />
      
      {/* Rota de fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppointmentProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <AppContent />
                </TooltipProvider>
              </AppointmentProvider>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
