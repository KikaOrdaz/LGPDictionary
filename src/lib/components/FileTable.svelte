<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import PlayRectangle from '$lib/img/play_rectangle.svelte';
	import Button from './ui/button/button.svelte';
	import PencilCircle from '$lib/img/pencil_circle.svelte';
	import PencilCircleFill from '$lib/img/pencil_circle_fill.svelte';
	import Ellipsis from '$lib/img/ellipsis.svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import CheckmarkCircle from '$lib/img/checkmark_circle.svelte';
	import CheckmarkCircleFill from '$lib/img/checkmark_circle_fill.svelte';
	import { supabase } from "$lib/supabaseClient";

	
	export let data: any;

	export let theme_options: any;

	function getSignById(id : any) {
    	return data.signs.find((item: { id: any; }) => item.id === id);
  	}

	  
	function themeShown(themeName : string){
		// let themeValue
		theme_options.forEach((option : any) => {
			if(option.name == themeName){
				console.log(option.name + " " + option.show)
			}
		})
	}

	// themeShown("animais")


</script>

<div class="px-10">
	<Table.Root>
		<Table.Body>
			{#each data.signs as sign}
			
			<Table.Row class="content-center">
				
						<Table.Cell>
							<PlayRectangle/>
						</Table.Cell>
						<Table.Cell class="font-medium"> 
							<a data-sveltekit-reload href='./anotate/{sign.id}'>
								{sign.name}
							</a>
						</Table.Cell>
						<Table.Cell>
							<a data-sveltekit-reload href='./anotate/{sign.id}'>
								{sign.theme}
							</a>
						</Table.Cell>
						<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>
						<Table.Cell>
								<!-- <Button variant = "ghost"> -->
							{#if sign.is_anotated == 2}
								<PencilCircleFill color={"#c1e1c1"}/>
							{:else if sign.is_anotated == 1}
								<PencilCircleFill color={"#ffdfba"} />
							{:else}
								<PencilCircleFill color={"#ffb3ba"}/>
							{/if}
								<!-- </Button> -->
						</Table.Cell>
						<!-- <DropdownMenu.Root>
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
						</DropdownMenu.Root> -->	
					</Table.Row>
			
			{/each}
			
		</Table.Body>
	</Table.Root>
</div>

