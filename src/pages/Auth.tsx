import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // Redirect if already authenticated
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(
        signupData.email,
        signupData.password,
        {
          first_name: signupData.firstName,
          last_name: signupData.lastName,
        }
      );

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-card">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
            digiOH
          </h1>
          <p className="font-body text-muted-foreground">
            Access your account
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-body text-sm font-medium text-navy mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="border-muted-foreground/20 focus:border-primary-blue"
                />
              </div>
              
              <div>
                <label className="font-body text-sm font-medium text-navy mb-2 block">
                  Password
                </label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="border-muted-foreground/20 focus:border-primary-blue"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent-orange hover:bg-accent-gold text-white font-body font-semibold py-3 rounded-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-medium text-navy mb-2 block">
                    First Name
                  </label>
                  <Input
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                    placeholder="John"
                    className="border-muted-foreground/20 focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-navy mb-2 block">
                    Last Name
                  </label>
                  <Input
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="border-muted-foreground/20 focus:border-primary-blue"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-navy mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="border-muted-foreground/20 focus:border-primary-blue"
                />
              </div>
              
              <div>
                <label className="font-body text-sm font-medium text-navy mb-2 block">
                  Password
                </label>
                <Input
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="border-muted-foreground/20 focus:border-primary-blue"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent-orange hover:bg-accent-gold text-white font-body font-semibold py-3 rounded-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;