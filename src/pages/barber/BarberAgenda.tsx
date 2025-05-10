
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronDown, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppointmentStatus } from '@/types';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mockAppointments = [
  {
    id: '1',
    clientName: 'João Silva',
    time: '09:00',
    service: 'Corte de Cabelo',
    duration: 30,
    status: AppointmentStatus.CONFIRMED || 'confirmed',
    price: 35
  },
  {
    id: '2',
    clientName: 'Pedro Costa',
    time: '10:00',
    service: 'Barba',
    duration: 20,
    status: AppointmentStatus.PENDING || 'pending',
    price: 25
  },
  {
    id: '3',
    clientName: 'Carlos Eduardo',
    time: '11:00',
    service: 'Corte e Barba',
    duration: 50,
    status: AppointmentStatus.CONFIRMED || 'confirmed',
    price: 60
  },
  {
    id: '4',
    clientName: 'André Santos',
    time: '12:00',
    service: 'Corte Degradê',
    duration: 40,
    status: AppointmentStatus.CANCELLED || 'cancelled',
    price: 45
  },
  {
    id: '5',
    clientName: 'Lucas Mendes',
    time: '14:00',
    service: 'Corte de Cabelo',
    duration: 30,
    status: AppointmentStatus.CONFIRMED || 'confirmed',
    price: 35
  },
  {
    id: '6',
    clientName: 'Gabriel Oliveira',
    time: '15:00',
    service: 'Corte e Barba',
    duration: 50,
    status: AppointmentStatus.PENDING || 'pending',
    price: 60
  },
];

const BarberAgenda = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = mockAppointments.filter(
    appointment => appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <BarberDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
            <p className="text-muted-foreground">Gerencie os agendamentos da barbearia.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-full sm:w-auto"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "dd 'de' MMMM", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button className="w-full sm:w-auto">
              Novo Agendamento
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Procurar por cliente..." 
            className="flex-1 max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Agendamentos de {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </CardTitle>
            <CardDescription>
              {filteredAppointments.length} agendamentos para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                        {appointment.clientName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{appointment.clientName}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
                          <span>{appointment.time}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{appointment.service}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>R$ {appointment.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <span className={`text-xs rounded-full px-2 py-1 ${getStatusBadgeClass(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                      <Button variant="ghost" size="sm">
                        <ChevronDown size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Nenhum agendamento encontrado
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberAgenda;
