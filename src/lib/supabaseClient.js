import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://exvhkaqgrwffbtpuoyaf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmhrYXFncndmZmJ0cHVveWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNjkzNDksImV4cCI6MjAzNzY0NTM0OX0.dBI1EkMtjUaScgZU5_F4QprJMl2P1KZXEjnZvYtH4_I'
);
