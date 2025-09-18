import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClientLogos } from "@/hooks/useClientLogos";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const ClientsManager = () => {
  const { data: clients, isLoading } = useClientLogos();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
          Loading Clients...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
            Clients Management
          </h1>
          <p className="text-muted-foreground">
            Manage your client logos and partnerships.
          </p>
        </div>
        <Button className="bg-accent-orange hover:bg-accent-gold text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Clients Table */}
      <Card className="border-0 shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Logo
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Website
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
                {clients?.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        className="w-16 h-8 object-contain"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-body font-medium text-navy">
                        {client.name}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-body text-muted-foreground">
                        {client.website_url ? (
                          <a 
                            href={client.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-blue hover:underline"
                          >
                            Visit Website
                          </a>
                        ) : (
                          "No website"
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.is_active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {client.is_active ? "Active" : "Inactive"}
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

export default ClientsManager;