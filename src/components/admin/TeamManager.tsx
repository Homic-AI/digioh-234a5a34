import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/hooks/useTeam";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const TeamManager = () => {
  const { data: team, isLoading } = useTeam();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
          Loading Team...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
            Team Management
          </h1>
          <p className="text-muted-foreground">
            Manage your team members and their profiles.
          </p>
        </div>
        <Button className="bg-accent-orange hover:bg-accent-gold text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Table */}
      <Card className="border-0 shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Bio
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {team?.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {member.photo_url && (
                          <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div className="font-body font-medium text-navy">
                          {member.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-body text-muted-foreground">
                        {member.role}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-body text-muted-foreground text-sm max-w-xs truncate">
                        {member.bio || "No bio available"}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.is_active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {member.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
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

export default TeamManager;