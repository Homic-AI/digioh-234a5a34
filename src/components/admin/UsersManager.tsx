import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Shield, UserCheck } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: 'superadmin' | 'admin' | 'editor' | 'author';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

const UsersManager = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<Profile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'author':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
          Loading Users...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>
        <Button className="bg-accent-orange hover:bg-accent-gold text-white">
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="border-0 shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    User
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Joined
                  </th>
                  <th className="text-right py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">
                            {user.first_name?.[0] || user.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-body font-medium text-navy">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="font-body text-muted-foreground text-sm">
                            ID: {user.user_id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-body text-muted-foreground">
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full capitalize ${getRoleColor(user.role)}`}>
                        {user.role === 'superadmin' && <Shield className="w-3 h-3 mr-1" />}
                        {user.role === 'admin' && <UserCheck className="w-3 h-3 mr-1" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-body text-muted-foreground text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UsersManager;