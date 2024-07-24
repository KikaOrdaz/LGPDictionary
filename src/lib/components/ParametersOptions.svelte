<script lang="ts">
	import * as Card from '$lib/components/ui/card';
  	import * as Collapsible from "$lib/components/ui/collapsible";
	import { Content } from './ui/dialog';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
	import { type Writable } from 'svelte/store';
	import * as HoverCard from "$lib/components/ui/hover-card";
	import { ChevronUp } from 'svelte-radix';
	import { toast } from "svelte-sonner";


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
	export let exist_changes : boolean
	

	let open = false


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

	function useToast(message: number){

		open = false;

		if(message == 0){
			toast('A editar nome e temas', {
			action: {
				label: 'Ok',
				onClick: () => {}
			},})
		} else if (message == 1) {
			toast('Alterações guardadas!', {
			action: {
				label: 'Ok',
				onClick: () => reloadPage()
			},})
		} else if (message == 2){
			toast('Tem anotações por guardar!', {
			action: {
				label: 'Ok',
				onClick: () => {}
			},})
		} else if (message == 3){
			toast('Anotação guardada!', {
			action: {
				label: 'Ok',
				onClick: () => reloadPage()
			},})
		}
	}

	function getElementByCode(código : any) {
    	return data.parameters.find((item: { código: any; }) => item.código === código);
	}


	function selectParameter(id: any, tipo: any){

		let isSelected = $isParSelected.get(id);
		
		updateSelectedState(id, !isSelected)	


		const updateAnnotationArray = (type: keyof AnnotationArray, id: any) => {
			if (!isSelected) {
				console.log(id); //keep them for debugging if need be
				console.log(anotationArray);
				anotationArray[type].push(id);
				signsAnotation.set(sign.id, anotationArray);
				if (!exist_changes) {
					useToast(2);
				}
				exist_changes = true;
			} else {
				anotationArray[type] = anotationArray[type].filter(e => e !== id);
				if (!exist_changes) {
					useToast(2);
				}
				exist_changes = true;
			}
		};
		
		switch (tipo) {
			case "configuracao":
				updateAnnotationArray('configuration', id);
				break;
			case "movimento":
				updateAnnotationArray('movement', id);
				break;
			case "localizacao":
				updateAnnotationArray('location', id);
				break;
			case "orientacao":
				updateAnnotationArray('orientation', id);
				break;
			case "expressao facial":
				updateAnnotationArray('expression', id);
				break;
		}
	}
	

	function reloadPage() {
    	window.location.reload();
    }

	
</script>
<ScrollArea class="flex h-[22rem] pt-4">
	<div class="grid grid-cols-6 gap-4">
		{#if data.parameters}
		{#each data.parameters as par (par.id)}
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
											{#if par.nome != null}
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
											{#if par.nome != null}
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
						{#if par.children}
						{#each par.children as child (child)}
							<button on:click={() => selectParameter(getElementByCode(child).id, getElementByCode(child).tipo)}>
								{#if $isParSelected.get(getElementByCode(child).id)}
									<Card.Root class="flex items-center justify-center aspect-square w-16" style="border: 2px solid #0096FF;">
										<Card.Content>
											{#if getElementByCode(child).tipo == "configuracao"}
												<img class="flex w-full" src={getElementByCode(child).image} alt=""/>
											{:else}
												{#if getElementByCode(child).nome != null}
													<div class="flex text-xs">
														{getElementByCode(child).nome}
													</div>
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
											{:else}
												{#if getElementByCode(child).nome != null}
													<div class="flex text-xs">
														{getElementByCode(child).nome}
													</div>
												{:else}
													{getElementByCode(child).código}
												{/if}
											{/if}
										</Card.Content>
									</Card.Root>
								{/if}
							</button>
						{/each}
						{/if}
					</HoverCard.Content>
				</HoverCard.Root>
			{/if}
		{/each}
		{/if}
	</div>
</ScrollArea>