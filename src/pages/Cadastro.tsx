
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Cadastro = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic would go here
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
          <CardTitle className="text-2xl text-center">Cadastre-se</CardTitle>
          <CardDescription className="text-center">
            Crie sua conta para começar a usar o AgendAI
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome da Barbearia</label>
              <Input id="name" type="text" placeholder="Barbearia Exemplo" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirmar Senha</label>
              <Input id="confirm-password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Cadastrar</Button>
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Cadastro;
