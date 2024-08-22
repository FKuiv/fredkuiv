<script lang="ts">
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { animationScripts, currentStoryText, scrollPercent } from '$lib/store';
	import storyTexts from '$lib/texts';
	import StoryCard from './StoryCard.svelte';
	let currentCard = 0;
	// currentStoryText.set(storyTexts[currentCard]);
	// animationScripts.update((currentValue) => {
	// 	currentValue.push({
	// 		section: scrollSections[2],
	// 		func: () => {
	// 			currentPlanePos = lerp(1, 0, scalePercent(scrollSections[1], $scrollPercent));
	// 		},
	// 		clearFunc: () => {}
	// 	});
	// 	return currentValue;
	// });
</script>

{#each storyTexts as text, i}
	{#if currentCard === i}
		<StoryCard {text} pos={1} />
	{:else if currentCard === i - 1}
		<StoryCard {text} pos={0} />
	{:else if currentCard === i + 1}
		<StoryCard {text} pos={2} />
	{/if}
{/each}
