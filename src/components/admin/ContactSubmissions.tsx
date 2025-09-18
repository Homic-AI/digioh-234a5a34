import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Trash2, Mail, MessageSquare } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

const ContactSubmissions = () => {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async (): Promise<ContactSubmission[]> => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as ContactSubmission[];
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
          Loading Contact Submissions...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
            Contact Submissions
          </h1>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {submissions?.filter(s => s.status === 'new').length || 0} new submissions
          </span>
        </div>
      </div>

      {/* Submissions Table */}
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
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Message
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No contact submissions yet.
                    </td>
                  </tr>
                ) : (
                  submissions?.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-body font-medium text-navy">
                          {submission.name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-body text-muted-foreground">
                          <a 
                            href={`mailto:${submission.email}`}
                            className="text-primary-blue hover:underline"
                          >
                            {submission.email}
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-body text-muted-foreground">
                          {submission.company || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-body text-muted-foreground text-sm max-w-xs truncate">
                          {submission.message}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(submission.status)}`}>
                          {submission.status === 'new' && <MessageSquare className="w-3 h-3 mr-1" />}
                          {submission.status === 'replied' && <Mail className="w-3 h-3 mr-1" />}
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-body text-muted-foreground text-sm">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactSubmissions;