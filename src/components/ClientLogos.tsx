import { Card } from "@/components/ui/card";

const ClientLogos = () => {
  const clients = [
    {
      name: "TechCorp International",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    },
    {
      name: "Innovation Labs",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
    },
    {
      name: "Global Finance Group",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
    },
    {
      name: "Marketing Association",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop",
    },
    {
      name: "MedTech Solutions",
      logo: "https://images.unsplash.com/photo-1635405074426-d9e210dc2edf?w=200&h=100&fit=crop",
    },
    {
      name: "Venture Capital Network",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-border/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy uppercase mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="font-body text-muted-foreground">
            Join 500+ organizations who trust digiOH for their digital events
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <Card 
              key={index} 
              className="p-6 border-0 shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-surface/30 flex items-center justify-center group"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="max-h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </Card>
          ))}
        </div>

        {/* Trust Metric */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-accent-gold/10 rounded-full">
            <span className="font-body text-navy font-semibold text-lg">
              🏆 <span className="font-heading uppercase">500+ successful events since 2015</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;