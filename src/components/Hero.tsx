import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional digital event production setup with modern equipment and lighting" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-accent-gold/20 backdrop-blur-sm border border-accent-gold/30 mb-6"
          >
            <Star className="w-4 h-4 text-accent-gold mr-2" aria-hidden="true" />
            <span className="text-white font-body text-sm font-medium">500+ successful events since 2015</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-tight mb-6"
          >
            Digital Events
            <br />
            <span className="text-accent-gold">Redefined</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            We create unforgettable digital experiences that connect, engage, and inspire your audience through cutting-edge technology and creative excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-accent-gold hover:bg-accent-orange text-navy font-body font-semibold px-8 py-4 rounded-xl shadow-glow transition-all duration-300 hover:scale-105"
              aria-label="Start your digital event project"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white/10 font-body font-semibold px-8 py-4 rounded-xl backdrop-blur-sm"
              aria-label="Watch examples of our previous work"
            >
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Watch Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            role="region"
            aria-label="Company statistics"
          >
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent-gold" aria-label="500 plus events delivered">500+</div>
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
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        role="presentation"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;