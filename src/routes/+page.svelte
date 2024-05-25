<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/threlte/Scene.svelte';
</script>

<main class="h-[100vh] w-[100vw]">
	<Canvas>
		<Scene />
	</Canvas>

	<!-- Scrollable area -->
	<div class="h-[200vw]" />
</main>
