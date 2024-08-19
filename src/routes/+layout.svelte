<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { screenDimensions } from '$lib/store';

	// Function to update screen width
	const updateScreenWidth = () => {
		screenDimensions.set({ width: window.innerWidth, height: window.innerHeight });
	};

	// Set up event listener on mount
	onMount(() => {
		// Init the store value
		updateScreenWidth();
		window.addEventListener('resize', updateScreenWidth);

		// Clean up event listener on destroy
		return () => {
			window.removeEventListener('resize', updateScreenWidth);
		};
	});
</script>

<main class="h-[100vh] w-[100vw]">
	<slot />
	<button
		on:pointerup={() => {
			const totalScrollableHeight =
				(document.documentElement.scrollHeight || document.body.scrollHeight) -
				document.documentElement.clientHeight;

			const twentyPercentScrollableHeight = totalScrollableHeight * 0.21;

			window.scrollTo({ top: twentyPercentScrollableHeight, behavior: 'smooth' });
		}}
		class="fixed bottom-0 z-50 text-md left-1/2 -translate-x-1/2 select-none mb-2 text-white/70 hover:text-white hover:text-lg transition-all"
		>Fred Kuiv</button
	>
</main>
