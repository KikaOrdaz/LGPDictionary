<script lang="ts">
	import FileTable from '../../lib/components/FileTable.svelte';
	import Upload from '../../lib/components/Upload.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import { writable } from 'svelte/store';	
	export let data;
	import DropdownRadioButton from '$lib/components/DropdownRadioButton.svelte'

	let themes : string[] = []
	export let anotation_options =  [{name:"Anotados", show: true}, {name: "Anotação não terminada", show: true}, {name: "Por anotar", show: true}]
	export let theme_options : {name: string, show: boolean}[] = []


	data.signs.forEach((sign: any) => {
		sign.theme.forEach((theme: string) => {
			if(!(themes.indexOf(theme) > -1)){
				themes.push(theme)
			}
		})
	})
	
	
	themes.forEach((theme: string) => {
		let option = {name: theme, show: true}
		theme_options.push(option)
	})
		
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
		<div class = "flex flex-1 justify-end gap-5">
			<Upload database={data}/>
		</div>
	</div>

	<div class="flex flex-row px-3 pb-5 justify-between items-center gap-2">
		<div class="flex flex-1"></div>

		<div class="flex place-items-center gap-3">
			<DropdownButton label = {"Anotação"} bind:options={anotation_options}/>
			<DropdownButton label = {"Temas"} bind:options={theme_options}/>
			<DropdownRadioButton />
			
		</div>

		<div class="flex flex-1 flex-row justify-end"></div>

	</div>

	<FileTable data={data} bind:theme_options={theme_options} bind:anotation_options={anotation_options}/>

</div>



