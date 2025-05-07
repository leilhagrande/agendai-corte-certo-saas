
import React from 'react';
import { 
  Calendar,
  BrainCircuit,
  Bell,
  MessageSquare,
  LineChart,
  Smartphone
} from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart Scheduling",
    description: "AI-powered scheduling that automatically finds the best times for appointments based on your availability."
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "Intelligent Insights",
    description: "Get AI-powered insights about your scheduling patterns and client preferences."
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Automated Reminders",
    description: "Send customized reminders to reduce no-shows and keep your calendar fully booked."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Client Communications",
    description: "Seamless messaging to confirm details and answer questions before appointments."
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Business Analytics",
    description: "Track appointment trends, client retention, and revenue with detailed reports."
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Friendly",
    description: "Manage your schedule on the go with our responsive mobile application."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features for Your Business
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to streamline your appointment scheduling and grow your business.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start space-y-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
