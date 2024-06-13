<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import PlayRectangle from '$lib/img/play_rectangle.svelte';
	import PencilCircleFill from '$lib/img/pencil_circle_fill.svelte';
	import { goto } from '$app/navigation';

	
	export let data: any;

	export let theme_options: any;
	export let anotation_options: any;
	  
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

</script>

<div class="px-10">
	<Table.Root>
		<Table.Body>
			{#each data.signs as sign}
				{#if themeShown(sign.theme, theme_options) && anotationShown(sign.is_anotated, anotation_options)}
					<Table.Row class="cursor-pointer content-center" on:click={() => goto('./anotate/'+sign.id)}>
						<Table.Cell>
							<PlayRectangle/>
						</Table.Cell>
						<Table.Cell class="font-medium"> 
								{sign.name}
						</Table.Cell>
						<Table.Cell>
							{sign.theme}
						</Table.Cell>
						<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>
						<Table.Cell>
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

