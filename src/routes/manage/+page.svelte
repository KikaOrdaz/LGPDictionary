<script lang="ts">
    import FileTable from '../../lib/components/FileTable.svelte';
    import Upload from '../../lib/components/Upload.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import DropdownButton from '$lib/components/DropdownButton.svelte';
    import { writable } from 'svelte/store';
    export let data;
    import DropdownRadioButton from '$lib/components/DropdownRadioButton.svelte';
    import { supabase } from "$lib/supabaseClient";
    import Button from '$lib/components/ui/button/button.svelte';
    import CheckmarkCircle from '$lib/img/checkmark_circle.svelte';
    import CheckmarkCircleFill from '$lib/img/checkmark_circle_fill.svelte';
    import Trash from '$lib/img/trash.svelte';
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import type { EventHandler } from 'svelte/elements';

    let themes: string[] = [];
    export let anotation_options = [{ name: "Anotados", show: true }, { name: "Anotação não terminada", show: true }, { name: "Por anotar", show: true }];
    export let theme_options: { name: string, show: boolean }[] = [];
    export let order: string;
    export let signs_to_delete: number[] = [];

    let selection = false;
    const searchQuery = writable('');

    function toggleSelection() {
        selection = !selection;
    }

    function getSignById(id: any) {
        return data.signs.find((item: { id: any; }) => item.id === id);
    }

    async function deleteSign(sign_id: number) {
        let video_link = getSignById(sign_id).video;

        if (video_link) {
            let file_path = extractPath(video_link);

            const { data, error } = await supabase
                .storage
                .from('Signs')
                .remove([file_path]);

            console.log(data);
            console.log(error);
        }

        const response = await supabase
            .from('signs')
            .delete()
            .eq('id', sign_id);

        console.log(response);

        return response;
    }

    function extractPath(url: string): string {
        const regex = /storage\/v1\/object\/public\/Signs\/([^?]*)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        throw new Error("Could not extract path from the given URL");
    }

    function deleteSelectedSigns() {
        console.log("A apagar");
        console.log(signs_to_delete);
        const promises = signs_to_delete.map((id: number) => deleteSign(id));

        Promise.all(promises).then(() => {
            window.location.reload();
        });
    }

    data.signs.forEach((sign: any) => {
        sign.theme.forEach((theme: string) => {
            if (!(themes.indexOf(theme) > -1)) {
                themes.push(theme);
            }
        });
    });

    themes.forEach((theme: string) => {
        let option = { name: theme, show: true };
        theme_options.push(option);
    });

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

        if (searchQueryValue.startsWith("Tags:")) {
            const tagName = searchQueryValue.replace("Tags:", "").trim();
            query = query.contains('theme', [tagName]);
        } else {
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

<div class="flex flex-col pt-10">
    <div class="flex flex-row px-3 pb-5">
        <div class="flex-1"></div>
        <div class="w-8/12">
            <div class="relative">
                <Input
                    type="text"
                    placeholder="Pesquisa"
                    class="pl-8"
                    bind:value={$searchQuery}
                    on:input={() => fetchSignsDebounced()} />
            </div>
        </div>
        <div class="flex flex-1 justify-end gap-5">
            {#if selection}
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button variant="outline">
                            <Trash />
                        </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content>
                        <AlertDialog.Header>
                            <AlertDialog.Title>Tem a certeza que quer apagar estes gestos?</AlertDialog.Title>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                            <AlertDialog.Cancel> Cancelar </AlertDialog.Cancel>
                            <AlertDialog.Action on:click={deleteSelectedSigns}> Continuar </AlertDialog.Action>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            {/if}

            <Button variant="outline" on:click={toggleSelection}>
                {#if !selection}
                    <CheckmarkCircle />
                {:else}
                    <CheckmarkCircleFill />
                {/if}
            </Button>

            <Upload database={data} />
        </div>
    </div>

    <div class="flex flex-row px-3 pb-5 justify-between items-center gap-2">
        <div class="flex flex-1"></div>

        <div class="flex place-items-center gap-3">
            <DropdownButton label={"Filtrar Por Anotação"} bind:options={anotation_options} />
            <DropdownButton label={"Filtrar por Temas"} bind:options={theme_options} />
            <DropdownRadioButton bind:order={order} />
        </div>

        <div class="flex flex-1 flex-row justify-end"></div>
    </div>

    <FileTable data={data} bind:theme_options={theme_options} bind:anotation_options={anotation_options} selection={selection} bind:signs_to_delete={signs_to_delete} />

</div>
