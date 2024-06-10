<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = TabsPrimitive.TriggerProps;
	type $$Events = TabsPrimitive.TriggerEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"];
	export { className as class };
	
	const substrings = value.split(":");
	
	let complete = substrings[1]

	value =  substrings[0]

	let color = "data-[state=inactive]:text-[#ffb3ba]"
	if(complete == "1") {
		color = "data-[state=inactive]:text-[#ffdfba]"
	} else if(complete == "2") {
		color = "data-[state=inactive]:text-[#c1e1c1]"
	}
</script>

<TabsPrimitive.Trigger
	class={cn(
		"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
		color,
		className
	)}
	{value}
	{...$$restProps}
	on:click
	on:keydown
	on:focus
>
	<slot />
</TabsPrimitive.Trigger>
