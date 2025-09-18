import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboardHome from "@/components/admin/AdminDashboardHome";
import ServicesManager from "@/components/admin/ServicesManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import TeamManager from "@/components/admin/TeamManager";
import ClientsManager from "@/components/admin/ClientsManager";
import BlogManager from "@/components/admin/BlogManager";
import UsersManager from "@/components/admin/UsersManager";
import ContactSubmissions from "@/components/admin/ContactSubmissions";

const AdminDashboard = () => {
  const { user, profile, loading } = useAuth();

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

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has admin access (editor or above)
  if (!['superadmin', 'admin', 'editor'].includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboardHome />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="team" element={<TeamManager />} />
        <Route path="clients" element={<ClientsManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="contact" element={<ContactSubmissions />} />
        {(profile.role === 'superadmin' || profile.role === 'admin') && (
          <Route path="users" element={<UsersManager />} />
        )}
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;