import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yotteqfambnzrmrhhfat.supabase.co';  // Replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdHRlcWZhbWJuenJtcmhoZmF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NTA0NDEsImV4cCI6MjAyOTAyNjQ0MX0.oEKj64_yw-yp7xLI2lMdYRMBXzd-uKdAZJ1rQlCIX6c';  // Replace with your actual Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
