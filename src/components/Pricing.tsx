
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for freelancers and solo practitioners",
    features: [
      "50 appointments/month",
      "Email notifications",
      "Calendar integrations",
      "Client self-booking",
      "Basic reports"
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    price: "$29",
    description: "Ideal for growing businesses and small teams",
    features: [
      "Unlimited appointments",
      "SMS reminders",
      "Custom booking page",
      "Staff management",
      "Advanced analytics",
      "Priority support"
    ],
    popular: true,
    buttonText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "$79",
    description: "For large businesses with complex scheduling needs",
    features: [
      "Everything in Professional",
      "API access",
      "White labeling",
      "Multiple locations",
      "Advanced integrations",
      "Dedicated account manager"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the perfect plan for your business needs. No hidden fees.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col overflow-hidden rounded-lg border ${
                plan.popular ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="bg-primary py-1 text-center text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="flex flex-col space-y-6 bg-card p-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default Pricing;
