
import React from 'react';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors } from 'lucide-react';

const BarberServicos = () => {
  return (
    <BarberDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Serviços</h1>
          <p className="text-muted-foreground">Gerencie os serviços oferecidos pela sua barbearia.</p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Conteúdo em Desenvolvimento</CardTitle>
            <Scissors className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground pt-2">
              Esta página está em desenvolvimento. Em breve você poderá gerenciar todos os serviços da sua barbearia por aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberServicos;
