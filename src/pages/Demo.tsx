
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Demo = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo request logic would go here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-bold text-white text-xl">AI</span>
              </div>
              <span className="font-bold text-2xl">AgendAI</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Agendar Demonstração</CardTitle>
          <CardDescription className="text-center">
            Preencha o formulário para agendar uma demonstração do AgendAI
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
              <Input id="name" type="text" placeholder="Seu nome" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
              <Input id="phone" type="tel" placeholder="(11) 99999-9999" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="business" className="text-sm font-medium">Nome da Barbearia</label>
              <Input id="business" type="text" placeholder="Barbearia Exemplo" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Mensagem (opcional)</label>
              <Textarea id="message" placeholder="Conte-nos um pouco sobre sua barbearia e suas necessidades" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Solicitar Demonstração</Button>
            <div className="text-center text-sm">
              Prefere criar uma conta agora?{" "}
              <Link to="/cadastro" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Demo;
