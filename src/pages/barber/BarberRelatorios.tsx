
import React, { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';

const generateWeekDays = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startDate, i);
    return format(day, 'EEE', { locale: ptBR });
  });
};

const weekDays = generateWeekDays();

const mockWeekData = [
  { day: weekDays[0], atendimentos: 8, receita: 320 },
  { day: weekDays[1], atendimentos: 12, receita: 480 },
  { day: weekDays[2], atendimentos: 10, receita: 400 },
  { day: weekDays[3], atendimentos: 15, receita: 600 },
  { day: weekDays[4], atendimentos: 18, receita: 720 },
  { day: weekDays[5], atendimentos: 20, receita: 800 },
  { day: weekDays[6], atendimentos: 5, receita: 200 },
];

const mockServicesData = [
  { name: 'Corte de Cabelo', valor: 40 },
  { name: 'Barba', valor: 25 },
  { name: 'Corte e Barba', valor: 30 },
  { name: 'Degradê', valor: 20 },
  { name: 'Tintura', valor: 10 },
];

const BarberRelatorios = () => {
  const [periodo, setPeriodo] = useState('semana');
  
  // Calcula o total de atendimentos e receita
  const totalAtendimentos = mockWeekData.reduce((acc, curr) => acc + curr.atendimentos, 0);
  const totalReceita = mockWeekData.reduce((acc, curr) => acc + curr.receita, 0);
  
  return (
    <BarberDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Estatísticas e análise de desempenho da barbearia.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Atendimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAtendimentos}</div>
              <p className="text-xs text-muted-foreground">
                +12% comparado à semana anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Receita Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalReceita}</div>
              <p className="text-xs text-muted-foreground">
                +8% comparado à semana anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Ticket Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {(totalReceita / totalAtendimentos).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                -2% comparado à semana anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Novos Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">
                +5% comparado à semana anterior
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Atendimentos</CardTitle>
                <CardDescription>Número de atendimentos por dia</CardDescription>
              </div>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Esta semana</SelectItem>
                  <SelectItem value="mes">Este mês</SelectItem>
                  <SelectItem value="trimestre">Último trimestre</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer 
                config={{
                  atendimentos: { label: 'Atendimentos', color: 'hsl(var(--primary))' }
                }} 
                className="aspect-[4/3]"
              >
                <ResponsiveContainer>
                  <BarChart data={mockWeekData}>
                    <XAxis 
                      dataKey="day" 
                      tickLine={false} 
                      axisLine={false} 
                      fontSize={12}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <ChartTooltip
                      content={(props) => (
                        <ChartTooltipContent 
                          {...props}
                          formatter={(value) => [value, 'Atendimentos']}
                          labelFormatter={(label) => `${label}`}
                        />
                      )}
                    />
                    <Bar dataKey="atendimentos" fill="var(--color-atendimentos)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <ChartLegend>
                  <ChartLegendContent />
                </ChartLegend>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Receita</CardTitle>
                <CardDescription>Receita diária (R$)</CardDescription>
              </div>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Esta semana</SelectItem>
                  <SelectItem value="mes">Este mês</SelectItem>
                  <SelectItem value="trimestre">Último trimestre</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer 
                config={{
                  receita: { label: 'Receita', color: 'rgb(34, 197, 94)' }
                }} 
                className="aspect-[4/3]"
              >
                <ResponsiveContainer>
                  <LineChart data={mockWeekData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      tickLine={false} 
                      axisLine={false} 
                      fontSize={12}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <ChartTooltip
                      content={(props) => (
                        <ChartTooltipContent 
                          {...props}
                          formatter={(value) => [`R$ ${value}`, 'Receita']}
                          labelFormatter={(label) => `${label}`}
                        />
                      )}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="receita" 
                      stroke="rgb(34, 197, 94)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <ChartLegend>
                  <ChartLegendContent />
                </ChartLegend>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Serviços Mais Populares</CardTitle>
              <CardDescription>Distribuição de serviços por quantidade</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer 
                config={{
                  valor: { label: 'Quantidade', color: 'hsl(var(--primary))' }
                }} 
                className="aspect-auto h-80"
              >
                <ResponsiveContainer>
                  <BarChart data={mockServicesData} layout="vertical">
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tickLine={false} 
                      axisLine={false}
                      width={150}
                      fontSize={12}
                    />
                    <ChartTooltip
                      content={(props) => (
                        <ChartTooltipContent 
                          {...props}
                          formatter={(value, name) => [value, 'Quantidade']}
                        />
                      )}
                    />
                    <Bar dataKey="valor" fill="var(--color-valor)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <ChartLegend>
                  <ChartLegendContent />
                </ChartLegend>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberRelatorios;
