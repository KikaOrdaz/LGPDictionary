<script lang="ts">
    import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import PlayFill from '$lib/img/play_fill.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import ParametersOptions from '$lib/components/ParametersOptions.svelte';
    import * as Sheet from "$lib/components/ui/sheet";
    import Line_3Horizontal from '$lib/img/line_3_horizontal.svelte';
    import Sidebar from "$lib/components/Sidebar.svelte"
    import Xmark from '$lib/img/xmark.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { supabase } from "$lib/supabaseClient";
    import Pencil from '$lib/img/pencil.svelte';
    import Checkmark from '$lib/img/checkmark.svelte'
    import DropdownButton from '$lib/components/DropdownButton.svelte';
    import Plus from '$lib/img/plus.svelte'
    import Minus from '$lib/img/minus.svelte'
    import Trash from '$lib/img/trash.svelte'

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
    let edit_mode = false
    let add_theme = false
    
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
    

        const { data, error } = await supabase
            .from('signs')
            // .select()
            .update({ anotation: annotation , last_changed: ((new Date()).toISOString()).toLocaleString()}) 
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
</script>




<div class="flex flex-row px-5 pt-5 sticky top-0">
    <div class="flex-none">
        <Sheet.Root>
            <Sheet.Trigger>
                <div class="flex flex-col gap-1 items-center">
                    <Line_3Horizontal />
                    <!-- {anotatedCount}/{folder.signs_id.length} -->
                </div>
            </Sheet.Trigger>
            <Sheet.Content side=left class="flex flex-grow justify-center">
                <Sidebar data={data} bind:current_sign={sign} bind:anotation_options={anotation_options} bind:theme_options={theme_options}/>
            </Sheet.Content>
          </Sheet.Root>
    </div>
    <div class="flex grow items-center">
        <!-- {#if edit_mode}
            Editar nome e tema
        {/if} -->
    </div>

    <div class="flex flex-row">
        <Button variant="ghost" class="flex flex-1" on:click={toggleEdit}>
            {#if edit_mode}
                <Checkmark />
            {:else}
                <Pencil />
            {/if}
        </Button>

        <Button variant = "ghost" on:click>
            <Trash />
        </Button>

        <a data-sveltekit-reload href="../manage">
            <Button variant = "ghost">
                <Xmark />
            </Button>
        </a>
    </div>

</div>

<div class="flex flex-col items-center gap-y-3 py-5">

    <div class="flex flex-row gap-x-4 pb-3">
        
            {#if current_video}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video width="320" height="240" controls>
                        <source src={current_video} type="video/mp4">
                    </video>
            {:else}
                <Card.Root class="flex items-center justify-center h-40 aspect-video">
                    <PlayFill />
                </Card.Root>
            {/if}


    </div>

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

    <div class="flex placeitems-center">
        <Tabs.Root value="configuracao" class="">
            <Tabs.List class="">
                <Tabs.Trigger value={tab_colors.configuracao}>Configuração</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.orientacao}>Orientação</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.localizacao}>Localização</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.movimento}>Movimento</Tabs.Trigger>
                <Tabs.Trigger value={tab_colors.expressoes}>Expressões</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="configuracao">
                    <ParametersOptions data={data} 
                                        currentTab={"configuracao"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores.get(sign.id)} 
                                        bind:signsAnotation={signsAnotation} 
                                        bind:sign={sign}
                                        />
                    <div class="flex flex-row sticky justify-center pt-8 bottom-4">
                        <form>
                            <div class="flex relative w-60">
                                <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.configuration}/>
                            </div>
                        </form>
                    </div>
            </Tabs.Content>
            <Tabs.Content value="orientacao">
                <ParametersOptions data={data} 
                                    currentTab={"orientacao"} 
                                    bind:anotationArray={anotationArray} 
                                    isParSelected={signStores.get(sign.id)} 
                                    bind:signsAnotation={signsAnotation} 
                                    bind:sign={sign}
                                    />
                <div class="flex flex-row sticky justify-center pt-8 gap-4 bottom-4">
                    <form>
                        <div class="flex relative w-60">
                            <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.orientation[0]}/>
                        </div>
                    </form>
                    <form>
                        <div class="flex relative w-60">
                            <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.orientation[1]}/>
                        </div>
                    </form>
                </div>
            </Tabs.Content>
            <Tabs.Content value="localizacao">
                <ParametersOptions data={data} 
                                    currentTab={"localizacao"} 
                                    bind:anotationArray={anotationArray} 
                                    isParSelected={signStores.get(sign.id)} 
                                    bind:signsAnotation={signsAnotation} 
                                    bind:sign={sign}
                                    />
            </Tabs.Content>
            <Tabs.Content value="movimento">
                    <ParametersOptions data={data} 
                                        currentTab={"movimento"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores.get(sign.id)} 
                                        bind:signsAnotation={signsAnotation} 
                                        bind:sign={sign}
                                        />
                                        <div class="flex flex-row sticky justify-center pt-8 gap-4 bottom-4">
                                            <form>
                                                <div class="flex relative w-40">
                                                    <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.movement[0]}/>
                                                </div>
                                            </form>
                                            <form>
                                                <div class="flex relative w-40">
                                                    <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.movement[1]}/>
                                                </div>
                                            </form>
                                            <form>
                                                <div class="flex relative w-40">
                                                    <Input placeholder="Anotação" class="pl-8" bind:value={written_anotation.movement[2]}/>
                                                </div>
                                            </form>
                                        </div>
            </Tabs.Content>
            <Tabs.Content value="expressoes">
                    <ParametersOptions data={data} 
                                        currentTab={"expressao facial"} 
                                        bind:anotationArray={anotationArray} 
                                        isParSelected={signStores.get(sign.id)} 
                                        bind:signsAnotation={signsAnotation} 
                                        bind:sign={sign}
                                        />
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>


<div class="fixed bottom-0 right-0 p-3">
    <!-- <a data-sveltekit-reload href="../manage">  -->
        <Button variant="outline" on:click={() => endAnotation()}>
            Guardar
        </Button>
    <!-- </a> -->
</div>