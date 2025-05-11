
import React from 'react';
import StatisticCard from './StatisticCard';

interface StatisticsSectionProps {
  totalAtendimentos: number;
  totalReceita: number;
  ticketMedio: number;
  novosClientes: number;
}

const StatisticsSection = ({ 
  totalAtendimentos, 
  totalReceita, 
  ticketMedio, 
  novosClientes 
}: StatisticsSectionProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatisticCard 
        title="Total de Atendimentos" 
        value={totalAtendimentos}
        description="+12% comparado à semana anterior"
      />
      <StatisticCard 
        title="Receita Total" 
        value={`R$ ${totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        description="+8% comparado à semana anterior"
      />
      <StatisticCard 
        title="Ticket Médio" 
        value={`R$ ${ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        description="-2% comparado à semana anterior"
      />
      <StatisticCard 
        title="Novos Clientes" 
        value={novosClientes}
        description="+5% comparado à semana anterior"
      />
    </div>
  );
};

export default StatisticsSection;
