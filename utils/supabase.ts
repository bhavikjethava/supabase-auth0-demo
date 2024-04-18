import { SupabaseClient, createClient } from "@supabase/supabase-js";

const getSupabase = () => {
  const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // {
    //   global: {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // }
  );

  return supabase;
};

export { getSupabase };
