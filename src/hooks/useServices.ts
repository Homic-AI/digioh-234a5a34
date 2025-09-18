import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  gallery_images: string[] | null;
  is_featured: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useService = (slug: string) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: async (): Promise<Service | null> => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
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