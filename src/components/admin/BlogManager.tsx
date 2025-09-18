import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogPosts } from "@/hooks/useBlog";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const BlogManager = () => {
  const { data: posts, isLoading } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
          Loading Blog Posts...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy uppercase mb-2">
            Blog Management
          </h1>
          <p className="text-muted-foreground">
            Manage your blog posts and articles.
          </p>
        </div>
        <Button className="bg-accent-orange hover:bg-accent-gold text-white">
          <Plus className="w-4 h-4 mr-2" />
          Write New Post
        </Button>
      </div>

      {/* Blog Posts Table */}
      <Card className="border-0 shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Author
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Published
                  </th>
                  <th className="text-left py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Tags
                  </th>
                  <th className="text-right py-3 px-4 font-heading text-sm font-bold text-navy uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No blog posts yet. Create your first post to get started.
                    </td>
                  </tr>
                ) : (
                  posts?.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-body font-medium text-navy">
                          {post.title}
                        </div>
                        {post.excerpt && (
                          <div className="font-body text-muted-foreground text-sm mt-1 max-w-xs truncate">
                            {post.excerpt}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-body text-muted-foreground">
                          {post.profiles?.first_name} {post.profiles?.last_name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                          post.status === 'published' 
                            ? "bg-green-100 text-green-800" 
                            : post.status === 'draft'
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-body text-muted-foreground text-sm">
                          {post.published_at 
                            ? new Date(post.published_at).toLocaleDateString()
                            : "Not published"
                          }
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags && post.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
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

export default BlogManager;