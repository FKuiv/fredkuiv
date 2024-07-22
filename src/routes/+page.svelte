<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/Scene.svelte';
</script>

<main class="h-[100vh] w-[100vw]">
	<Canvas>
		<Scene />
	</Canvas>

	<!-- Scrollable area -->
	<div class="h-[600vw]" />
	<button
		on:pointerup={() => {
			const totalScrollableHeight =
				(document.documentElement.scrollHeight || document.body.scrollHeight) -
				document.documentElement.clientHeight;

			const twentyPercentScrollableHeight = totalScrollableHeight * 0.21;

			window.scrollTo({ top: twentyPercentScrollableHeight, behavior: 'smooth' });
		}}
		class="fixed bottom-0 text-md left-1/2 -translate-x-1/2 select-none mb-2 text-white/70 hover:text-white hover:text-lg transition-all"
		>Fred Kuiv</button
	>
</main>
