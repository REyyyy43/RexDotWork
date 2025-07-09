import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmixistcfarkttenliij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaXhpc3RjZmFya3R0ZW51bGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzIxNDAsImV4cCI6MjA2NzQ0ODE0MH0.agwOaRVVjQxMawnC37GHzgV3F85MO8W0JZwqPW1HuwU';
 
export const supabase = createClient(supabaseUrl, supabaseKey); 