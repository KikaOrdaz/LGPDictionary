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
	import { writable, type Writable } from 'svelte/store';
	import { supabase } from "$lib/supabaseClient";

    type AnnotationArray = {
		configuration: any[];
		movement: any[];
		location: any[];
		orientation: any[];
		expression: any[];
		theme: any[];
	}
	
    export let data: any;
    let currentPlaylist = files[0]
    let folderId = JSON.parse(JSON.stringify($page.params)).folderId
    let folder = getFolderById(+folderId)
    let current_sign = 0
    export let folderAnotation = new Array<AnnotationArray>(folder.signs_id.length);
    // export let isParSelected =  writable(new Map<any, boolean>);
    export let anotationArray: AnnotationArray = getSignById(folder.signs_id[current_sign]).anotation
    let database_annotation
    let database_ann_array : Array<number>

    $: anotatedCount = folder.signs_id.filter((v: any) => v.anotated).length;
    $: current_video = getSignById(folder.signs_id[current_sign]).video

    let signStores: any[] = []; // Array to store separate stores for each sign

    // Create and initialize a separate store for each sign
    folder.signs_id.forEach((signId: number, index: number) => {

        database_annotation = getSignById(signId).anotation
        database_ann_array = []
        if(database_annotation){
            database_ann_array = database_ann_array.concat(database_annotation["configuration"],
            database_annotation["movement"],
            database_annotation["location"],
            database_annotation["orientation"],
            database_annotation["expression"],
            database_annotation["theme"])
            folderAnotation[index] = database_annotation
        }

        const store = writable(new Map<any, boolean>());
        data.parameters.forEach((par: { id: any; }) => {
            store.update(map => {
                const newMap = new Map(map);

                // newMap.set(par.id, false);
                newMap.set(par.id, database_ann_array.includes(par.id));
                return newMap;
            }); 
        });
        signStores.push(store);
    });




    function getFolderById(id : any) {
        return data.folders.find((item: { id: any; }) => item.id === id);
    }
    
    function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }
    
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
    async function insertAnotation(annotation: AnnotationArray, sign_id: number) {
        console.log("2 annotation: ", annotation);
        console.log("sign_id: ", sign_id);

        const { data, error } = await supabase
            .from('signs')
            // .select()
            .update({ anotation: annotation }) // Update with the annotation object
            .eq('id', sign_id);


        console.log("data: ", data, " error: ", error);
    }

    function endAnotation() {
        console.log("End annotation");
        folderAnotation.forEach((annotation: AnnotationArray, index: number) => {
            if (annotation) {

                console.log("1 annotation: " + annotation)
                insertAnotation(annotation, folder.signs_id[index]);
            }
        });
    }

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
                <Sidebar playlistId={folderId} data={data} bind:current_sign={current_sign}/>      
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

<div class="flex flex-col items-center gap-y-3 py-5">

    <div class="flex flex-row gap-x-4 pb-3">
        <button on:click={previousOnPlaylist}>
            <ChevronLeft />
        </button>
            {#if current_video}
                <!-- <img src={videoSrc} alt=""/> -->
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video width="320" height="240" controls>
                        <source src={current_video} type="video/mp4">
                    </video>
            {:else}
                <Card.Root class="flex items-center justify-center h-40 aspect-video">
                    <PlayFill />
                </Card.Root>
            {/if}

        <button on:click={nextOnPlaylist}>
            <ChevronRight />
        </button>
    </div>


    {getSignById(folder.signs_id[current_sign]).name}
    
    <div class="flex place-items-center">
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
                    <ParametersOptions data={data} 
                                        currentTab={"configuracao"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores[current_sign]} 
                                        bind:folderAnotation={folderAnotation} 
                                        current_sign={current_sign}/>
                    <div class="flex flex-row sticky justify-center pt-8 bottom-4">
                        <form>
                            <div class="flex relative w-60">
                                <Input placeholder="Anotação" class="pl-8"/>
                            </div>
                        </form>
                    </div>
            </Tabs.Content>
            <Tabs.Content value="movimento">
                    <ParametersOptions data={data} 
                                        currentTab={"movimento"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores[current_sign]} 
                                        bind:folderAnotation={folderAnotation} 
                                        current_sign={current_sign}/>
            </Tabs.Content>
            <Tabs.Content value="localizacao">
                    <ParametersOptions data={data} 
                                        currentTab={"localizacao"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores[current_sign]} 
                                        bind:folderAnotation={folderAnotation} 
                                        current_sign={current_sign}/>
            </Tabs.Content>
            <Tabs.Content value="orientacao">
                    <ParametersOptions data={data} 
                                        currentTab={"orientacao"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores[current_sign]} 
                                        bind:folderAnotation={folderAnotation} 
                                        current_sign={current_sign}/>
                    <div class="flex flex-row sticky justify-center pt-8 gap-4 bottom-4">
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
                    <ParametersOptions data={data} 
                                        currentTab={"expressoes"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores[current_sign]} 
                                        bind:folderAnotation={folderAnotation} 
                                        current_sign={current_sign}/>
            </Tabs.Content>
            <Tabs.Content value="tema">
                    <ParametersOptions data={data} 
                                        currentTab={"tema"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores[current_sign]} 
                                        bind:folderAnotation={folderAnotation} 
                                        current_sign={current_sign}/>
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>


<div class="fixed bottom-0 right-0 p-3">
    <!-- <a data-sveltekit-reload href="../manage"> -->
        <Button variant="outline" on:click={() => endAnotation()}>
            Done
        </Button>
    <!-- </a> -->
</div>