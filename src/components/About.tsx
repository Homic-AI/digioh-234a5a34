import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, Zap } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "10+ years in digital event production"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Technology innovation expert"
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Award-winning visual storyteller"
    },
    {
      name: "David Thompson",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Expert in large-scale event delivery"
    },
    {
      name: "Lisa Park",
      role: "Client Success Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      bio: "Dedicated to client satisfaction"
    },
    {
      name: "James Wilson",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      bio: "Streaming technology specialist"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is our priority. We listen, understand, and deliver."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Quality and attention to detail in every project we undertake."
    },
    {
      icon: Zap,
      title: "Agility",
      description: "Quick adaptation to changing needs and market demands."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-indigo/10 rounded-full mb-4">
            <span className="font-body text-sm font-semibold text-navy uppercase tracking-wider">About Us</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
            Our <span className="text-indigo">Story</span>
          </h2>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="font-heading text-3xl font-bold text-navy uppercase mb-6">
              Since 2015
            </h3>
            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>
                Founded in 2015, digiOH emerged from a simple vision: to transform how organizations connect with their audiences through digital technology. What started as a small team of passionate event professionals has grown into a leading digital event production company.
              </p>
              <p>
                We've successfully delivered over 500 events, reaching millions of participants worldwide. Our expertise spans virtual events, hybrid solutions, and cutting-edge digital experiences that engage, inform, and inspire.
              </p>
              <p>
                Today, we're proud to be trusted partners for organizations ranging from Fortune 500 companies to innovative startups, helping them achieve their goals through exceptional digital events.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 border-0 shadow-card bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-2">500+</div>
              <div className="font-body text-sm text-navy uppercase tracking-wider">Events Delivered</div>
            </Card>
            <Card className="p-6 border-0 shadow-card bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-heading font-bold text-primary-blue mb-2">9</div>
              <div className="font-body text-sm text-navy uppercase tracking-wider">Years Experience</div>
            </Card>
            <Card className="p-6 border-0 shadow-card bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-heading font-bold text-indigo mb-2">2M+</div>
              <div className="font-body text-sm text-navy uppercase tracking-wider">Participants Reached</div>
            </Card>
            <Card className="p-6 border-0 shadow-card bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-heading font-bold text-accent-orange mb-2">98%</div>
              <div className="font-body text-sm text-navy uppercase tracking-wider">Client Satisfaction</div>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="font-heading text-3xl font-bold text-navy uppercase text-center mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm text-center group">
                <div className="w-12 h-12 bg-gradient-indigo rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-heading text-lg font-bold text-navy uppercase mb-3">{value.title}</h4>
                <p className="font-body text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="font-heading text-3xl font-bold text-navy uppercase text-center mb-12">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h4 className="font-heading text-xl font-bold text-navy uppercase mb-1">{member.name}</h4>
                  <Badge variant="secondary" className="bg-accent-gold/10 text-accent-gold font-body text-xs mb-3">
                    {member.role}
                  </Badge>
                  <p className="font-body text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;