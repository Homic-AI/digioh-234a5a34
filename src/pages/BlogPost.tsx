import { useParams, Navigate } from "react-router-dom";
import { useBlogPost } from "@/hooks/useBlog";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
              Loading...
            </h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-navy uppercase mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="font-body text-lg text-muted-foreground mb-8">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="font-body">
                By {post.profiles?.first_name} {post.profiles?.last_name}
              </span>
              <span className="font-body">
                {new Date(post.published_at!).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-2xl shadow-card"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="font-body text-lg leading-relaxed text-gray-800 prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:uppercase prose-headings:text-navy
                prose-a:text-primary-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-navy prose-blockquote:border-accent-orange
                prose-blockquote:bg-accent-orange/5 prose-blockquote:px-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;