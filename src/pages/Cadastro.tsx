
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Cadastro = () => {
  const [barbeariaName, setBarbeariaName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    
    setLoading(true);
    
    // Simulação de cadastro (em um ambiente real, isso seria uma chamada de API)
    setTimeout(() => {
      // Criar objeto do usuário
      const user = { 
        id: "1", 
        name: barbeariaName, 
        email 
      };
      
      // Salvar informações do usuário no localStorage
      localStorage.setItem("agendai_user", JSON.stringify(user));
      localStorage.setItem("agendai_authenticated", "true");
      
      // Notificar usuário
      toast.success("Cadastro realizado com sucesso!");
      
      // Redirecionar para a página inicial após o cadastro
      navigate("/");
      
      setLoading(false);
    }, 1500);
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
              <Input 
                id="name" 
                type="text" 
                placeholder="Barbearia Exemplo" 
                required
                value={barbeariaName}
                onChange={(e) => setBarbeariaName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirmar Senha</label>
              <Input 
                id="confirm-password" 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
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
