import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  description: string | null;
  category_id: string | null;
  project_date: string | null;
  images: string[] | null;
  videos: string[] | null;
  featured_image: string | null;
  is_featured: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  portfolio_categories?: PortfolioCategory;
}

export const usePortfolio = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["portfolio", categorySlug],
    queryFn: async (): Promise<Portfolio[]> => {
      let query = supabase
        .from("portfolio")
        .select(`
          *,
          portfolio_categories (
            id,
            name,
            slug,
            created_at
          )
        `)
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (categorySlug) {
        query = query.eq("portfolio_categories.slug", categorySlug);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
  });
};

export const usePortfolioItem = (slug: string) => {
  return useQuery({
    queryKey: ["portfolio-item", slug],
    queryFn: async (): Promise<Portfolio | null> => {
      const { data, error } = await supabase
        .from("portfolio")
        .select(`
          *,
          portfolio_categories (
            id,
            name,
            slug,
            created_at
          )
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }
      return data;
    },
  });
};

export const usePortfolioCategories = () => {
  return useQuery({
    queryKey: ["portfolio-categories"],
    queryFn: async (): Promise<PortfolioCategory[]> => {
      const { data, error } = await supabase
        .from("portfolio_categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};