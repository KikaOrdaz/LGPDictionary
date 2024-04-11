import { redirect } from '@sveltejs/kit';

export const load = async () => {
    redirect(301, '/manage');
};




/* import { supabase } from '$lib/supabaseClient.js';

export async function load() {
	const { data, error } = await supabase.from('signs').select();

	return {
		signs: data ?? []
	};
}
 */