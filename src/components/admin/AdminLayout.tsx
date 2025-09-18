import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  Users,
  Building2,
  PenTool,
  Mail,
  Settings,
  LogOut,
  UserCog
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { profile, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Portfolio", href: "/admin/portfolio", icon: FolderOpen },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Clients", href: "/admin/clients", icon: Building2 },
    { name: "Blog", href: "/admin/blog", icon: PenTool },
    { name: "Contact", href: "/admin/contact", icon: Mail },
  ];

  // Add Users management for superadmin and admin
  if (profile?.role === 'superadmin' || profile?.role === 'admin') {
    navigation.push({ name: "Users", href: "/admin/users", icon: UserCog });
  }

  const isActivePath = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <h1 className="font-heading text-2xl font-bold text-navy uppercase">
              digiOH
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
        </div>

        <nav className="px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActivePath(item.href)
                      ? "bg-accent-orange/10 text-accent-orange"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {profile?.first_name?.[0] || profile?.email[0].toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-navy uppercase">
              {navigation.find(item => isActivePath(item.href))?.name || "Dashboard"}
            </h2>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;