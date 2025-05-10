
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import ChartTooltip from './ChartTooltip';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RevenueLineChartProps {
  data: Array<{ day: string; atendimentos: number; receita: number }>;
  periodo: string;
  setPeriodo: (value: string) => void;
}

const RevenueLineChart = ({ data, periodo, setPeriodo }: RevenueLineChartProps) => {
  return (
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
        <div className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueLineChart;
