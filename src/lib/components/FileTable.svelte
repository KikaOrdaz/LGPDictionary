<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import PencilCircleFill from '$lib/img/pencil_circle_fill.svelte';
	import { goto } from '$app/navigation';
	import { supabase } from "$lib/supabaseClient";
	import { writable } from 'svelte/store';
	import Button from './ui/button/button.svelte';
	import CheckmarkCircle from '$lib/img/checkmark_circle.svelte';
	import CheckmarkCircleFill from '$lib/img/checkmark_circle_fill.svelte';

	
	export let data: any;

	export let theme_options: any;
	export let anotation_options: any;
	export let selection : boolean;
	export let signs_to_delete : number[];

	let ordered_data = writable(data.signs);

	function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }

	  
	function themeShown(themeName : string[], options : any) : boolean{

		let themeValue = false

		options.forEach((option : any) => {
			if(themeName.includes(option.name)){
				themeValue = themeValue || option.show
			}
		})

		return themeValue
	}

	function anotationShown(anotation : number, options : any) : boolean{

		let anotationValue = false
		let anotation_name = "Por anotar"

		if(anotation == 1){
			anotation_name = "Anotação não terminada"
		} else if(anotation == 2){
			anotation_name = "Anotados"
		}
 	
 	
		options.forEach((option : any) => {
			if(anotation_name == option.name){
				anotationValue = anotationValue || option.show
			}
		})

		return anotationValue
	}

	async function orderByLastChange() {
		
		const { data, error } = await supabase
		.from('signs')
		.select('last_changed')
		.order('last_changed', { ascending: false })

		if(data){
			ordered_data.set(data);
		} else {
			console.log(error)
		}
		
	}

	async function orderByUpload(params: any) {

		const { data, error } = await supabase
		.from('signs')
		.select('created_at')
		.order('created_at', { ascending: false })

		if(data){
			ordered_data.set(data);
		} else {
			console.log(error)
		}
		
		
	}

	async function orderByState(params: any) {
		const { data, error } = await supabase
		.from('signs')
		.select('is_anotated')
		.order('is_anotated', { ascending: false })

		if(data){
			ordered_data.set(data);
		} else {
			console.log(error)
		}
		
		
	}

	async function orderByAlphabet() {
		const { data, error } = await supabase
		.from('signs')
		.select('name')
		.order('name', { ascending: false })

		if(data){
			ordered_data.set(data);
		} else {
			console.log(error)
		}
		
	}

	function selectSigns(sign_id : number){
		let sign = getSignById(sign_id)

		if(sign.selected){
			signs_to_delete.push(sign_id)
		} else {
			const index = signs_to_delete.indexOf(sign_id, 0);
			if (index > -1) {
				signs_to_delete.splice(index, 1);
			}
		}
	}


</script>

<div class="px-10">
	
	<Table.Root>
		<Table.Header>
			<Table.Row>
<!-- 			  <Table.Head class="w-[100px]"></Table.Head>-->	
			  {#if selection}
			  	<Table.Head></Table.Head>
			  {/if}		  
			  <Table.Head>Gesto</Table.Head>
			  <Table.Head>Tags</Table.Head>
			  <Table.Head>Data de Criação</Table.Head>
 			  <Table.Head>Última alteração</Table.Head>
			  <Table.Head class="flex justify-center">Anotação</Table.Head>
			</Table.Row>
		  </Table.Header>
		<Table.Body>
			{#each $ordered_data as sign}
				{#if themeShown(sign.theme, theme_options) && anotationShown(sign.is_anotated, anotation_options) && !selection}
					<Table.Row class="cursor-pointer content-center" on:click={() => goto('./anotate/'+sign.id)}>
						<Table.Cell class="font-medium"> {sign.name} </Table.Cell>
						<Table.Cell> {sign.theme} </Table.Cell>
						<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>
						<Table.Cell>{new Date(sign.last_changed).toLocaleDateString()}</Table.Cell>
						<Table.Cell class="flex justify-center">
							{#if sign.is_anotated == 2}
								<PencilCircleFill color={"#c1e1c1"}/>
							{:else if sign.is_anotated == 1}
								<PencilCircleFill color={"#ffdfba"} />
							{:else}
								<PencilCircleFill color={"#ffb3ba"}/>
							{/if}
						</Table.Cell>
			
					</Table.Row>
				{:else if themeShown(sign.theme, theme_options) && anotationShown(sign.is_anotated, anotation_options) && selection}
				<Table.Row class="cursor-pointer content-center">
					<Table.Cell>
						{#if selection}
							<Button class="flex h-4" variant="ghost" on:click={() => {sign.selected = !sign.selected 
																					  selectSigns(sign.id)}}>
								{#if !sign.selected}
									<CheckmarkCircle />
								{:else}
									<CheckmarkCircleFill />
								{/if}
							</Button>
						{/if}	
					</Table.Cell>
					<Table.Cell class="font-medium"> {sign.name} </Table.Cell>
					<Table.Cell> {sign.theme} </Table.Cell>
					<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>
					<Table.Cell>{new Date(sign.last_changed).toLocaleDateString()}</Table.Cell>
					<Table.Cell class="flex justify-center">
						{#if sign.is_anotated == 2}
							<PencilCircleFill color={"#c1e1c1"}/>
						{:else if sign.is_anotated == 1}
							<PencilCircleFill color={"#ffdfba"} />
						{:else}
							<PencilCircleFill color={"#ffb3ba"}/>
						{/if}
					</Table.Cell>
		
				</Table.Row>
				{/if}	
			{/each}
			
		</Table.Body>
	</Table.Root>
</div>

