<script lang="ts">
	import Plus from '../img/plus.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Folder from '../img/folder.svelte';
	import { toast } from "svelte-sonner";
	import { goto } from '$app/navigation';
	import { supabase } from "$lib/supabaseClient";
	import { createEventDispatcher } from 'svelte'
	
	let stroke = 'black';
	let open = false;
	let files: FileList



	function useToast(){

		open = false;
		toast('Upload bem-sucedido!', {
			action: {
				label: 'Anotar',
				onClick: () => goto("/anotate")
			},
			})
	}

	async function uploadImage(e: Event) {
		let file = files[0]

		const {data, error} = await supabase
			.storage
			.from("Signs")
			.upload(file.name, file)

		if(data) {
			console.log("Dataa: " + data)
		} else {
			console.log("Erro: " + error)
		}

	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button variant="outline">
			<Plus {stroke} />
		</Button> 
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				<div class="flex flex-row gap-2 py-2">
					<Folder /> Arrasta uma pasta/ficheiro
				</div>
			</Dialog.Title>
			<Dialog.Description>
	

				<input type="file" id="file-upload" name="file-upload" 
					bind:files
					on:change={(e) => uploadImage(e)}
				/>
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer> 
		<Button variant="outline" type="submit" on:click={useToast}>
			Upload
		</Button>



		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
