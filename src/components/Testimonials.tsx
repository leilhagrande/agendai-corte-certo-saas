
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "O AgendAi transformou completamente meu negócio de barbearia. Reduzi faltas em 75% e aumentei os agendamentos em 30%.",
    author: "Alexandre Silva",
    role: "Dono de Barbearia",
    rating: 5
  },
  {
    quote: "As sugestões de agendamento com IA me ajudaram a otimizar minha agenda como nunca antes. Agora estou atendendo 5 clientes a mais por semana.",
    author: "Miguel Costa",
    role: "Barbeiro Autônomo",
    rating: 5
  },
  {
    quote: "Como barbeiro, minha agenda costumava ser uma bagunça. Agora com o AgendAi, tudo funciona perfeitamente e meus clientes adoram a facilidade de agendamento.",
    author: "Eduardo Martins",
    role: "Barbeiro",
    rating: 5
  },
  {
    quote: "Os lembretes automáticos economizaram inúmeras horas de ligações telefônicas para minha barbearia. Melhor investimento para meu negócio este ano.",
    author: "Thomas Oliveira",
    role: "Gerente de Barbearia",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Amado por Barbeiros
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Não acredite apenas na nossa palavra. Veja o que nossos clientes têm a dizer.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">"{testimonial.quote}"</blockquote>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-medium text-primary">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
