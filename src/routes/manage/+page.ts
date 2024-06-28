import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: signsData } = await supabase.from("signs")
                                                .select()
                                                .order('theme', { ascending: true })
                                                .order('name', { ascending: true });


    return {
        signs: signsData ?? [],
    };
}

