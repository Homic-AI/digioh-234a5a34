import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useClientLogos = () => {
  return useQuery({
    queryKey: ["client-logos"],
    queryFn: async (): Promise<ClientLogo[]> => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};