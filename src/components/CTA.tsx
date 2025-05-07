
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Transform Your Scheduling Experience?
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            Join thousands of businesses that are saving time and delighting their clients with AgendAI.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-1">
              Start Your Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
    </section>
  );
};

export default CTA;
