import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional digital event production setup" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-gold/20 backdrop-blur-sm border border-accent-gold/30 mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-accent-gold mr-2" />
            <span className="text-white font-body text-sm font-medium">500+ successful events since 2015</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-tight mb-6 animate-slide-up">
            Digital Events
            <br />
            <span className="text-accent-gold">Redefined</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            We create unforgettable digital experiences that connect, engage, and inspire your audience through cutting-edge technology and creative excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button size="lg" className="bg-accent-gold hover:bg-accent-orange text-navy font-body font-semibold px-8 py-4 rounded-xl shadow-glow transition-all duration-300 hover:scale-105">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-body font-semibold px-8 py-4 rounded-xl backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Watch Our Work
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in">
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent-gold">500+</div>
              <div className="font-body text-white/80 text-sm uppercase tracking-wider">Events Delivered</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent-gold">9</div>
              <div className="font-body text-white/80 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent-gold">100%</div>
              <div className="font-body text-white/80 text-sm uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent-gold">24/7</div>
              <div className="font-body text-white/80 text-sm uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;