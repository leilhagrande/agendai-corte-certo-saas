
import React, { useState, useRef, useEffect } from 'react';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';
import StatisticsSection from '@/components/reports/StatisticsSection';
import AppointmentsBarChart from '@/components/reports/AppointmentsBarChart';
import RevenueLineChart from '@/components/reports/RevenueLineChart';
import PopularServicesChart from '@/components/reports/PopularServicesChart';
import { mockWeekData, mockServicesData } from '@/utils/reportMockData';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format, subDays, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BarberRelatorios = () => {
  const { user } = useAuth();
  const [periodo, setPeriodo] = useState('semana');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(mockWeekData);
  const [servicesData, setServicesData] = useState(mockServicesData);
  const chartsContainerRef = useRef<HTMLDivElement>(null);
  
  // Calcula o total de atendimentos e receita
  const totalAtendimentos = reportData.reduce((acc, curr) => acc + curr.atendimentos, 0);
  const totalReceita = reportData.reduce((acc, curr) => acc + curr.receita, 0);
  const ticketMedio = totalAtendimentos > 0 ? totalReceita / totalAtendimentos : 0;
  const novosClientes = 14; // Mock data
  
  useEffect(() => {
    if (user?.id) {
      fetchReportData();
    }
  }, [periodo, user]);

  const fetchReportData = async () => {
    setLoading(true);
    
    // Determinar datas de início e fim com base no período
    const now = new Date();
    let startDate, endDate;
    
    switch(periodo) {
      case 'semana':
        startDate = startOfWeek(now, { locale: ptBR });
        endDate = endOfWeek(now, { locale: ptBR });
        break;
      case 'mes':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'trimestre':
        startDate = subMonths(now, 3);
        endDate = now;
        break;
      default:
        startDate = subDays(now, 7);
        endDate = now;
    }
    
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    
    try {
      // Aqui fariamos uma chamada real ao Supabase
      // Comentado porque não temos a função RPC configurada
      /*
      const { data, error } = await supabase
        .rpc('agendamentos_por_periodo', {
          barbeiro_id: user.id,
          data_inicio: formattedStartDate,
          data_fim: formattedEndDate
        });
      
      if (error) throw error;
      
      setReportData(data);
      */
      
      // Por enquanto usamos os dados mock
      // Em produção, substituir por dados reais do Supabase
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setLoading(false);
    }
  };
  
  const handleExportToPNG = () => {
    if (!chartsContainerRef.current) return;
    
    // Em uma aplicação real, usaríamos html2canvas ou uma biblioteca similar
    // para exportar o conteúdo como imagem
    console.log("Exportando gráficos como PNG...");
    alert("Funcionalidade de exportação simulada. Em um ambiente de produção, isso exportaria os gráficos como imagem PNG.");
  };
  
  return (
    <BarberDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground">Estatísticas e análise de desempenho da barbearia.</p>
          </div>
          
          <Button onClick={handleExportToPNG} variant="outline" className="gap-2">
            <Download size={16} />
            <span>Exportar relatório</span>
          </Button>
        </div>
        
        <StatisticsSection 
          totalAtendimentos={totalAtendimentos}
          totalReceita={totalReceita}
          ticketMedio={ticketMedio}
          novosClientes={novosClientes}
        />
        
        <div ref={chartsContainerRef} className="grid gap-4 md:grid-cols-2">
          <AppointmentsBarChart 
            data={reportData} 
            periodo={periodo} 
            setPeriodo={setPeriodo} 
          />
          
          <RevenueLineChart 
            data={reportData} 
            periodo={periodo} 
            setPeriodo={setPeriodo} 
          />
          
          <PopularServicesChart data={servicesData} />
        </div>
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberRelatorios;
