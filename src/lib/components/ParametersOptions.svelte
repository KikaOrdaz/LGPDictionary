<script lang="ts">
	import * as Card from '$lib/components/ui/card';
  	import * as Collapsible from "$lib/components/ui/collapsible";
	import { Content } from './ui/dialog';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
	import { type Writable } from 'svelte/store';
	import * as HoverCard from "$lib/components/ui/hover-card";
	import { ChevronUp } from 'svelte-radix';

	type AnnotationArray = {
		configuration: any[];
		movement: any[];
		location: any[];
		orientation: any[];
		expression: any[];
	}

	export let data: any;
	export let currentTab: String;
	export let anotationArray: AnnotationArray
	export let isParSelected :  Writable<Map<any, boolean>>
	export let signsAnotation = new Map<number, AnnotationArray>();
	export let sign : any;

	let children_visible = new Map<string, boolean>();


	data.parameters.forEach((parameter : any) => {
		if(parameter.is_parent){

		}
	});

	
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
					console.log(id)
					console.log(anotationArray)
					anotationArray.configuration.push(id)
					signsAnotation.set(sign.id, anotationArray)
				} else {
					anotationArray.configuration = anotationArray.configuration.filter((e, i) => i !== anotationArray.configuration.indexOf(id)); 
				}
				
				break;
			}
			
			case "movimento":{
				if(!isSelected){
					anotationArray.movement.push(id)
					signsAnotation.set(sign.id, anotationArray)
				} else {
					anotationArray.movement = anotationArray.movement.filter((e, i) => i !== anotationArray.movement.indexOf(id)); 
				}
				break;
			}
			
			case "localizacao":{
				if(!isSelected){
					anotationArray.location.push(id)
					signsAnotation.set(sign.id, anotationArray)
				} else {
					anotationArray.location = anotationArray.location.filter((e, i) => i !== anotationArray.location.indexOf(id)); 
				}
				break;
			}
			
			case "orientacao":{
				if(!isSelected){
					anotationArray.orientation.push(id)
					signsAnotation.set(sign.id, anotationArray)
				} else {
					anotationArray.orientation = anotationArray.orientation.filter((e, i) => i !== anotationArray.orientation.indexOf(id)); 
				}
				break;
			}
			
			case "expressao facial":{
				if(!isSelected){
					anotationArray.expression.push(id)
					signsAnotation.set(sign.id, anotationArray)
				} else {
					anotationArray.expression = anotationArray.expression.filter((e, i) => i !== anotationArray.expression.indexOf(id)); 
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
				<HoverCard.Root>
					<HoverCard.Trigger>
						<button on:click={() => selectParameter(par.id, par.tipo)}>
							{#if $isParSelected.get(par.id)}
								<Card.Root class="flex items-center justify-center aspect-square w-32" style="border: 2px solid #0096FF;">
									<Card.Content>
										{#if par.tipo == "configuracao"}
											<img class="flex w-20" src={par.image} alt=""/>
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

					</HoverCard.Trigger>
						<HoverCard.Content class="grid grid-cols-3 items-center gap-3">
							{#if par.children.length == 0}
								<div class="flex flex-row text-xs">
									Sem sub-parâmetros	
								</div>
							{/if}
							{#each par.children as child}
								<button on:click={() => selectParameter(getElementByCode(child).id, getElementByCode(child).tipo)}>
								{#if $isParSelected.get(getElementByCode(child).id)}
										<Card.Root class="flex items-center justify-center aspect-square w-16" style="border: 2px solid #0096FF;">
											<Card.Content>
												{#if getElementByCode(child).tipo == "configuracao"}
													<img class="flex w-full" src={getElementByCode(child).image} alt=""/>
												{:else if getElementByCode(child).image == null}
													{#if getElementByCode(child).nome !=null}
														{getElementByCode(child).nome}
													{:else}
														{getElementByCode(child).código}
													{/if}
												{/if}
											</Card.Content>
										</Card.Root>
									{:else}
										<Card.Root class="flex items-center justify-center aspect-square w-16">
											<Card.Content>
												{#if getElementByCode(child).tipo == "configuracao"}
													<img class="flex w-full" src={getElementByCode(child).image} alt=""/>
												{:else if getElementByCode(child).image == null}
													{#if getElementByCode(child).nome !=null}
														{getElementByCode(child).nome}
													{:else}
														{getElementByCode(child).código}
													{/if}
												{/if}
											</Card.Content>
										</Card.Root>
									{/if}
								</button>
							{/each}
						</HoverCard.Content>
		  		</HoverCard.Root>
			{/if}
		{/each}
		</div>

</ScrollArea>


<!--
	{#each Array(5) as _, index (index)}
	<div class="flex flex-row gap-3">
		{#each Array(5) as _, index (index)}
			<div class="flex flex-col p-3">
				<Card.Root class="flex items-center justify-center aspect-square">
					<Card.Content>
						<Collapsible.Root>
							<Collapsible.Trigger>
								<img class="" src="$lib/img/signs/0..svg" alt="Thumb"/>
								Abrir
							</Collapsible.Trigger>
							<Collapsible.Content>
								Gestos
								Gestos
								Gestos
								Gestos
								Gestos
								Gestos
								
							</Collapsible.Content>
						</Collapsible.Root>
					</Card.Content>
				</Card.Root>
			</div>
		{/each}
	</div>
{/each}
-->


<!--
<div class="grid grid-cols-5 gap-4">
    {#each squares as square}
        <button
            class="aspect-square border"
            class:col-span-2={square === expandedSquare}
            class:row-span-2={square === expandedSquare}
            on:click={() => (expandedSquare = square)}
        >
            {square}
		</button>
    {/each}
</div>
-->