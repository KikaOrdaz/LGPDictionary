<script lang="ts">
	import Plus from '../img/plus.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Folder from '../img/folder.svelte';
	import Sonner from './ui/sonner/sonner.svelte';
	import { Toaster } from './ui/sonner';
	import { toast } from "svelte-sonner";
	import DialogContent from './ui/dialog/dialog-content.svelte';
	import { goto } from '$app/navigation';
	
	let stroke = 'black';
	let importName: string = "test";

	let open = false;

	function useToast(){
		console.log("toooaaast")
		open = false;
		toast('Upload bem-sucedido!', {
			action: {
				label: 'Anotar',
				onClick: () => goto("/anotate")
			},
			})
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
				<input type="file" id="file-upload" name="file-upload"/>
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer> 
		<Button variant="outline" type="submit" on:click={useToast}>
			Upload
		</Button>



		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
