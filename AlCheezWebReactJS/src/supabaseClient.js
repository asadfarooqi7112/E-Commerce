
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://vqvruapmkpjwdrrhnzfr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdnJ1YXBta3Bqd2RycmhuemZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzMzM3MTUsImV4cCI6MjAzNTkwOTcxNX0.oqhbTwHcsmsM_FbQSrdAs-bpN-wZ3UPXvIP3TCh5Fyg"

export const supabase = createClient(supabaseUrl, supabaseKey)