
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointment } from "@/contexts/AppointmentContext";
import { Staff, Service, Appointment } from "@/types";
import { toast } from "sonner";
import { format, addDays, isPast, isBefore, startOfDay, addHours, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";

const NewAppointment = () => {
  const { user } = useAuth();
  const { getStaff, getServices, createAppointment, canScheduleAppointment, remainingAppointments } = useAppointment();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar limite do plano
  useEffect(() => {
    if (!canScheduleAppointment()) {
      toast.error("Você atingiu o limite de agendamentos do seu plano. Faça upgrade para agendar mais.");
      navigate("/dashboard");
    }
  }, [canScheduleAppointment, navigate]);

  // Carregar funcionários e serviços
  useEffect(() => {
    setStaffList(getStaff());
    setServiceList(getServices());
  }, [getStaff, getServices]);

  // Gerar horários disponíveis para o dia selecionado
  useEffect(() => {
    if (!selectedDate) return;

    // Verificar se o dia é anterior ao dia atual
    if (isPast(startOfDay(selectedDate))) {
      setAvailableTimes([]);
      return;
    }

    // Gerar horários disponíveis das 9h às 18h com intervalos de 30 minutos
    const times: Date[] = [];
    const today = startOfDay(new Date());
    const now = new Date();
    
    // Se for hoje, só mostramos horários que ainda não passaram
    const isToday = startOfDay(selectedDate).getTime() === today.getTime();

    for (let hour = 9; hour <= 18; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 18 && minute === 30) continue; // Não adicionar 18:30
        
        const time = setMinutes(setHours(new Date(selectedDate), hour), minute);
        
        // Se for hoje, só adicionar horários futuros
        if (isToday && isBefore(time, now)) continue;
        
        times.push(time);
      }
    }

    setAvailableTimes(times);
    setSelectedTime(null); // Reset do horário ao mudar a data
  }, [selectedDate]);

  // Função para avançar para o próximo passo
  const nextStep = () => {
    if (step === 1 && !selectedStaff) {
      toast.error("Selecione um barbeiro para continuar.");
      return;
    }
    
    if (step === 2 && !selectedService) {
      toast.error("Selecione um serviço para continuar.");
      return;
    }
    
    if (step === 3 && !selectedDate) {
      toast.error("Selecione uma data para continuar.");
      return;
    }
    
    if (step === 4 && !selectedTime) {
      toast.error("Selecione um horário para continuar.");
      return;
    }
    
    if (step < 5) {
      setStep(step + 1);
    }
  };

  // Função para retornar ao passo anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Função para criar o agendamento
  const handleCreateAppointment = async () => {
    if (!user || !selectedStaff || !selectedService || !selectedTime) {
      toast.error("Informações incompletas para agendamento.");
      return;
    }
    
    setIsSubmitting(true);
    
    const appointmentData: Omit<Appointment, "id" | "status"> = {
      clientId: user.id,
      clientName: user.name,
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      barbershopId: selectedStaff.barbershopId,
      date: selectedTime,
      price: selectedService.price
    };
    
    const success = await createAppointment(appointmentData);
    
    if (success) {
      navigate("/dashboard");
    }
    
    setIsSubmitting(false);
  };

  // Renderiza os diferentes passos do agendamento
  const renderStep = () => {
    switch (step) {
      case 1: // Seleção de Barbeiro
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Escolha um barbeiro</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {staffList.map((staff) => (
                <Card 
                  key={staff.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStaff?.id === staff.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedStaff(staff)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff.position}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 2: // Seleção de Serviço
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Escolha um serviço</h2>
            
            <div className="grid gap-4">
              {serviceList.map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService?.id === service.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="text-sm text-muted-foreground">{service.duration} minutos</p>
                    </div>
                    <p className="text-lg font-semibold">R$ {service.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 3: // Seleção de Data
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Escolha uma data</h2>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => isPast(startOfDay(date)) || date > addDays(new Date(), 30)}
                className="rounded-md border"
                locale={ptBR}
              />
            </div>
          </div>
        );
        
      case 4: // Seleção de Horário
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Escolha um horário</h2>
            
            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {availableTimes.map((time, index) => (
                  <Button
                    key={index}
                    variant={selectedTime?.getTime() === time.getTime() ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="h-12"
                  >
                    {format(time, "HH:mm")}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Nenhum horário disponível para esta data. Por favor, escolha outra data.
              </p>
            )}
          </div>
        );
        
      case 5: // Confirmação
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Confirme seu agendamento</h2>
            
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Barbeiro</h3>
                    <p>{selectedStaff?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Serviço</h3>
                    <p>{selectedService?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Data</h3>
                    <p>{selectedDate && format(selectedDate, "dd/MM/yyyy")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Horário</h3>
                    <p>{selectedTime && format(selectedTime, "HH:mm")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Duração</h3>
                    <p>{selectedService?.duration} minutos</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Preço</h3>
                    <p className="font-semibold">R$ {selectedService?.price.toFixed(2)}</p>
                  </div>
                </div>
                
                {remainingAppointments !== null && (
                  <div className="text-sm text-muted-foreground mt-4">
                    <p>Você tem {remainingAppointments} agendamentos restantes em seu plano.</p>
                    <p>Após confirmar este agendamento, você terá {remainingAppointments - 1} restantes.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Agendamento</h1>
          <p className="text-muted-foreground">Crie um novo agendamento em poucos passos.</p>
        </div>

        {/* Indicador de passos */}
        <div className="w-full">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === i 
                      ? 'bg-primary text-primary-foreground' 
                      : step > i
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i}
                </div>
                <span className="text-xs mt-1 hidden md:block">
                  {i === 1 ? 'Barbeiro' : 
                   i === 2 ? 'Serviço' : 
                   i === 3 ? 'Data' : 
                   i === 4 ? 'Horário' : 'Confirmar'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 bg-muted">
            <div 
              className="h-1 bg-primary transition-all" 
              style={{ width: `${(step - 1) * 25}%` }}
            />
          </div>
        </div>

        {/* Conteúdo do passo */}
        <div className="mt-6">
          {renderStep()}
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
          >
            Voltar
          </Button>
          
          {step < 5 ? (
            <Button onClick={nextStep}>
              Continuar
            </Button>
          ) : (
            <Button 
              onClick={handleCreateAppointment} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Agendando..." : "Confirmar agendamento"}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewAppointment;
