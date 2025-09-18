import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author_id: string;
  status: string;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }
      return data;
    },
  });
};