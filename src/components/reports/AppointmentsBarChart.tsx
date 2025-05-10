
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import ChartTooltip from './ChartTooltip';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AppointmentsBarChartProps {
  data: Array<{ day: string; atendimentos: number; receita: number }>;
  periodo: string;
  setPeriodo: (value: string) => void;
}

const AppointmentsBarChart = ({ data, periodo, setPeriodo }: AppointmentsBarChartProps) => {
  return (
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
        <div className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
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
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="atendimentos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsBarChart;
