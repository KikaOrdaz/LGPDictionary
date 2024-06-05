<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Folder from '../img/folder.svelte';
	import PlayRectangle from '$lib/img/play_rectangle.svelte';
	import Button from './ui/button/button.svelte';
	import PencilCircle from '$lib/img/pencil_circle.svelte';
	import PencilCircleFill from '$lib/img/pencil_circle_fill.svelte';
	import Ellipsis from '$lib/img/ellipsis.svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import CheckmarkCircle from '$lib/img/checkmark_circle.svelte';
	import CheckmarkCircleFill from '$lib/img/checkmark_circle_fill.svelte';
	import { files } from '$lib/files';

	
	export let selection: boolean;
	export let data: any;

	function getSignById(id : any) {
    	return data.signs.find((item: { id: any; }) => item.id === id);
  	}

</script>

<div class="px-10">
	<Table.Root>
		<Table.Body>
			{#each data.signs as sign}
				<Table.Row class="content-center">
					<Table.Cell>
					{#if !selection}
						<!-- {#if folder.signs_id.length == 1}
							<PlayRectangle/>
							{:else}
							<Folder/>
							{/if} -->
							<PlayRectangle/>
					{:else}
						<Button variant="ghost" on:click={() => {sign.selected = !sign.selected}}>
							{#if !sign.selected}
								<CheckmarkCircle />
							{:else}
								<CheckmarkCircleFill />
							{/if}
						</Button>
					{/if}
				</Table.Cell>
						<Table.Cell class="font-medium"> 
							<!-- {#if folder.signs_id.length == 1}
								{getSignById(folder.signs_id[0]).name}
								{:else}
								{folder.name}
								{/if} -->
							{sign.name}
						</Table.Cell>
						<Table.Cell>
							{sign.theme}
							<!-- {#if folder.signs_id.length == 1}
								1 gesto
							{:else}
								{folder.signs_id.length} gestos
							{/if} -->
						</Table.Cell>
						<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>

						<a data-sveltekit-reload href='./anotate/{sign.id}'>
								<Button variant = "ghost">
									{#if sign.anotated}
										<PencilCircleFill />
									{:else}
										<PencilCircle />
									{/if}
								</Button>
						</a>	
			

						<DropdownMenu.Root>
							<DropdownMenu.Trigger> 
								<Ellipsis/>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Item>Mudar o nome</DropdownMenu.Item>
								<DropdownMenu.Item>Mover</DropdownMenu.Item>
								<DropdownMenu.Item>Partilhar</DropdownMenu.Item>
								<DropdownMenu.Item>Detalhes</DropdownMenu.Item>
							</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						

				</Table.Row>
			
			{/each}
			
		</Table.Body>
	</Table.Root>
</div>

