
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, Plus, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';
import { AppointmentStatus } from '@/types';

// Dados mockados para demonstração
const agendamentos = [
  {
    id: '1',
    horario: '09:00',
    cliente: 'João Silva',
    servico: 'Corte de Cabelo',
    duracao: '30 min',
    valor: 'R$ 40,00',
    status: AppointmentStatus.CONFIRMED
  },
  {
    id: '2',
    horario: '10:00',
    cliente: 'Carlos Oliveira',
    servico: 'Barba',
    duracao: '20 min',
    valor: 'R$ 30,00',
    status: AppointmentStatus.PENDING
  },
  {
    id: '3',
    horario: '11:00',
    cliente: 'Pedro Santos',
    servico: 'Corte e Barba',
    duracao: '45 min',
    valor: 'R$ 65,00',
    status: AppointmentStatus.CANCELLED
  },
  {
    id: '4',
    horario: '13:30',
    cliente: 'André Pereira',
    servico: 'Corte Degradê',
    duracao: '35 min',
    valor: 'R$ 50,00',
    status: AppointmentStatus.CONFIRMED
  },
  {
    id: '5',
    horario: '14:30',
    cliente: 'Lucas Mendes',
    servico: 'Corte de Cabelo',
    duracao: '30 min',
    valor: 'R$ 40,00',
    status: AppointmentStatus.CONFIRMED
  },
  {
    id: '6',
    horario: '15:30',
    cliente: 'Gabriel Costa',
    servico: 'Barba',
    duracao: '20 min',
    valor: 'R$ 30,00',
    status: AppointmentStatus.PENDING
  },
];

const BarberAgenda = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'dia' | 'semana' | 'mes'>('dia');
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  
  // Navegar para o dia anterior
  const handlePrevDay = () => {
    setCurrentDate(prev => addDays(prev, -1));
  };
  
  // Navegar para o próximo dia
  const handleNextDay = () => {
    setCurrentDate(prev => addDays(prev, 1));
  };
  
  // Filtrar agendamentos por status
  const agendamentosFiltrados = filtroStatus === "todos" 
    ? agendamentos 
    : agendamentos.filter(a => a.status === filtroStatus);
  
  // Função para renderizar o badge de status com cor apropriada
  const renderStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case AppointmentStatus.PENDING:
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pendente</Badge>;
      case AppointmentStatus.CANCELLED:
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
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
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevDay}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <h2 className="text-lg font-medium">
                {format(currentDate, "EEEE, d 'de' MMMM", { locale: pt })}
              </h2>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextDay}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dia">Dia</SelectItem>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="mes">Mês</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="todos" onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value={AppointmentStatus.CONFIRMED}>Confirmados</SelectItem>
                <SelectItem value={AppointmentStatus.PENDING}>Pendentes</SelectItem>
                <SelectItem value={AppointmentStatus.CANCELLED}>Cancelados</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4">
          {agendamentosFiltrados.map((agendamento) => (
            <Card key={agendamento.id} className="overflow-hidden">
              <div className={`w-1 h-full absolute left-0 ${
                agendamento.status === AppointmentStatus.CONFIRMED 
                  ? "bg-green-500" 
                  : agendamento.status === AppointmentStatus.PENDING 
                  ? "bg-yellow-500" 
                  : "bg-red-500"
              }`} />
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{agendamento.horario}</CardTitle>
                  </div>
                  {renderStatusBadge(agendamento.status)}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{agendamento.cliente}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>{agendamento.servico}</span>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">{agendamento.duracao}</span>
                      <span className="font-medium">{agendamento.valor}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm">Reagendar</Button>
                    <Button variant="default" size="sm">Detalhes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {agendamentosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum agendamento encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberAgenda;
