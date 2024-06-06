<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
   
    export let label: string;
    export let options:{name: string, show: boolean}[];

	function toggleValue(optionName : string){
		options.forEach((option : any) => {
			
		})
	}

</script>



<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
	    <Button variant="outline" builders={[builder]}>{label}</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
      {#each options as option}
      <DropdownMenu.CheckboxItem bind:checked={option.show} >
		{option.name}
	  </DropdownMenu.CheckboxItem>
      {/each}
	</DropdownMenu.Content>
  </DropdownMenu.Root>