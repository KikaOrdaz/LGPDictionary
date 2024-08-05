<script lang="ts">
	import PlayFill from '$lib/img/play_fill.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ParametersOptions from '$lib/components/ParametersOptions.svelte';
    import Line_3Horizontal from '$lib/img/line_3_horizontal.svelte';
    import Sidebar from "$lib/components/Sidebar.svelte"
    import Xmark from '$lib/img/xmark.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import Pencil from '$lib/img/pencil.svelte';
    import Checkmark from '$lib/img/checkmark.svelte'
    import DropdownButton from '$lib/components/DropdownButton.svelte';
    import Plus from '$lib/img/plus.svelte'
    import Minus from '$lib/img/minus.svelte'
    import Trash from '$lib/img/trash.svelte'
	import { writable, type Writable } from 'svelte/store';
	import { supabase } from "$lib/supabaseClient";
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
    import * as Sheet from "$lib/components/ui/sheet";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import SDCard from '$lib/img/sdcard.svelte';
    import SDCardFill from '$lib/img/sdcard_fill.svelte';
    import { toast } from "svelte-sonner";



    type AnnotationArray = {
		configuration: any[];
		movement: any[];
		location: any[];
		orientation: any[];
		expression: any[];
    }
	
    export let data: any;
    let signId_params = JSON.parse(JSON.stringify($page.params)).signId
    export let sign = getSignById(+signId_params)
    export let signsAnotation = new Map<number, AnnotationArray>();
    export let exist_changes = false
    let edit_mode = false
    let add_theme = false
	let open = false;
    let sheet_open = true
    const searchQuery = writable('');
    
    export let anotationArray: AnnotationArray = sign.anotation
    let database_annotation
    let database_ann_array : Array<number>
    let themes : string[] = []

    let new_name : string = sign.name
    let new_theme : string = ""
    let themes_to_display = sign.theme

    let written_anotation = {configuration: "", movement: ["","",""], orientation: ["",""]}

    if (sign.written_anotation != null){
        written_anotation = sign.written_anotation
    }

    let written_anotation_placeholder = written_anotation

    // written_anotation_placeholder.configuration == "" ? written_anotation_placeholder.configuration : "Anotação" 

    if(written_anotation_placeholder.configuration == ""){
        written_anotation_placeholder.configuration = "Anotação"
    }
    if(written_anotation_placeholder.orientation[0] == ""){
        written_anotation_placeholder.orientation[0] = "Anotação"
    }
    if(written_anotation_placeholder.orientation[1] == ""){
        written_anotation_placeholder.orientation[1] = "Anotação"
    }
    if(written_anotation_placeholder.movement[0] == ""){
        written_anotation_placeholder.movement[0] = "Anotação"
    }
    if(written_anotation_placeholder.movement[1] == ""){
        written_anotation_placeholder.movement[1] = "Anotação"
    }
    if(written_anotation_placeholder.movement[2] == ""){
        written_anotation_placeholder.movement[2] = "Anotação"
    }
    
    export let anotation_options =  [{name:"Anotados", show: true}, {name: "Anotação não terminada", show: true}, {name: "Por anotar", show: true}]
	export let theme_options : {name: string, show: boolean}[] = []
	export let theme_edit_options : {name: string, show: boolean}[] = []

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
    
    themes.forEach((theme: string) => {
		let option = {name: theme, show: (sign.theme.includes(theme))}
		theme_edit_options.push(option)
	})
    
   
    // $: anotatedCount = folder.signs_id.filter((v: any) => v.anotated).length;
    $: current_video = sign.video

    let signStores = new Map<any, any>(); // Map to store separate stores for each sign

    if(anotationArray == null){
        anotationArray = {configuration : [],
                             movement : [],
                             location : [],
                             orientation : [],
                             expression : []
        }
    }

    // Create and initialize a separate store for each sign
    data.signs.forEach((sign: any, index: number) => {

        database_annotation = sign.anotation
        database_ann_array = []
        if(database_annotation){
            database_ann_array = database_ann_array.concat(database_annotation["configuration"],
            database_annotation["movement"],
            database_annotation["location"],
            database_annotation["orientation"],
            database_annotation["expression"],
            database_annotation["theme"])
            signsAnotation.set(sign.id, database_annotation)
        }

        const store = writable(new Map<any, boolean>());
        data.parameters.forEach((par: { id: any; }) => {
            store.update(map => {
                const newMap = new Map(map);
                newMap.set(par.id, database_ann_array.includes(par.id));
                return newMap;
            }); 
        });
        signStores.set(sign.id, store)
    });
    
    function getSignById(id : any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }
    
  
    async function insertAnotation(annotation: AnnotationArray, sign_id: number) {
    
        let db_annotation_array = getSignById(sign_id).annotation_array

        if(annotation.configuration){
            annotation.configuration.forEach((parameter) => {
                db_annotation_array[parameter] = 1
            })
        } else if(annotation.movement){
            annotation.movement.forEach((parameter) => {
                db_annotation_array[parameter] = 1
            })
        } else if(annotation.location){
            annotation.location.forEach((parameter) => {
                db_annotation_array[parameter] = 1
            })
        } else if(annotation.orientation){
            annotation.orientation.forEach((parameter) => {
                db_annotation_array[parameter] = 1
            })
        } else if(annotation.expression){
            annotation.expression.forEach((parameter) => {
                db_annotation_array[parameter] = 1
            })
        }

        const { data, error } = await supabase
            .from('signs')
            // .select()
            .update({ anotation: annotation , 
                last_changed: ((new Date()).toISOString()).toLocaleString(), 
                annotation_array: db_annotation_array}) 
            .eq('id', sign_id);


        console.log("data: ", data, " error: ", error);
    }

    async function editNameAndTheme(name: string, theme: string[]) {
     

        const { data, error } = await supabase
            .from('signs')
            // .select()
            .update({name: name, theme: theme , last_changed: ((new Date()).toISOString()).toLocaleString()}) 
            .eq('id', sign.id);


        console.log("data: ", data, " error: ", error);
    }

    async function update_is_anotated(annotation : AnnotationArray, sign_id : number) {
        let is_anotated = 0;

        if(annotation.location.length > 0 &&
        annotation.movement.length > 0 &&
        annotation.expression.length > 0 &&
        annotation.orientation.length > 0 &&
        annotation.configuration.length > 0){
            is_anotated = 2
        } else if (annotation.location.length > 0 ||
        annotation.movement.length > 0 ||
        annotation.expression.length > 0 ||
        annotation.orientation.length > 0 ||
        annotation.configuration.length > 0){
            is_anotated = 1
        } 

        const { data, error } = await supabase
            .from('signs')
            // .select()
            .update({ is_anotated: is_anotated , last_changed: ((new Date()).toISOString()).toLocaleString()}) // Update with the annotation object
            .eq('id', sign_id);

        console.log("data: ", data, " error: ", error);
    }

    async function insertWrittenAnotation(written_anotation: {configuration: string, movement : string[], orientation: string[]}, sign_id: number) {
    

    const { data, error } = await supabase
        .from('signs')
        // .select()
        .update({ written_anotation: written_anotation , last_changed: ((new Date()).toISOString()).toLocaleString()}) 
        .eq('id', sign_id);


        console.log("data: ", data, " error: ", error);
    }


    function useToast(message: number){

        open = false;

        if(message == 0){
            toast('A editar nome e temas', {
            action: {
                label: 'Ok',
                onClick: () => {}
            },})
        } else if (message == 1) {
            toast('Alterações guardadas!', {
            action: {
                label: 'Ok',
                onClick: () => reloadPage()
            },})
        } else if (message == 2){
            toast('Tem anotações por guardar!', {
            action: {
                label: 'Ok',
                onClick: () => {}
            },})
        } else if (message == 3){
            toast('Anotação guardada!', {
            action: {
                label: 'Ok',
                onClick: () => reloadPage()
            },})
        }
}
    function endAnotation() {
        console.log("End annotation");

        signsAnotation.forEach((annotation, key) => {
            if (annotation) {
                console.log("1 annotation:", annotation);
                console.log("key:", key);
                insertAnotation(annotation, key);
                update_is_anotated(annotation, key)
            }
        });

        insertWrittenAnotation(written_anotation, sign.id)

        exist_changes = false
        useToast(3)
    } 

    let tab_colors = {configuracao :"configuracao:",
                    movimento :"movimento:",
                    localizacao :"localizacao:",
                    orientacao :"orientacao:",
                    expressoes :"expressoes:"}

    if (anotationArray.configuration.length > 0){
        tab_colors.configuracao += "2"
        } else {
        tab_colors.configuracao += "0"
    }
    if (anotationArray.movement.length > 0){
        tab_colors.movimento += "2"
        } else {
        tab_colors.movimento += "0"
    }
    if (anotationArray.location.length > 0){
        tab_colors.localizacao += "2"
        } else {
        tab_colors.localizacao += "0"
    }
    if (anotationArray.orientation.length > 0){
        tab_colors.orientacao += "2"
        } else {
        tab_colors.orientacao += "0"
    }
    if (anotationArray.expression.length > 0){
        tab_colors.expressoes += "2"
        } else {
        tab_colors.expressoes += "0"
    }

    function toggleEdit(){
        let themes_to_update : string[] = []
        let initial_edit_mode = edit_mode
        if(edit_mode){
            theme_edit_options.forEach((theme) => {
                if(theme.show){
                    themes_to_update.push(theme.name)
                }
            })

            if(new_name == ""){
                new_name = sign.name
            }

            editNameAndTheme(new_name, themes_to_update)
            useToast(1)
        }

        edit_mode = !edit_mode
        add_theme = false

        if (!edit_mode){
            theme_edit_options = []
            themes.forEach((theme: string) => {
                let option = {name: theme, show: (sign.theme.includes(theme))}
                theme_edit_options.push(option)
	        })
        }

        if(!initial_edit_mode && edit_mode){
            useToast(0)
        }

        console.log(themes_to_update)
    }

    function toggleAddTheme(){
        if(add_theme && new_theme != ""){
            themes.push(new_theme)
            theme_edit_options.push({name: new_theme, show: true})
        }
        add_theme = ! add_theme
    }

    function addNewTheme(){
        themes_to_display.push(new_theme)
    }


    function extractPath(url: string): string {
        const regex = /storage\/v1\/object\/public\/Signs\/([^?]*)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        throw new Error("Could not extract path from the given URL");
    }

    async function deleteSign() {
        let video_link = sign.video

        if(video_link){
            let file_path = extractPath(video_link)

            const { data, error } = await supabase
            .storage
            .from('Signs')
            .remove([file_path])

            console.log(data)
            console.log(error);
        }

		const response = await supabase
			.from('signs')
			.delete()
			.eq('id', sign.id);

		console.log(response);
        
        goToManage()


		return response;
	}

    function goToManage(){
        goto('../manage')
    }

    function leaveAndSave(){
        endAnotation()
        goToManage()
    }
    
	function reloadPage() {
    	window.location.reload();
    }

    function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

    const fetchSignsDebounced = debounce(fetchSigns, 350);

    $: $searchQuery, fetchSignsDebounced();

    async function fetchSigns() {
    const searchQueryValue = $searchQuery.trim();
    let query = supabase.from("signs").select().order('theme', { ascending: true }).order('name', { ascending: true });

    // Query for tags first to see if the search term matches any tags
    const { data: tagsData } = await supabase
        .from("signs")
        .select("theme")
        .contains('theme', [searchQueryValue]);

    if (tagsData && tagsData.length > 0) {
        // If there are matching tags, filter by them
        query = query.contains('theme', [searchQueryValue]);
    } else {
        // If no tags are found, search by name
        query = query.ilike('name', `%${searchQueryValue}%`);
    }

    const { data: signsData, error } = await query;

    if (error) {
        console.error('Error fetching signs:', error);
    } else {
        console.log('Fetched signs data:', signsData);
        data.signs = signsData ?? [];
    }
}

