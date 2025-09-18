import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Briefcase, 
  FolderOpen, 
  Users, 
  Building2, 
  PenTool, 
  Mail,
  Eye,
  MessageSquare
} from "lucide-react";

const AdminDashboardHome = () => {
  // Fetch dashboard statistics
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [
        servicesResult,
        portfolioResult,
        teamResult,
        clientsResult,
        blogResult,
        contactResult
      ] = await Promise.all([
        supabase.from("services").select("id", { count: "exact" }),
        supabase.from("portfolio").select("id", { count: "exact" }),
        supabase.from("team_members").select("id", { count: "exact" }),
        supabase.from("client_logos").select("id", { count: "exact" }),
        supabase.from("blog_posts").select("id", { count: "exact" }),
        supabase.from("contact_submissions").select("id", { count: "exact" }),
      ]);

      return {
        services: servicesResult.count || 0,
        portfolio: portfolioResult.count || 0,
        team: teamResult.count || 0,
        clients: clientsResult.count || 0,
        blog: blogResult.count || 0,
        contact: contactResult.count || 0,
      };
    },
  });

  const statsCards = [
    { 
      title: "Services", 
      value: stats?.services || 0, 
      icon: Briefcase, 
      color: "bg-blue-500" 
    },
    { 
      title: "Portfolio Items", 
      value: stats?.portfolio || 0, 
      icon: FolderOpen, 
      color: "bg-green-500" 
    },
    { 
      title: "Team Members", 
      value: stats?.team || 0, 
      icon: Users, 
      color: "bg-purple-500" 
    },
    { 
      title: "Client Logos", 
      value: stats?.clients || 0, 
      icon: Building2, 
      color: "bg-orange-500" 
    },
    { 
      title: "Blog Posts", 
      value: stats?.blog || 0, 
      icon: PenTool, 
      color: "bg-indigo-500" 
    },
    { 
      title: "Contact Submissions", 
      value: stats?.contact || 0, 
      icon: Mail, 
      color: "bg-red-500" 
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome to the digiOH admin panel. Here's a quick overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 border-0 shadow-sm">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-navy">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-navy uppercase mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="font-body text-sm">Add New Service</span>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-body text-sm">Create Portfolio Item</span>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-body text-sm">Write Blog Post</span>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-body text-sm">Add Team Member</span>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-navy uppercase mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center py-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground mr-3" />
              <span className="font-body text-sm">New contact submission received</span>
            </div>
            <div className="flex items-center py-2">
              <PenTool className="w-4 h-4 text-muted-foreground mr-3" />
              <span className="font-body text-sm">Blog post published</span>
            </div>
            <div className="flex items-center py-2">
              <FolderOpen className="w-4 h-4 text-muted-foreground mr-3" />
              <span className="font-body text-sm">Portfolio item updated</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardHome;