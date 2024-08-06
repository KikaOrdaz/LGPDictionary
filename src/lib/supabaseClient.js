import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://exvhkaqgrwffbtpuoyaf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduY2dvdHRpaWp2amFnYnFwdXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzODE0NDcsImV4cCI6MjAyNjk1NzQ0N30.Z9zcq6V20q0dOumuxjm55XUyyK8VzCit4AMShCT9yyM'
);
