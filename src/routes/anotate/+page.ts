import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: signsData } = await supabase.from("signs").select();
    const { data: foldersData } = await supabase.from("folders").select();
    const { data: parametersData } = await supabase.from("parameters").select();


    return {
        signs: signsData ?? [],
        folders: foldersData ?? [],
        parameters: parametersData ?? []
    };
}
