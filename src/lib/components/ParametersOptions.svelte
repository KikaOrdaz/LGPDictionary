<script lang="ts">
	import * as Card from '$lib/components/ui/card';
  	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as Zero from "$lib/img/signs/0.svelte"
	import { Content } from './ui/dialog';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
	import { writable, type Writable } from 'svelte/store';

	type AnnotationArray = {
		configuration: any[];
		movement: any[];
		location: any[];
		orientation: any[];
		expression: any[];
		theme: any[];
	}

	export let data: any;
	export let currentTab: String;
	export let anotationArray: AnnotationArray
	export let isParSelected :  Writable<Map<any, boolean>>
	export let folderAnotation : Array<AnnotationArray>
	export let current_sign : number
	let anotationWritten : string


	

	export function updateSelectedState(id: any, isSelected: boolean) {
    isParSelected.update(map => {
        const newMap = new Map(map);
        newMap.set(id, isSelected);
        return newMap;
    });
	}

	function getElementByCode(código : any) {
    	return data.parameters.find((item: { código: any; }) => item.código === código);
	}


	function selectParameter(id: any, tipo: any){

		let isSelected = $isParSelected.get(id);
		
		updateSelectedState(id, !isSelected)	
		
		switch(tipo){
				case "configuracao":{
					if(!isSelected){
						anotationArray.configuration.push(id)
						folderAnotation[current_sign] = anotationArray
					} else {
						anotationArray.configuration = anotationArray.configuration.filter((e, i) => i !== anotationArray.configuration.indexOf(id)); 
					}

					break;
				}

				case "movimento":{
					if(!isSelected){
						anotationArray.movement.push(id)
						folderAnotation.splice(current_sign, 0, anotationArray)
					} else {
						anotationArray.movement = anotationArray.movement.filter((e, i) => i !== anotationArray.movement.indexOf(id)); 
					}
					break;
				}

				case "localizacao":{
					if(!isSelected){
						anotationArray.location.push(id)
						folderAnotation.splice(current_sign, 0, anotationArray)
					} else {
						anotationArray.location = anotationArray.location.filter((e, i) => i !== anotationArray.location.indexOf(id)); 
					}
					break;
				}

				case "orientacao":{
					if(!isSelected){
						anotationArray.orientation.push(id)
						folderAnotation.splice(current_sign, 0, anotationArray)
					} else {
						anotationArray.orientation = anotationArray.orientation.filter((e, i) => i !== anotationArray.orientation.indexOf(id)); 
					}
					break;
				}

				case "expressao facial":{
					if(!isSelected){
						anotationArray.expression.push(id)
						folderAnotation.splice(current_sign, 0, anotationArray)
					} else {
						anotationArray.expression = anotationArray.expression.filter((e, i) => i !== anotationArray.expression.indexOf(id)); 
					}
					break;
				}

				case "tema":{
					if(!isSelected){
						anotationArray.theme.push(id)
						folderAnotation.splice(current_sign, 0, anotationArray)
					} else {
						anotationArray.theme = anotationArray.theme.filter((e, i) => i !== anotationArray.theme.indexOf(id)); 
					}
					break;
				}
			}
	}


</script>
<ScrollArea class="flex h-[22rem] pt-4">
	<div class="grid grid-cols-4 gap-4">
		{#each data.parameters as par}
			{#if par.is_parent && par.tipo == currentTab} 
				<button on:click={() => selectParameter(par.id, par.tipo)}>
					{#if $isParSelected.get(par.id)}
						<Card.Root class="flex items-center justify-center aspect-square w-32" style="border: 2px solid #0096FF;">
							<Card.Content>
								{#if par.tipo == "configuracao"}
									<img class="flex w-20" src={par.image} alt=""/>
									{$isParSelected.get(par.id)}
								{:else if par.image == null}
									{#if par.nome !=null}
										{par.nome}
									{:else}
										{par.código}
									{/if}
								{/if}
							</Card.Content>
						</Card.Root>
					{:else}
						<Card.Root class="flex items-center justify-center aspect-square w-32">
							<Card.Content>
								{#if par.tipo == "configuracao"}
									<img class="flex w-20" src={par.image} alt=""/>
									<!-- {$isParSelected.get(par.id)} -->
									{par.código}
								{:else if par.image == null}
									{#if par.nome !=null}
										{par.nome}
									{:else}
										{par.código}
									{/if}
								{/if}
							</Card.Content>
						</Card.Root>
					{/if}
						
				
						
				</button>
			{/if}
		{/each}
		</div>

</ScrollArea>
