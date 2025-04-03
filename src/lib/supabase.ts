import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'example-key';

// Log warning in development but don't crash the app
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using fallback values. Authentication functionality will be limited to local storage mode.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);