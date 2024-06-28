<script lang="ts">
	import Plus from '../img/plus.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { toast } from "svelte-sonner";
	import { goto } from '$app/navigation';
	import { supabase } from "$lib/supabaseClient";
	import { Label } from "$lib/components/ui/label/index.js";
	
	export let database: any;
	
	let stroke = 'black';
	let open = false;
	let files: FileList
	let sign = {name :"", theme: [""], video:""}
	let error_upload = true


	function useToast(){

		open = false;
		if(error_upload){
			toast('Erro ao fazer upload', {
			action: {
				label: 'Ok',
				onClick: () => /* goto("/anotate") */goto("/manage")
			},})
		} else {
			toast('Upload bem-sucedido!', {
			action: {
				label: 'Ok',
				onClick: () => /* goto("/anotate") */goto("/manage")
			},})
		}
		
			
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
			console.log("Data: " + data)
			error_upload = false
		} else {
			console.log("Erro: " + error.message)
		}
	}

	async function insertSign(index: number) {
		
		let file = files[index]

		sign.video = await getVideoURL();

		if(sign.name == ""){
			sign.name = file.name.substring(0, file.name.lastIndexOf(".mp4"));
			sign.theme =  [""]
		}

		
		const { data, error } = await supabase
		.from('signs')
		.upsert([
			sign,
		])
		.select()

		
		
		if(data) {
			error_upload = false
			console.log("insertSign - Dataa: " + data)		
		} else {
			console.log("insertSign - Erro: " + error.message)
		}

	}


	async function  addVideos() {
		console.log("Na função addVideos")

		
		for (let i = 0; i < files.length; ++i){
			console.log("index: " +  i)
			uploadVideo(i)
			insertSign(i)
		}

	}

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
			<Dialog.Description>Tamanho máximo de 50 MB.</Dialog.Description>
		</Dialog.Header>
		<div class="w-fit items-center">
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Nome</Label>
						<!-- <Input id="name" placeholder="Nome da pasta" bind:value={folder.name}/> -->
					</div>
	
					<input type="file" bind:files multiple/>

				</div>
			</form>
		</div>
		
		
		<Dialog.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button variant="outline" type="submit" on:click={addVideos} on:click={useToast} >
				Upload
			</Button>
		</Dialog.Footer>
	</Dialog.Content>

</Dialog.Root>
