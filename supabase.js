const SUPABASE_URL =
    "https://pjtykdhirfvayuddlcrv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_F0-WoSdZ60sMq2X8OjcTjg_ii2iDVJo";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

console.log("SUPABASE CARGADO");
console.log(supabaseClient);