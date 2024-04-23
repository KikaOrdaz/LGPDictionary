<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import * as Card from '$lib/components/ui/card';
    import Folder from "$lib/img/folder.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import Pencil from "$lib/img/pencil.svelte"
    import {files} from '$lib/files'

    //export let folderName = "Animais"
    //let currentPlaylist = files[0]
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

    
    $: videoSrc = getSignById(playlist.signs_id[current_sign]).video;


    function changeCurrentSign(sign_id : number){
        current_sign = sign_id
        dispatch('currentSignChange', current_sign); // Dispatch event
    }

    function dispatchCurrentSign() {
    dispatch('currentSignChange', current_sign);
  }

  function dispatch(name: string, detail: any) {
    const event = new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  }

  // Listen for changes to current_sign and dispatch
  $: dispatchCurrentSign();

    // export let playlist : {type: string, icon: any, fileName: string, date: string, anotation: boolean, selected: boolean, videos: {label: string, anotated: boolean}[]};
    // $: annotatedCount = playlist.signs_id.filter((v) => v.anotated).length;

</script>

  
<div class="flex flex-col w-full">
    <div class="flex flex-row pt-5 items-center justify-start gap-2">
        <Folder/>
        <p class="text-lg font-bold">
            {playlist.name}
        </p>
    </div>
    <div class="flex flex-row items-center justify-start gap-2 pb-2 text-sm">
        <!-- {annotatedCount}/{playlist.videos.length} vídeos anotados -->
    </div>

    <Separator />
    
    <ScrollArea class= "flex flex-row py-5">
        <div class="flex flex-col items-center gap-7">
            {#each playlist.signs_id as sign}
                <div class="flex flex-col gap-1 items-center">

                    {#if playlist.signs_id[current_sign] == sign}
                        <button>
                            <Card.Root class="flex flex-col w-60  h-20" style="border: 2px solid #0096FF;">
                                <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                                    {#if getSignById(sign).anotated}
                                        <Pencil />
                                    {/if}
                                </div>

                                <div class="flex flex-row items-center justify-center sticky">
                                    <!-- <img src={getSignById(sign).video} alt=""/> -->
                                    {getSignById(sign).name}
                                </div>
                                <div class="flex flex-1 pb-2"></div>
                            </Card.Root>
                        </button>
                    {:else}
                        <button on:click={() => {changeCurrentSign(sign - 1)}}>
                            <Card.Root class="flex flex-col w-60 h-20">
                                <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                                    {#if getSignById(sign).anotated}
                                        <Pencil />
                                    {/if}
                                    </div>

                                <div class="flex flex-row items-center justify-center sticky">
                                    <!-- <img src={getSignById(sign).video} alt=""/> -->
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