import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { motion } from "framer-motion";
import { useState } from "react";

const Services = () => {
  const { data: services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent-orange/10 rounded-full mb-4">
              <span className="font-body text-sm font-semibold text-navy uppercase tracking-wider">Loading Services...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !services) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent-gold/10 rounded-full mb-4">
            <span className="font-body text-sm font-semibold text-navy uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
            What We <span className="text-accent-gold">Deliver</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to execution, we provide comprehensive digital event solutions that exceed expectations and deliver measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.Star;
            return (
              <Card 
                key={service.id} 
                className="p-8 border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-white group"
              >
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-heading text-xl font-bold text-navy uppercase mb-4 group-hover:text-primary-blue transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="font-body text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white">
            <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-4">
              Ready to Transform Your Event?
            </h3>
            <p className="font-body text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create a customized solution that delivers exceptional results.
            </p>
            <Button size="lg" className="bg-accent-gold hover:bg-accent-orange text-navy font-body font-semibold px-8 py-4 rounded-xl">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;