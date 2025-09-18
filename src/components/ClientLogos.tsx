import { Card } from "@/components/ui/card";
import { useClientLogos } from "@/hooks/useClientLogos";

const ClientLogos = () => {
  const { data: clients, isLoading } = useClientLogos();

  if (isLoading) {
    return (
      <section className="py-16 bg-white border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy uppercase mb-4">
              Loading Client Logos...
            </h3>
          </div>
        </div>
      </section>
    );
  }

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
          {clients?.map((client) => (
            <Card 
              key={client.id} 
              className="p-6 border-0 shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-surface/30 flex items-center justify-center group"
            >
              <a 
                href={client.website_url || "#"}
                target={client.website_url ? "_blank" : undefined}
                rel={client.website_url ? "noopener noreferrer" : undefined}
                className="block"
              >
                <img
                  src={client.logo_url}
                  alt={`${client.name} logo`}
                  className="max-h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </a>
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