
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o sistema de agendamento?",
    answer: "O cliente acessa o site ou aplicativo da barbearia, escolhe o serviço desejado, seleciona o barbeiro de preferência, visualiza os horários disponíveis e confirma o agendamento. Tanto o cliente quanto a barbearia recebem confirmação imediata."
  },
  {
    question: "O AgendAi integra com o meu calendário atual?",
    answer: "Sim, o AgendAi se integra facilmente com Google Calendar, Microsoft Outlook e outros calendários populares, garantindo que todos os seus compromissos estejam sincronizados em todas as plataformas."
  },
  {
    question: "Como os clientes fazem o agendamento?",
    answer: "Os clientes podem agendar através da sua página personalizada de agendamento, que pode ser incorporada ao seu site ou compartilhada via link. Eles verão sua disponibilidade em tempo real e poderão selecionar horários convenientes."
  },
  {
    question: "E se eu precisar reagendar ou cancelar um horário?",
    answer: "Você pode facilmente reagendar ou cancelar horários pelo painel administrativo. O sistema notificará automaticamente o cliente sobre a mudança e, quando apropriado, sugerirá horários alternativos com base na sua disponibilidade."
  },
  {
    question: "Meus dados estão seguros no AgendAi?",
    answer: "Absolutamente. Utilizamos criptografia de nível bancário para proteger seus dados. Somos compatíveis com a LGPD e nunca compartilhamos suas informações com terceiros sem o seu consentimento explícito."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Perguntas Frequentes
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Encontre respostas para perguntas comuns sobre o AgendAi e como ele pode ajudar sua barbearia.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Ainda tem dúvidas? <a href="#contact" className="text-primary hover:underline">Entre em contato com nosso suporte</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