</script>




<div class="flex flex-row px-5 pt-5 sticky top-0">
    <div class="flex-none">
        <Sheet.Root bind:open={sheet_open}>
            <Sheet.Trigger>
                <div class="flex flex-col gap-1 items-center">
                    <Line_3Horizontal />
                </div>
            </Sheet.Trigger>
            <Sheet.Content side=left class="flex flex-grow justify-center">
                
                <div class="flex flex-col items-center w-full mt-5">
                    <Input
                        type="text"
                        placeholder="Pesquisa"
                        class="w-3/4 max-w-xs mb-1"
                        bind:value={$searchQuery}
                        on:input={() => fetchSignsDebounced()} />
                    
                    <!-- Place your buttons here -->
                    <div class="flex flex-col items-center overflow-y-auto">
                        <Sidebar data={data} bind:current_sign={sign} bind:anotation_options={anotation_options} bind:theme_options={theme_options}/>
                    </div>
                </div>
            </Sheet.Content>
        </Sheet.Root>
    </div>

    <div class="flex grow items-center"></div>

    <div class="flex flex-row gap-2">
        <Button variant="outline" on:click={endAnotation}>
            {#if exist_changes}
                Guardar
            {:else}
                Guardado
            {/if}
        </Button>


        <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button variant = "ghost">
                <Trash />
            </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Tem a certeza que quer apagar este gesto?</AlertDialog.Title>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel> Cancelar </AlertDialog.Cancel>
                <AlertDialog.Action on:click={deleteSign}> Continuar </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        
        {#if exist_changes || edit_mode}
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button variant = "ghost">
                        <Xmark />
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                <AlertDialog.Header>
                    <AlertDialog.Title>Deseja guardar as alterações?</AlertDialog.Title>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Cancel on:click={goToManage}> Sair sem Guardar </AlertDialog.Cancel>
                    <AlertDialog.Action on:click={leaveAndSave}> Sair e Guardar </AlertDialog.Action>
                </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog.Root>
        {:else}
            <Button variant = "ghost" on:click={goToManage}>
                <Xmark />
            </Button>
        {/if}

          

        
    </div>

</div>

<div class="flex flex-col items-center gap-y-3 py-5">

    <div class="flex flex-row gap-x-4 pb-3">
        
            {#if current_video}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video class="flex aspect-video w-72" controls>
                        <source src={current_video} type="video/mp4">
                    </video>
            {:else}
                <Card.Root class="flex items-center justify-center h-40 aspect-video">
                    <PlayFill />
                </Card.Root>
            {/if}


    </div>

    <div class="flex flex-row  w-72 gap-3">
        <div class="flex flex-1"></div>


        <div class="flex flex-col items-center">
        
            <div class="flex flex-row gap-2 items-center">
                <div class="flex flex-1">
                </div>
                <div class="flex">
                    {#if edit_mode}
                    <div class="flex flex-row gap-3 items-center">
                        <div class="font-bold">
                            Nome:
                        </div>
                        <Input placeholder={sign.name} bind:value={new_name}/>
                    </div>
                    {:else}
                        {new_name}
                    {/if}
                </div>
            </div>

            <div class="flex flex-row text-sm gap-3 items-center">
                {#if edit_mode}
                    <div class="flex font-bold">
                        Temas:
                    </div>
                    <DropdownButton label = {themes_to_display} bind:options={theme_edit_options} edit_mode={edit_mode}/>
                    <Button variant="ghost" on:click={toggleAddTheme}> 
                        {#if add_theme}
                            <Minus />
                        {:else}
                            <Plus/>
                        {/if}
                    </Button>
                {:else}
                    {themes_to_display}
                {/if}
            </div>

            <div class="flex flex-col gap-3">
                {#if edit_mode && add_theme}
                <div class="flex flex-row text-sm gap-2 items-center">
                        <div class="font-bold">
                            Novo tema:
                        </div>
                        <Input placeholder="" class="flex w-48" bind:value={new_theme}/>
        
                    </div>
                    <div class="flex flex-row place-content-end">
                        <Button variant="outline" on:click={addNewTheme}>
                            Acrescentar tema
                        </Button>
                    </div>
                {/if}
            </div>

        </div>

        <div class="flex flex-1 justify-end">
            <Button variant="outline" class="flex" on:click={toggleEdit}>
                {#if edit_mode}
                    A Editar
                {:else}
                    Editar
                {/if}
            </Button>
        </div>
    </div>

  

    <div>
        <Tabs.Root value="configuracao" class="flex flex-col items-center gap-y-2">
            <Tabs.List class="flex items-center w-fit">
                <Tabs.Trigger value={tab_colors.configuracao}>Configuração</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.orientacao}>Orientação</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.localizacao}>Localização</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.movimento}>Movimento</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.expressoes}>Expressões</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="configuracao">
                <div class="flex items-center">
                    <ParametersOptions data={data} 
                                            currentTab={"configuracao"} 
                                            bind:anotationArray={anotationArray} 
                                            isParSelected={signStores.get(sign.id)} 
                                            bind:signsAnotation={signsAnotation} 
                                            bind:sign={sign}
                                            bind:exist_changes={exist_changes}
                                            />
                </div>    
                    <div class="flex flex-row sticky justify-center pt-8 bottom-4 bg-white bg-blend-overlay">
                        <form class="flex bg-white">
                            <div class="flex relative w-60">
                                <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.configuration}/>
                            </div>
                        </form>
                    </div>
            </Tabs.Content>
            <Tabs.Content value="orientacao">
                <div class="flex items-center">
                    <ParametersOptions data={data} 
                                        currentTab={"orientacao"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores.get(sign.id)} 
                                        bind:signsAnotation={signsAnotation} 
                                        bind:sign={sign}
                                        bind:exist_changes={exist_changes}
                                        />
                </div>
                <div class="flex flex-row sticky justify-center pt-8 gap-4 bottom-4 w-full bg-white bg-blend-overlay">
                    <form class="flex bg-white">
                        <div class="flex relative w-60">
                            <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.orientation[0]}/>
                        </div>
                    </form>
                    <form class="flex bg-white">
                        <div class="flex relative w-60">
                            <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.orientation[1]}/>
                        </div>
                    </form>
                </div>
            </Tabs.Content>
            <Tabs.Content value="localizacao">
                <div class="flex items-center">
                    <ParametersOptions data={data} 
                                        currentTab={"localizacao"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores.get(sign.id)} 
                                        bind:signsAnotation={signsAnotation} 
                                        bind:sign={sign}
                                        bind:exist_changes={exist_changes}
                                        />
                </div>
            </Tabs.Content>
            <Tabs.Content value="movimento">
                <div class="flex items-center">
                    <ParametersOptions data={data} 
                                            currentTab={"movimento"} 
                                            bind:anotationArray={anotationArray} 
                                            isParSelected={signStores.get(sign.id)} 
                                            bind:signsAnotation={signsAnotation} 
                                            bind:sign={sign}
                                            bind:exist_changes={exist_changes}
                                            />
                </div>    
                                        <div class="flex flex-row sticky justify-center pt-8 gap-4 bottom-4  bg-white bg-blend-overlay">
                                            <form class="flex bg-white">
                                                <div class="flex relative w-40">
                                                    <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.movement[0]}/>
                                                </div>
                                            </form>
                                            <form class="flex bg-white">
                                                <div class="flex relative w-40">
                                                    <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.movement[1]}/>
                                                </div>
                                            </form>
                                            <form class="flex bg-white">
                                                <div class="flex relative w-40">
                                                    <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.movement[2]}/>
                                                </div>
                                            </form>
                                        </div>
            </Tabs.Content>
            <Tabs.Content value="expressoes">
                <div class="flex items-center">
                    <ParametersOptions data={data} 
                                            currentTab={"expressao facial"} 
                                            bind:anotationArray={anotationArray} 
                                            isParSelected={signStores.get(sign.id)} 
                                            bind:signsAnotation={signsAnotation} 
                                            bind:sign={sign}
                                            bind:exist_changes={exist_changes}
                                            />
                </div>    
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>


<div class="fixed bottom-0 right-0 p-3">
    
</div>