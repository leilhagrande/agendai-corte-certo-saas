
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "AgendAI has completely transformed my salon business. I've reduced no-shows by 75% and increased bookings by 30%.",
    author: "Sarah Johnson",
    role: "Hair Salon Owner",
    rating: 5
  },
  {
    quote: "The AI-powered scheduling suggestions have helped me optimize my calendar like never before. I'm now seeing 5 more clients weekly.",
    author: "Dr. Michael Chen",
    role: "Dentist",
    rating: 5
  },
  {
    quote: "As a massage therapist, my schedule used to be a mess. Now with AgendAI, everything runs smoothly and my clients love the easy booking process.",
    author: "Emma Rodriguez",
    role: "Massage Therapist",
    rating: 5
  },
  {
    quote: "The automated reminders have saved my small clinic countless hours of phone calls. Best investment for my practice this year.",
    author: "Thomas Wright",
    role: "Chiropractor",
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
              Loved by Businesses
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Don't take our word for it. Hear what our customers have to say.
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
