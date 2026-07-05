import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mxapgpjzxsncoqjxmlyj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YXBncGp6eHNuY29xanhtbHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNzc2NDcsImV4cCI6MjA5ODY1MzY0N30.c4YTZNShDst_8OnJ2EH9qfLX2pwHbzk8avBNY73BYQs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
