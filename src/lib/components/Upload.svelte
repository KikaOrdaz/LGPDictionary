<script lang="ts">
	import Plus from '../img/plus.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Folder from '../img/folder.svelte';
	import { toast } from "svelte-sonner";
	import { goto } from '$app/navigation';
	import { supabase } from "$lib/supabaseClient";
	import { createEventDispatcher } from 'svelte'
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
   
	const frameworks = [
	  {
		value: "sveltekit",
		label: "SvelteKit"
	  },
	  {
		value: "next",
		label: "Next.js"
	  },
	  {
		value: "astro",
		label: "Astro"
	  },
	  {
		value: "nuxt",
		label: "Nuxt.js"
	  }
	];
	
	export let database: any;

	let stroke = 'black';
	let open = false;
	let files: FileList


	function delay(ms: number) {
    	return new Promise( resolve => setTimeout(resolve, ms) );
	}

	function useToast(){

		open = false;
		toast('Upload bem-sucedido!', {
			action: {
				label: 'Anotar',
				onClick: () => goto("/anotate")
			},
			})
			
	}

	function getSignByName(name : any) {
    	return database.signs.find((item: { name: any; }) => item.name === name);
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
			console.log("Erro: " + error.message)
		}
	}

	async function insertRow() {
		
		const { data, error } = await supabase
		.from('signs')
		.upsert([
			sign,
		])
		.select()
		
		
		if(data) {
			console.log("Dataa: " + data[0].id + ": " + typeof data[0].id)


			
			addFolder(data[0].id)
		} else {
			console.log("Erro: " + error.message)
		}
	}

	async function  addFolder(file_id :any) {
		let uploadNumber = database.folders.length + 1
		let signId = [file_id + ""]

		console.log("uploadNumber: " + uploadNumber)
		console.log("signId: " + signId)
		const { data, error } = await supabase
		.from('folders')
		.insert([
			{name: "Upload "+uploadNumber, signs_id: signId},
		])
		.select()
		
		if(data) {
			console.log("Dataa: " + data)
		} else {
			console.log("Erro: " + error)
		}

	}

	let sign = {name :"", theme:""}


</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button variant="outline">
			<Plus {stroke} />
		</Button> 
	</Dialog.Trigger>
	<Dialog.Content>
		<!--<Dialog.Header>
			<Dialog.Title>
				<div class="flex flex-row gap-2 py-2">
					<Folder /> Arrasta uma pasta/ficheiro
				</div>
			</Dialog.Title>
			<Dialog.Description>
	

				
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer> 
		
		</Dialog.Footer>
		-->
		<Dialog.Header>
			<Dialog.Title>Adicionar um gesto</Dialog.Title>
			<Dialog.Description>Fazer upload de um só gesto.</Dialog.Description>
		</Dialog.Header>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
				<Label for="name">Nome</Label>
				<Input id="name" placeholder="Nome do gesto" bind:value={sign.name}/>
				</div>

				<div class="flex flex-col space-y-1.5">
				<Label for="theme">Tema</Label>
				<Input id="theme" placeholder="Name of your project" bind:value={sign.theme}/>
				</div>

				<!-- <Input id="file-upload" type="file" name="file-upload" 
					on:change={(e) => uploadImage(e)}
				/> -->

				<Input id="file-upload" type="file" name="file-upload"/>
			</div>
		</form>
		<Dialog.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button variant="outline" type="submit" on:click={useToast} on:click={insertRow}>
				Upload
			</Button>
		</Dialog.Footer>
	</Dialog.Content>

</Dialog.Root>
