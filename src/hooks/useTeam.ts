import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  bio: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTeam = () => {
  return useQuery({
    queryKey: ["team"],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};