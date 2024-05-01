<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import * as Card from '$lib/components/ui/card';
    import Folder from "$lib/img/folder.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import Pencil from "$lib/img/pencil.svelte"


    export let playlistId: any;
    export let data: any;
    export let current_sign: number;
    


    function getFolderById(id : any) {
        return data.folders.find((item: { id: any; }) => item.id === id);
    }

    function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }


    let playlist = getFolderById(+playlistId)

    function changeCurrentSign(sign_id : number){
        current_sign = playlist.signs_id.indexOf(sign_id)
    }


    $: anotatedCount = playlist.signs_id.filter((v: any) => v.anotated).length;


</script>

  
<div class="flex flex-col w-full">
    <div class="flex flex-row pt-5 items-center justify-start gap-2">
        <Folder/>
        <p class="text-lg font-bold">
            {playlist.name}
        </p>
    </div>
    <div class="flex flex-row items-center justify-start gap-2 pb-2 text-sm">
        {anotatedCount}/{playlist.signs_id.length} anotados
    </div>

    <Separator />
    
    <ScrollArea class= "flex flex-row py-5">
        <div class="flex flex-col items-center gap-7">
            {#each playlist.signs_id as sign}
                <div class="flex flex-col gap-1 items-center">
                    {#if playlist.signs_id[current_sign] == sign}
                        <Card.Root class="flex flex-col w-60  h-20" style="border: 2px solid #0096FF;">
                            <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                                {#if getSignById(sign).anotated}
                                    <Pencil />
                                {/if}
                            </div>

                            <div class="flex flex-row items-center justify-center sticky">
                                {getSignById(sign).name}
                            </div>
                            <div class="flex flex-1 pb-2"></div>
                        </Card.Root>
                    {:else}
                        <button on:click={() => changeCurrentSign(sign)}>
                            <Card.Root class="flex flex-col w-60 h-20">
                                <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                                    {#if getSignById(sign).anotated}
                                        <Pencil />
                                    {/if}
                                    </div>

                                <div class="flex flex-row items-center justify-center sticky">
                                    {getSignById(sign).name}
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