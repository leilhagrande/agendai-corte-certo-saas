
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI scheduling work?",
    answer: "Our AI analyzes your scheduling patterns, client preferences, and availability to suggest optimal appointment times. It learns over time to make increasingly accurate recommendations based on your business's specific needs."
  },
  {
    question: "Can I integrate AgendAI with my existing calendar?",
    answer: "Yes, AgendAI seamlessly integrates with Google Calendar, Microsoft Outlook, Apple Calendar, and other popular calendar applications. This ensures all your appointments are synced across platforms."
  },
  {
    question: "How do clients book appointments?",
    answer: "Clients can book through your personalized booking page, which can be embedded on your website or shared via a link. They'll see your real-time availability and can select convenient time slots."
  },
  {
    question: "What if I need to reschedule an appointment?",
    answer: "You can easily reschedule appointments through the dashboard. The system will automatically notify the client of the change and suggest alternative times based on your availability."
  },
  {
    question: "Is my data secure with AgendAI?",
    answer: "Absolutely. We use bank-level encryption to protect your data. We are GDPR compliant and never share your information with third parties without your explicit consent."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Find answers to common questions about AgendAI and how it can help your business.
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
            Still have questions? <a href="#contact" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
