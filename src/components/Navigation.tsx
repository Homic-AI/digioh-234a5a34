import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a 
              href="/"
              className="font-heading text-2xl font-bold text-navy tracking-wide focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
              aria-label="digiOH - Home"
            >
              digi<span className="text-accent-gold">OH</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="font-body text-sm font-medium text-navy hover:text-primary-blue transition-colors duration-200 relative group focus:outline-none focus:ring-2 focus:ring-primary-blue rounded px-2 py-1"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
              </motion.a>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-3 ml-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {profile && ['superadmin', 'admin', 'editor'].includes(profile.role) && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.location.href = '/admin'}
                      className="text-navy hover:text-primary-blue"
                      aria-label="Access admin dashboard"
                    >
                      Admin
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSignOut}
                    aria-label="Sign out of your account"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.location.href = '/auth'}
                    className="text-navy hover:text-primary-blue"
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    aria-label="Contact us by phone"
                  >
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    Call Now
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy hover:text-primary-blue transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
              aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-navy hover:text-primary-blue font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="px-3 py-2 space-y-2">
                  {user ? (
                    <div className="space-y-2">
                      {profile && ['superadmin', 'admin', 'editor'].includes(profile.role) && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setIsOpen(false);
                            window.location.href = '/admin';
                          }}
                        >
                          Admin Dashboard
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setIsOpen(false);
                          handleSignOut();
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setIsOpen(false);
                          window.location.href = '/auth';
                        }}
                      >
                        Sign In
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;