<script>
	import '../app.pcss';
	import { supabase } from  "../lib/supabaseClient.js"
	import { Toaster } from "$lib/components/ui/sonner"

	console.log(supabase)
</script>

<slot />
<Toaster />
