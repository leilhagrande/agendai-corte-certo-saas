
import React, { useState } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BarberDashboardLayout from '@/components/BarberDashboardLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockClientes = [
  { id: '1', nome: 'João Silva', telefone: '(11) 99999-8888', email: 'joao@email.com', ultimaVisita: '10/05/2025', totalGasto: 350 },
  { id: '2', nome: 'Pedro Costa', telefone: '(11) 99888-7777', email: 'pedro@email.com', ultimaVisita: '05/05/2025', totalGasto: 420 },
  { id: '3', nome: 'Carlos Eduardo', telefone: '(11) 98765-4321', email: 'carlos@email.com', ultimaVisita: '01/05/2025', totalGasto: 510 },
  { id: '4', nome: 'André Santos', telefone: '(11) 91234-5678', email: 'andre@email.com', ultimaVisita: '28/04/2025', totalGasto: 280 },
  { id: '5', nome: 'Lucas Mendes', telefone: '(11) 92222-3333', email: 'lucas@email.com', ultimaVisita: '25/04/2025', totalGasto: 640 },
  { id: '6', nome: 'Gabriel Oliveira', telefone: '(11) 93333-4444', email: 'gabriel@email.com', ultimaVisita: '20/04/2025', totalGasto: 190 },
];

const BarberClientes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = mockClientes.filter(
    cliente => cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
               cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               cliente.telefone.includes(searchTerm)
  );

  return (
    <BarberDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">Gerencie os clientes da barbearia.</p>
          </div>

          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar clientes..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" size="icon" className="shrink-0">
            <Filter size={18} />
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Telefone</TableHead>
                    <TableHead className="hidden md:table-cell">E-mail</TableHead>
                    <TableHead>Última Visita</TableHead>
                    <TableHead>Total Gasto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientes.map(cliente => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                      <TableCell className="hidden md:table-cell">{cliente.email}</TableCell>
                      <TableCell>{cliente.ultimaVisita}</TableCell>
                      <TableCell>R$ {cliente.totalGasto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
                <p className="text-2xl font-semibold">{mockClientes.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Novos este mês</p>
                <p className="text-2xl font-semibold">14</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Taxa de Retorno</p>
                <p className="text-2xl font-semibold">76%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BarberDashboardLayout>
  );
};

export default BarberClientes;
