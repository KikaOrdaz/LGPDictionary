<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import * as Card from '$lib/components/ui/card';
    import { Separator } from "$lib/components/ui/separator";
    import PencilCircleFill from "$lib/img/pencil_circle_fill.svelte";
	import DropdownButton from '$lib/components/DropdownButton.svelte';


    export let data: any;
    export let current_sign: any;
    let themes : string[] = []

    function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }


    function changeCurrentSign(sign : any){
        current_sign = sign
    }

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

  
<div class="flex flex-col w-full">
    <div class="flex flex-row py-5 items-center justify-center gap-2">
        <DropdownButton label = {"Anotação"} bind:options={anotation_options}/>
	    <DropdownButton label = {"Temas"} bind:options={theme_options}/>
       
    </div>
    <Separator />
    
    <ScrollArea class= "flex flex-row py-5">
        <div class="flex flex-col items-center gap-7">
            {#each data.signs as sign}
                <div class="flex flex-col gap-1 items-center">
                    {#if current_sign == sign}
                        <Card.Root class="flex flex-col w-60  h-20" style="border: 2px solid #0096FF;">
                            <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                                {#if sign.is_anotated == 2}
                                    <PencilCircleFill color={"#baffc9"}/>
                                {:else if sign.is_anotated == 1}
                                    <PencilCircleFill color={"#ffdfba"}/>
                                {:else if sign.is_anotated == 0}
                                    <PencilCircleFill color={"#ffadad"}/>
                                {/if}
                            </div>

                            <div class="flex flex-row items-center justify-center sticky">
                                {sign.name}
                            </div>
                            
                            <div class="flex flex-1 pb-2"></div>
                        </Card.Root>
                    {:else}
                        <button on:click={() => changeCurrentSign(sign)}>
                            <Card.Root class="flex flex-col w-60 h-20">
                                <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                                    {#if sign.is_anotated == 2}
                                    <PencilCircleFill color={"#c1e1c1"}/>
                                {:else if sign.is_anotated == 1}
                                    <PencilCircleFill color={"#ffdfba"}/>
                                {:else if sign.is_anotated == 0}
                                    <PencilCircleFill color={"#ffb3ba"}/>
                                {/if}
                                </div>

                                <div class="flex flex-row items-center justify-center sticky">
                                    {sign.name}
                                </div>

                                <div class="flex flex-1 pb-2"></div>
                            </Card.Root>
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    </ScrollArea>

</div>