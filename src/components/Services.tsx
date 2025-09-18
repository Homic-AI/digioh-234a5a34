import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Users, Camera, Headphones, Monitor, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Virtual Events",
      description: "High-quality virtual events with interactive features, live streaming, and audience engagement tools.",
      features: ["HD Live Streaming", "Interactive Q&A", "Breakout Rooms", "Analytics Dashboard"]
    },
    {
      icon: Camera,
      title: "Hybrid Solutions",
      description: "Seamlessly blend physical and digital experiences for maximum reach and engagement.",
      features: ["Multi-Camera Setup", "Real-time Interaction", "Remote Speakers", "Social Integration"]
    },
    {
      icon: Users,
      title: "Event Management",
      description: "End-to-end event planning and execution with dedicated project management.",
      features: ["Project Planning", "Vendor Coordination", "Timeline Management", "Risk Assessment"]
    },
    {
      icon: Headphones,
      title: "Audio/Visual Production",
      description: "Professional AV production services with cutting-edge equipment and expertise.",
      features: ["4K Video Production", "Professional Audio", "Lighting Design", "Stage Setup"]
    },
    {
      icon: Zap,
      title: "Digital Transformation",
      description: "Transform traditional events into dynamic digital experiences that captivate audiences.",
      features: ["Platform Development", "Custom Integrations", "Mobile Apps", "Cloud Solutions"]
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy uppercase">{service.title}</h3>
              </div>
              
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center font-body text-sm text-navy">
                    <div className="w-2 h-2 bg-accent-gold rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="ghost" className="w-full group-hover:bg-accent-gold/10 text-navy font-body font-semibold">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
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