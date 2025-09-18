import { useBlogPosts } from "@/hooks/useBlog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BlogList = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
              Loading Blog Posts...
            </h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
              Error Loading Blog
            </h1>
            <p className="font-body text-muted-foreground">
              Unable to load blog posts. Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent-orange/10 rounded-full mb-4">
              <span className="font-body text-sm font-semibold text-navy uppercase tracking-wider">Blog</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
              Latest <span className="text-accent-orange">Insights</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights from the world of digital marketing and event management.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group">
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <h3 className="font-heading text-xl font-bold text-navy uppercase mb-3 group-hover:text-primary-blue transition-colors duration-300">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    {post.excerpt && (
                      <p className="font-body text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-body">
                        {post.profiles?.first_name} {post.profiles?.last_name}
                      </span>
                      <span className="font-body">
                        {new Date(post.published_at!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="font-heading text-2xl font-bold text-navy uppercase mb-4">
                No Blog Posts Yet
              </h3>
              <p className="font-body text-muted-foreground">
                Check back soon for our latest insights and updates.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogList;