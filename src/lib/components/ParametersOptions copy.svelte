<script lang="ts">
	import * as Card from '$lib/components/ui/card';
  	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as Zero from "$lib/img/signs/0.svelte"
	import { Content } from './ui/dialog';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';

	export let data: any;
	export let currentTab: String;

	let squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let expandedSquare: number | null = null;

	function getElementByCode(código : any) {
    return data.parameters.find((item: { código: any; }) => item.código === código);
  }

</script>
<ScrollArea class="flex h-[28rem] pt-4">
	<div class="grid grid-cols-4 gap-4">
		{#each data.parameters as par}
			{#if par.is_parent && par.tipo == currentTab} 
				<Card.Root class="flex items-center justify-center aspect-square w-30">
					<Card.Content>
						<Collapsible.Root>
							<Collapsible.Trigger>
								{#if par.tipo == "configuracao"}
									<img class="flex w-20" src={par.image} alt=""/>
								{:else if par.image == null}
									{#if par.nome !=null}
										{par.nome}
									{:else}
										{par.código}
									{/if}
								{/if}
								<!-- {par.código} -->
							</Collapsible.Trigger>
							<Collapsible.Content class="flex flex-row">
								{#if par.children.length > 0}
								<!-- <div class="flex flex-row flex-end"></div> -->
									{#each par.children as child}
										{#if (par.tipo == "configuracao" || par.tipo == "localizacao")}
											{#if getElementByCode(child).image != null}
												<img class="flex w-10" src={getElementByCode(child).image} alt=""/>
											{:else}
												{getElementByCode(child).código}
											{/if}
										{/if}
									{/each}	
								{/if}
							</Collapsible.Content>
						</Collapsible.Root>
					</Card.Content>
				</Card.Root>
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

