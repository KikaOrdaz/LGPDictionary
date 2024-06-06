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
	// let folder = {name :"", signs_id:[""]}


	function useToast(){

		open = false;
		toast('Upload bem-sucedido!', {
			action: {
				label: 'Anotar',
				onClick: () => /* goto("/anotate") */goto("/manage")
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

	async function uploadVideo(index: number) {
		let file = files[index]

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

	async function insertSign(index: number) {

		console.log("Na função insertSign")
		
		let file = files[index]

		sign.video = await getVideoURL();

		if(sign.name == ""){
			sign.name = file.name.substring(0, file.name.lastIndexOf(".mp4"));
			// sign.theme = folder.name
		}

		
		const { data, error } = await supabase
		.from('signs')
		.upsert([
			sign,
		])
		.select()
		
		
		if(data) {
			console.log("insertSign - Dataa: " + data[0].id + ": " + typeof data[0].id)
			//addFolder(data[0].id)
			let signId = data[0].id + ""
			/* if(folder.signs_id.length == 1){
				folder.signs_id[0] = signId
			} else {
				folder.signs_id.push(signId)
			} */
		} else {
			console.log("insertSign - Erro: " + error.message)
		}

	}


/* 	async function  addFolder() {
		console.log("Na função addFolder")

		
		for (let i = 0; i < files.length; ++i){
			console.log("index: " +  i)
			
			uploadVideo(i)
			insertSign(i)
		}
		
		
		if(folder.name == ""){
			
			let uploadNumber = database.folders.length + 1
			folder.name = "Upload "+uploadNumber
			console.log("uploadNumber: " + uploadNumber)
		}
		
		console.log("Add folder: " + folder)
		
		const { data, error } = await supabase
		.from('folders')
		.insert([
			folder
		])
		.select()
		
		if(data) {
			console.log("addFolder - Dataa: " + data)
		} else {
			console.log("addFolder - Erro: " + error)
		}

	} */

	// $: multiple = files.length > 1
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
				
							<input type="file" bind:files/>

						</div>
					</form>
				</Tabs.Content>
				<Tabs.Content value="folder">
					<form>
						<div class="grid w-full items-center gap-4">
							<!-- <div class="flex flex-col space-y-1.5">
								<Label for="name">Nome</Label>
								<Input id="name" placeholder="Nome da pasta" bind:value={folder.name}/>
							</div>
			 -->
							<input type="file" bind:files multiple/>

						</div>
					</form>
				</Tabs.Content>
			  </Tabs.Root>

			
		</div>
		
		
		<!-- <Dialog.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button variant="outline" type="submit" on:click={addFolder} on:click={useToast} >
				Upload
			</Button>
		</Dialog.Footer> -->
	</Dialog.Content>

</Dialog.Root>
