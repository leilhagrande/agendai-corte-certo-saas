
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Trash2, ArrowLeft } from "lucide-react";
import { useAppointment } from "@/contexts/AppointmentContext";
import { Appointment, AppointmentStatus } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const AppointmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, cancelAppointment, loading } = useAppointment();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  
  useEffect(() => {
    // Buscar o agendamento pelo ID
    if (id) {
      const found = appointments.find(app => app.id === id);
      if (found) {
        setAppointment({
          ...found,
          date: typeof found.date === 'string' ? new Date(found.date) : found.date
        });
      } else {
        toast.error("Agendamento não encontrado");
        navigate("/dashboard");
      }
    }
  }, [id, appointments, navigate]);

  const handleCancelAppointment = async () => {
    if (!appointment) return;
    
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      const success = await cancelAppointment(appointment.id);
      if (success) {
        navigate("/dashboard");
      }
    }
  };

  // Verifica se o agendamento pode ser cancelado (ainda não ocorreu)
  const canBeCancelled = appointment && 
    appointment.status === AppointmentStatus.SCHEDULED && 
    new Date(appointment.date) > new Date();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!appointment) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <p className="text-muted-foreground">Agendamento não encontrado</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Voltar para o Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Detalhes do Agendamento</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{appointment.serviceName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Barbeiro</h3>
                <p>{appointment.staffName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p>{
                  appointment.status === AppointmentStatus.SCHEDULED 
                    ? "Agendado" 
                    : appointment.status === AppointmentStatus.COMPLETED
                      ? "Concluído"
                      : "Cancelado"
                }</p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Data</h3>
                  <p>{format(new Date(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Horário</h3>
                  <p>{format(new Date(appointment.date), "HH:mm", { locale: ptBR })}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Preço</h3>
                <p className="font-semibold">R$ {appointment.price.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
          {canBeCancelled && (
            <CardFooter>
              <Button 
                variant="outline" 
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleCancelAppointment}
              >
                <Trash2 size={16} className="mr-2" />
                Cancelar agendamento
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentDetails;
