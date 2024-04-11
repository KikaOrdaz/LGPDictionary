<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import * as Card from '$lib/components/ui/card';
	import PlayFill from '../../lib/img/play_fill.svelte';
	import ChevronRight from '../../lib/img/chevron_right.svelte';
	import ChevronLeft from '../../lib/img/chevron_left.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import ParametersOptions from '../../lib/components/ParametersOptions.svelte';
    import * as Sheet from "$lib/components/ui/sheet";
    import Line_3Horizontal from '$lib/img/line_3_horizontal.svelte';
    import Sidebar from "../../lib/components/Sidebar.svelte"
    import Xmark from '../../lib/img/xmark.svelte';
    import {files} from '$lib/files'
    import Pencil from '$lib/img/pencil.svelte';

    //export let playlist : {type: string, icon: any, fileName: string, date: string, anotation: boolean, selected: boolean, videos: {label: string, anotated: boolean}[]}
	
    export let data;
    let currentPlaylist = files[0]
    $: annotatedCount = currentPlaylist.videos.filter((v) => v.anotated).length;
</script>

<div class="flex flex-row px-5 pt-5 sticky top-0">
    <div class="flex-none">
        <Sheet.Root>
            <Sheet.Trigger>
                <div class="flex flex-col gap-1 items-center">
                    <Line_3Horizontal />
                    {annotatedCount}/{currentPlaylist.videos.length}
                </div>
            </Sheet.Trigger>
            <Sheet.Content side=left class="flex flex-grow justify-center">
                <Sidebar playlistId={1} data={data}/>            </Sheet.Content>
          </Sheet.Root>
    </div>
    <div class="grow">
    </div>

    <div class="flex-none">
        <a data-sveltekit-reload href="./manage">
            <Button variant = "ghost">
                <Xmark />
            </Button>
        </a>	

    </div>

</div>

<div class="flex flex-col items-center gap-y-7 py-5">


    <div class="flex flex-row gap-x-4">
        <button>
            <ChevronLeft />
        </button>
        <Card.Root class="flex items-center justify-center h-40 aspect-video">
            <PlayFill />
        </Card.Root>
        <button>
            <ChevronRight />
        </button>
    </div>
    
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
                <!-- <ParametersOptions data={data}/> -->
            </Tabs.Content>
            <Tabs.Content value="movimento">
                    <ParametersOptions data={data} currentTab={"movimento"}/>
                <!-- <ParametersOptions data={data}/> -->
            </Tabs.Content>
            <Tabs.Content value="localizacao">
                    <ParametersOptions data={data} currentTab={"localizacao"}/>
                <!-- <ParametersOptions data={data}/> -->
            </Tabs.Content>
            <Tabs.Content value="orientacao">
                    <ParametersOptions data={data} currentTab={"orientacao"}/>
                <!-- <ParametersOptions data={data}/> -->
            </Tabs.Content>
            <Tabs.Content value="expressoes">
                    <ParametersOptions data={data} currentTab={"expressoes"}/>
                <!-- <ParametersOptions data={data}/> -->
            </Tabs.Content>
            <Tabs.Content value="tema">
                    <ParametersOptions data={data} currentTab={"tema"}/>
                <!-- <ParametersOptions data={data}/> -->
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>