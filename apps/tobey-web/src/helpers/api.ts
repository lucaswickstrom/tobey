import { PostgrestClient } from "@supabase/postgrest-js";
import { createClient } from "@supabase/supabase-js";
import { createPostgrestProxy, schemas } from "@tobey/db";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
  },
});

export const postgrestClient = createPostgrestProxy(
  schemas,
  new PostgrestClient(`${SUPABASE_URL}/rest/v1`, {
    headers: { apikey: SUPABASE_ANON_KEY },
  }),
  supabaseClient
);
