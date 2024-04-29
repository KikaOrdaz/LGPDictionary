<script lang="ts">
    import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import PlayFill from '$lib/img/play_fill.svelte';
	import ChevronRight from '$lib/img/chevron_right.svelte';
	import ChevronLeft from '$lib/img/chevron_left.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import ParametersOptions from '$lib/components/ParametersOptions.svelte';
    import * as Sheet from "$lib/components/ui/sheet";
    import Line_3Horizontal from '$lib/img/line_3_horizontal.svelte';
    import Sidebar from "$lib/components/Sidebar.svelte"
    import Xmark from '$lib/img/xmark.svelte';
    import {files} from '$lib/files'
    import Input from '$lib/components/ui/input/input.svelte';


	
    export let data: any;
    let currentPlaylist = files[0]
    $: anotatedCount = folder.signs_id.filter((v: any) => v.anotated).length;

    
    let folderId = JSON.parse(JSON.stringify($page.params)).folderId

    
    function getFolderById(id : any) {
        return data.folders.find((item: { id: any; }) => item.id === id);
    }
    
    function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }
    
    let folder = getFolderById(+folderId)

    let current_sign = 0
    

    function nextOnPlaylist(){
        current_sign++;

        if (current_sign >= folder.signs_id.length){
            current_sign = 0
        }
    }

    function previousOnPlaylist(){
        current_sign--;

        if (current_sign <= -1){
            current_sign = folder.signs_id.length - 1
        } 
    }

    // $: videoSrc = getSignById(folder.signs_id[current_sign]).video;

    /* window.addEventListener('currentSignChange', (event) => {
        current_sign = (<any>event).detail;
    }); */
</script>


<div class="flex flex-row px-5 pt-5 sticky top-0">
    <div class="flex-none">
        <Sheet.Root>
            <Sheet.Trigger>
                <div class="flex flex-col gap-1 items-center">
                    <Line_3Horizontal />
                    {anotatedCount}/{folder.signs_id.length}
                </div>
            </Sheet.Trigger>
            <Sheet.Content side=left class="flex flex-grow justify-center">
                <Sidebar playlistId={folderId} data={data} current_sign={current_sign}/>      
            </Sheet.Content>
          </Sheet.Root>
    </div>
    <div class="grow">
    </div>

    <div class="flex-none">
        <a data-sveltekit-reload href="../manage">
            <Button variant = "ghost">
                <Xmark />
            </Button>
        </a>	

    </div>

</div>

<div class="flex flex-col items-center gap-y-7 py-5">

    <div class="flex flex-row gap-x-4 pb-5">
        <button on:click={previousOnPlaylist}>
            <ChevronLeft />
        </button>


            <Card.Root class="flex items-center justify-center h-40 aspect-video">
                <PlayFill />
            
                <!-- {#if videoSrc}
                    <img src={videoSrc} alt=""/>
                {:else}
                {/if}
 -->

                
                
                
            </Card.Root>
        <button on:click={nextOnPlaylist}>
            <ChevronRight />
        </button>
    </div>


    {getSignById(folder.signs_id[current_sign]).name}
    
    <div class="flex items-center">
        <Tabs.Root value="configuracao" class="">
            <Tabs.List>
                <Tabs.Trigger value="configuracao">Configuração</Tabs.Trigger>
                <Tabs.Trigger value="movimento">Movimento</Tabs.Trigger>
                <Tabs.Trigger value="localizacao">Localização</Tabs.Trigger>
                <Tabs.Trigger value="orientacao">Orientação</Tabs.Trigger>
                <Tabs.Trigger value="expressoes">Expressões</Tabs.Trigger>
                <Tabs.Trigger value="tema">Tema</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="configuracao">
                    <ParametersOptions data={data} currentTab={"configuracao"}/>
                    <div class="flex flex-row justify-center pt-8">
                        <form>
                            <div class="flex relative w-60">
                                <Input placeholder="Anotação" class="pl-8"/>
                            </div>
                        </form>
                    </div>
            </Tabs.Content>
            <Tabs.Content value="movimento">
                    <ParametersOptions data={data} currentTab={"movimento"}/>
            </Tabs.Content>
            <Tabs.Content value="localizacao">
                    <ParametersOptions data={data} currentTab={"localizacao"}/>
            </Tabs.Content>
            <Tabs.Content value="orientacao">
                    <ParametersOptions data={data} currentTab={"orientacao"}/>
                    <div class="flex flex-row justify-center pt-8 gap-4">
                        <form>
                            <div class="flex relative w-60">
                                <Input placeholder="Anotação" class="pl-8"/>
                            </div>
                        </form>
                        <form>
                            <div class="flex relative w-60">
                                <Input placeholder="Anotação" class="pl-8"/>
                            </div>
                        </form>
                    </div>
            </Tabs.Content>
            <Tabs.Content value="expressoes">
                    <ParametersOptions data={data} currentTab={"expressoes"}/>
            </Tabs.Content>
            <Tabs.Content value="tema">
                    <ParametersOptions data={data} currentTab={"tema"}/>
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>

