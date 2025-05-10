
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ChartTooltip from './ChartTooltip';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PopularServicesChartProps {
  data: Array<{ name: string; valor: number }>;
}

const PopularServicesChart = ({ data }: PopularServicesChartProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Serviços Mais Populares</CardTitle>
        <CardDescription>Distribuição de serviços por quantidade</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="aspect-auto h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis 
                dataKey="name" 
                type="category" 
                tickLine={false} 
                axisLine={false}
                width={150}
                fontSize={12}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularServicesChart;
