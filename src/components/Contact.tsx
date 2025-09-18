import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@digioh.com",
      action: "mailto:hello@digioh.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "123 Digital Avenue, Tech City, TC 12345",
      action: "#"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "Chat with us instantly",
      action: "https://wa.me/15551234567"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent-orange/10 rounded-full mb-4">
            <span className="font-body text-sm font-semibold text-navy uppercase tracking-wider">Contact Us</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
            Let's <span className="text-accent-orange">Connect</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to create something amazing? Get in touch and let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 border-0 shadow-card">
            <h3 className="font-heading text-2xl font-bold text-navy uppercase mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-medium text-navy mb-2 block">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="border-muted-foreground/20 focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-navy mb-2 block">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="border-muted-foreground/20 focus:border-primary-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="font-body text-sm font-medium text-navy mb-2 block">
                  Company/Organization
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="border-muted-foreground/20 focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-navy mb-2 block">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  rows={6}
                  required
                  className="border-muted-foreground/20 focus:border-primary-blue resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-accent-orange hover:bg-accent-gold text-white font-body font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-glow"
              >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy uppercase mb-6">
                Get in Touch
              </h3>
              <p className="font-body text-muted-foreground mb-8">
                We're here to help you create exceptional digital experiences. Reach out through any of the channels below, and our team will respond promptly.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 border-0 shadow-sm hover:shadow-card transition-all duration-300 cursor-pointer group">
                  <a href={info.action} className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-navy mb-1">{info.title}</h4>
                      <p className="font-body text-muted-foreground text-sm">{info.value}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Card className="p-6 bg-gradient-accent text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold uppercase mb-2">
                    Need Immediate Help?
                  </h4>
                  <p className="font-body text-sm opacity-90">
                    Chat with us on WhatsApp for instant support
                  </p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => window.open("https://wa.me/15551234567", "_blank")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat Now
                </Button>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="overflow-hidden border-0 shadow-card">
              <div className="h-64 bg-gradient-subtle flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-body text-muted-foreground">Interactive Map</p>
                  <p className="font-body text-sm text-muted-foreground">
                    123 Digital Avenue, Tech City, TC 12345
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;