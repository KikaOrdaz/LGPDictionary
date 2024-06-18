<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
   	import PencilCircleFill from '$lib/img/pencil_circle_fill.svelte';
    export let label: string;
    export let options:{name: string, show: boolean}[];

</script>



<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
	    <Button variant="outline" builders={[builder]}>{label}</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-64">
      {#each options as option}
      <DropdownMenu.CheckboxItem bind:checked={option.show} class="flex gap-x-2">
		{option.name}
		{#if option.name == "Anotados"}
			<PencilCircleFill color={"#c1e1c1"}/>
		{:else if option.name == "Anotação não terminada"}
			<PencilCircleFill color={"#ffdfba"} />
		{:else}
			<PencilCircleFill color={"#ffb3ba"}/>
		{/if}
	  </DropdownMenu.CheckboxItem>
      {/each}
	</DropdownMenu.Content>
  </DropdownMenu.Root>