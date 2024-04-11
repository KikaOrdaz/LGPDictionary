<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import * as Card from '$lib/components/ui/card';
    import PlayFill from "$lib/img/play_fill.svelte";
    import Folder from "$lib/img/folder.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import Pencil from "$lib/img/pencil.svelte"
    import {files} from '$lib/files'

    //export let folderName = "Animais"
    export let playlistId: any;
    export let data: any;
    let currentPlaylist = files[0]


    function getFolderById(id : any) {
        return data.folders.find((item: { id: any; }) => item.id === id);
    }

    function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }


    let playlist = getFolderById(+playlistId)


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
                {getSignById(sign).name}
                <Card.Root class="flex flex-col w-60 aspect-video">
                    <div class="flex flex-1 flex-row justify-end pt-2 pe-2">
                        {#if getSignById(sign).anotated}
                            <Pencil />
                        {/if}
                        </div>

                    <div class="flex flex-row items-center justify-center sticky">
                        <PlayFill />
                    </div>
                    <div class="flex flex-1 pb-2"></div>
                </Card.Root>
            </div>
            
            {/each}
        </div>
    </ScrollArea>

</div>