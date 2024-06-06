import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: signsData } = await supabase.from("signs").select();
    const { data: parametersData } = await supabase.from("parameters").select();


    return {
        signs: signsData ?? [],
        parameters: parametersData ?? []
    };
}
