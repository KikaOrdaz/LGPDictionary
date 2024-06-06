import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: signsData } = await supabase.from("signs").select();

    return {
        signs: signsData ?? [],
    };
}

