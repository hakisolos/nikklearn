import { createClient } from "@supabase/supabase-js";
const DBURL = String(process.env.PROJECTURL)
const anon =  String( process.env.ANONKEY)
export const db = createClient(DBURL, anon)

