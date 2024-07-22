<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Stars } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { animationScripts, cameraFOV, cameraXPos } from '$lib/store';
	import { SpotLight } from 'three';

	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30); //30
			cameraFOV.set(60); //60
		});
		// Scroll to the top of the page
		window.scrollTo(0, 0);
	});
	animationScripts.update((currentValue) => {
		return currentValue;
	});
</script>

<Stars />

<T.PerspectiveCamera
	makeDefault
	position={[$cameraXPos, 5, 0]}
	fov={$cameraFOV}
	far={150}
	on:create={({ ref }) => {
		// Look at the center
		ref.lookAt(0, 0, 0);
	}}
>
	<!-- <OrbitControls /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={1} />
<T.DirectionalLight position={[10, 2, -5]} intensity={1} castShadow />
