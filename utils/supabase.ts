import dbConnection from "@/configs/db";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from "@/types/supabase";
export const supabase = createClient<Database>(
  dbConnection.supabaseUrl!,
  dbConnection.supabaseKey!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
