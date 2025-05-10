
import React, { useState } from 'react';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';
import StatisticsSection from '@/components/reports/StatisticsSection';
import AppointmentsBarChart from '@/components/reports/AppointmentsBarChart';
import RevenueLineChart from '@/components/reports/RevenueLineChart';
import PopularServicesChart from '@/components/reports/PopularServicesChart';
import { mockWeekData, mockServicesData } from '@/utils/reportMockData';

const BarberRelatorios = () => {
  const [periodo, setPeriodo] = useState('semana');
  
  // Calcula o total de atendimentos e receita
  const totalAtendimentos = mockWeekData.reduce((acc, curr) => acc + curr.atendimentos, 0);
  const totalReceita = mockWeekData.reduce((acc, curr) => acc + curr.receita, 0);
  const ticketMedio = totalReceita / totalAtendimentos;
  const novosClientes = 14; // Mock data
  
  return (
    <BarberDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Estatísticas e análise de desempenho da barbearia.</p>
        </div>
        
        <StatisticsSection 
          totalAtendimentos={totalAtendimentos}
          totalReceita={totalReceita}
          ticketMedio={ticketMedio}
          novosClientes={novosClientes}
        />
        
        <div className="grid gap-4 md:grid-cols-2">
          <AppointmentsBarChart 
            data={mockWeekData} 
            periodo={periodo} 
            setPeriodo={setPeriodo} 
          />
          
          <RevenueLineChart 
            data={mockWeekData} 
            periodo={periodo} 
            setPeriodo={setPeriodo} 
          />
          
          <PopularServicesChart data={mockServicesData} />
        </div>
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberRelatorios;
