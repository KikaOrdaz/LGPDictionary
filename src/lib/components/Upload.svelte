<script lang="ts">
	import Plus from '../img/plus.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { toast } from "svelte-sonner";
	import { goto } from '$app/navigation';
	import { supabase } from "$lib/supabaseClient";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import * as Tabs from "$lib/components/ui/tabs";
	
	export let database: any;
	
	let stroke = 'black';
	let open = false;
	let files: FileList
	let sign = {name :"", theme:"", video:""}


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

	async function getVideoURL() {
		let file = files[0]

		const { data } = supabase
			.storage
			.from('Signs')
			.getPublicUrl(file.name)

		return data.publicUrl
	}

	async function uploadVideo() {
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
		
		uploadVideo()

		sign.video = await getVideoURL();

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
</script>

 

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button variant="outline">
			<Plus {stroke} />
		</Button> 
	</Dialog.Trigger>
	<Dialog.Content>

		<Dialog.Header>
			<Dialog.Title>Adicionar gesto(s)</Dialog.Title>
			<Dialog.Description>Fazer upload de um só gesto ou de uma pasta.</Dialog.Description>
		</Dialog.Header>
		<div class="w-fit items-center">
			<Tabs.Root value="sign" class="w-[400px]">
				<Tabs.List >
				  <Tabs.Trigger value="sign">Gesto</Tabs.Trigger>
				  <Tabs.Trigger value="folder">Pasta</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="sign">
					
			
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
							<Label for="name">Nome</Label>
							<Input id="name" placeholder="Nome do gesto" bind:value={sign.name}/>
							</div>
			
							<div class="flex flex-col space-y-1.5">
							<Label for="theme">Tema</Label>
							<Input id="theme" placeholder="Tema do gesto" bind:value={sign.theme}/>
							</div>
				
							<input type="file" bind:files />

						</div>
					</form>
				</Tabs.Content>
				<Tabs.Content value="folder">Change your password here.</Tabs.Content>
			  </Tabs.Root>

			
		</div>
		
		
		<Dialog.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button variant="outline" type="submit" on:click={insertRow} on:click={useToast} >
				Upload
			</Button>
		</Dialog.Footer>
	</Dialog.Content>

</Dialog.Root>
