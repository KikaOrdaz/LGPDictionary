<script lang="ts">
	import FileTable from '../../lib/components/FileTable.svelte';
	import { Button } from '$lib/components/ui/button';
	import Upload from '../../lib/components/Upload.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import CheckmarkCircle from '$lib/img/checkmark_circle.svelte';
	import CheckmarkCircleFill from '$lib/img/checkmark_circle_fill.svelte';
	import Trash from '../../lib/img/trash.svelte'
	

	let selection = false;
	
	function toggleSelection(){
		selection = !selection;
	}
	
	export let data;

	let anotation = {label: "Anotação", options: [{name:"Anotados", show: true}, {name: "Por anotar", show: true}]}
	let type = {label: "Tipo", options: [{name:"Video", show: true}, {name: "Pasta", show: true}]}
	let theme = {label: "Tema", options: [{name:"Aulas", show: true}, {name: "Casa", show: true}]}

</script>

<div class="flex flex-col pt-10" >
	<div class="flex flex-row px-3 pb-5">
		<div class = "flex-1"></div>
		<div class = "w-8/12 ">
			<form>
				<div class="relative">
					<Input placeholder="Search" class="pl-8"/>
				</div>
			</form>
		</div>
		<div class = "flex flex-1 justify-end gap-3">
			<Button variant="outline" on:click={toggleSelection}>
				{#if !selection}
					<CheckmarkCircle />
				{:else}
					<CheckmarkCircleFill/>
				{/if}
				
			</Button>

			<Upload database={data}/>
		</div>
	</div>

	<div class="flex flex-row px-3 pb-5 justify-between items-center gap-2">
		<div class="flex flex-1">
		</div>

		<div class="flex place-items-center">
			<DropdownButton label = {anotation.label} options={anotation.options}/>
			<DropdownButton label = {type.label} options={type.options}/>
			<DropdownButton label = {theme.label} options={theme.options}/>
		</div>

		<div class="flex flex-1 flex-row justify-end">
			{#if selection}
				<Button variant="outline">
					Anotar todos selecionados
				</Button>
				<Button variant="outline" size="icon">
					<Trash />
				</Button>
			{/if}

		</div>

	</div>
	<FileTable selection={selection} data={data}/>

</div>



