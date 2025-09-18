import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ExternalLink, Calendar, Users } from "lucide-react";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "virtual", label: "Virtual Events" },
    { id: "hybrid", label: "Hybrid Solutions" },
    { id: "corporate", label: "Corporate" },
    { id: "conference", label: "Conferences" }
  ];

  const projects = [
    {
      id: 1,
      title: "Global Tech Summit 2024",
      client: "TechCorp International",
      category: "hybrid",
      date: "March 2024",
      attendees: "5,000+",
      description: "Multi-day hybrid conference with 50+ speakers across 3 continents",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      tags: ["Hybrid", "Live Streaming", "Multi-Language"],
      results: "98% satisfaction rate, 2M+ online views"
    },
    {
      id: 2,
      title: "Virtual Product Launch",
      client: "Innovation Labs",
      category: "virtual",
      date: "February 2024",
      attendees: "10,000+",
      description: "Interactive virtual product launch with 3D demonstrations and real-time Q&A",
      image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop",
      tags: ["Virtual", "3D Demos", "Interactive"],
      results: "45% increase in product inquiries"
    },
    {
      id: 3,
      title: "Annual Corporate Meeting",
      client: "Global Finance Group",
      category: "corporate",
      date: "January 2024",
      attendees: "2,500+",
      description: "Executive leadership meeting with secure streaming and breakout sessions",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      tags: ["Corporate", "Secure", "Executive"],
      results: "100% executive attendance"
    },
    {
      id: 4,
      title: "Digital Marketing Conference",
      client: "Marketing Association",
      category: "conference",
      date: "December 2023",
      attendees: "8,000+",
      description: "Three-day virtual conference with networking lounges and sponsor exhibitions",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      tags: ["Conference", "Networking", "Exhibitions"],
      results: "85% networking engagement"
    },
    {
      id: 5,
      title: "Healthcare Innovation Summit",
      client: "MedTech Solutions",
      category: "hybrid",
      date: "November 2023",
      attendees: "3,500+",
      description: "Hybrid medical conference with live surgery broadcasts and expert panels",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      tags: ["Healthcare", "Live Broadcast", "Expert Panels"],
      results: "200+ medical professionals certified"
    },
    {
      id: 6,
      title: "Startup Pitch Competition",
      client: "Venture Capital Network",
      category: "virtual",
      date: "October 2023",
      attendees: "1,200+",
      description: "Virtual pitch competition with live voting and investor networking",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
      tags: ["Startups", "Competition", "Investor Network"],
      results: "$2M+ in funding secured"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-blue/10 rounded-full mb-4">
            <span className="font-body text-sm font-semibold text-navy uppercase tracking-wider">Our Portfolio</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
            Success <span className="text-primary-blue">Stories</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped organizations worldwide create memorable digital experiences that drive results.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => setFilter(category.id)}
              className={`font-body font-medium px-6 py-2 rounded-full transition-all duration-300 ${
                filter === category.id
                  ? "bg-primary-blue text-white shadow-md"
                  : "text-navy hover:bg-primary-blue/10 border-primary-blue/20"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="group overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-accent-gold/10 text-navy">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-heading text-xl font-bold text-navy uppercase mb-2 group-hover:text-primary-blue transition-colors">
                  {project.title}
                </h3>
                
                <p className="font-body text-sm text-accent-gold font-medium mb-2">
                  {project.client}
                </p>

                <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.date}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.attendees}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-surface/50 rounded-lg p-3">
                  <p className="font-body text-xs font-medium text-navy">
                    <span className="text-accent-gold">Results:</span> {project.results}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="font-body font-semibold px-8 py-4 border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;