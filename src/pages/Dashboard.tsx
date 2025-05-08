
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointment } from "@/contexts/AppointmentContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserAppointments, cancelAppointment, loading } = useAppointment();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  useEffect(() => {
    // Buscar agendamentos do usuário
    const userAppointments = getUserAppointments().sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    setAppointments(userAppointments);
  }, [getUserAppointments]);

  const handleCancelAppointment = async (id: string) => {
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      const success = await cancelAppointment(id);
      if (success) {
        // Atualizar lista local
        setAppointments(prev => prev.map(app => 
          app.id === id ? {...app, status: "cancelled"} : app
        ));
      }
    }
  };

  // Filtrar agendamentos por status
  const upcomingAppointments = appointments.filter(app => 
    app.status === "scheduled" && new Date(app.date) > new Date()
  );
  
  const pastAppointments = appointments.filter(app => 
    app.status === "completed" || new Date(app.date) < new Date()
  );
  
  const cancelledAppointments = appointments.filter(app => 
    app.status === "cancelled"
  );

  // Selecionar agendamentos com base na aba ativa
  const filteredAppointments = 
    activeTab === "upcoming" ? upcomingAppointments :
    activeTab === "past" ? pastAppointments :
    cancelledAppointments;

  // Formatador de data
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Olá, {user?.name}</h1>
            <p className="text-muted-foreground">Bem-vindo ao seu dashboard do AgendAI.</p>
          </div>
          
          <Button asChild>
            <Link to="/agendar">
              <Plus size={16} className="mr-2" />
              Agendar
            </Link>
          </Button>
        </div>
        
        {/* Abas para filtrar agendamentos */}
        <div className="border-b border-border">
          <div className="flex space-x-6">
            <button
              className={`pb-2 pt-2 ${activeTab === 'upcoming' 
                ? 'border-b-2 border-primary font-medium text-primary' 
                : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Próximos
            </button>
            <button
              className={`pb-2 pt-2 ${activeTab === 'past' 
                ? 'border-b-2 border-primary font-medium text-primary' 
                : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('past')}
            >
              Realizados
            </button>
            <button
              className={`pb-2 pt-2 ${activeTab === 'cancelled' 
                ? 'border-b-2 border-primary font-medium text-primary' 
                : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelados
            </button>
          </div>
        </div>

        {/* Lista de agendamentos */}
        <div className="grid gap-4">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{appointment.serviceName}</CardTitle>
                  <CardDescription>
                    Com {appointment.staffName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock size={16} className="mr-1" />
                      <span>R$ {appointment.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  {activeTab === 'upcoming' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Cancelar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              {activeTab === 'upcoming' 
                ? 'Você não tem agendamentos futuros. Que tal agendar um serviço?' 
                : activeTab === 'past'
                  ? 'Você não tem agendamentos realizados.'
                  : 'Você não tem agendamentos cancelados.'}
            </div>
          )}
        </div>
        
        {/* Botão para agendar se não houver próximos agendamentos */}
        {activeTab === 'upcoming' && upcomingAppointments.length === 0 && (
          <div className="flex justify-center">
            <Button asChild className="mt-2">
              <Link to="/agendar">
                <Calendar size={16} className="mr-2" />
                Agendar um serviço
              </Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
