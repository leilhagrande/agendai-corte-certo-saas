
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointment } from "@/contexts/AppointmentContext";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();
  const { userSubscription, plans } = useAppointment();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de atualização de perfil
    setTimeout(() => {
      toast.success("Perfil atualizado com sucesso!");
      setIsSubmitting(false);
    }, 1000);
  };

  // Buscar plano atual
  const currentPlan = plans.find(p => p.id === userSubscription?.planId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Seu Perfil</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações do perfil */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações de contato</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome</label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Plano */}
          <Card>
            <CardHeader>
              <CardTitle>Seu Plano</CardTitle>
              <CardDescription>Informações do seu plano atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentPlan && userSubscription ? (
                <>
                  <div>
                    <h3 className="font-semibold text-lg">{currentPlan.name}</h3>
                    <p className="text-muted-foreground">{currentPlan.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Preço</span>
                      <span className="font-medium">
                        {currentPlan.price === 0 
                          ? "Gratuito" 
                          : `R$ ${currentPlan.price},00/mês`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <span className="font-medium">
                        {userSubscription.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    
                    {currentPlan.appointmentLimit !== null && (
                      <div className="flex justify-between text-sm">
                        <span>Agendamentos utilizados</span>
                        <span className="font-medium">
                          {userSubscription.appointmentsUsed} de {currentPlan.appointmentLimit}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Recursos inclusos:</h4>
                    <ul className="space-y-1">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Nenhum plano ativo</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline">Gerenciar Plano</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
