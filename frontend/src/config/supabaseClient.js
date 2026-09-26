import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || supabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey;

let supabase = null;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.warn('Frontend Supabase client initialization warning:', error);
}

export { supabase };
