<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Stars } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { animationScripts, cameraFOV, cameraXPos, scrollPercent } from '$lib/store';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { degToRad } from 'three/src/math/MathUtils.js';

	let cameraZpos = 0;
	let cameraRotation = 90;
	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30);
			cameraFOV.set(60);
		});
		// Scroll to the top of the page
		window.scrollTo(0, 0);
	});
	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[2],
			func: () => {
				cameraZpos = lerp(
					0,
					-10,
					scalePercent(scrollSections[2].start, scrollSections[2].end, $scrollPercent)
				);
				cameraRotation = lerp(
					90,
					120,
					scalePercent(scrollSections[2].start, scrollSections[2].end, $scrollPercent)
				);
			},
			clearFunc: () => {}
		});
		return currentValue;
	});
</script>

<Stars />

<T.PerspectiveCamera
	makeDefault
	position={[$cameraXPos, 5, cameraZpos]}
	fov={$cameraFOV}
	far={150}
	rotation={[0, degToRad(cameraRotation), 0]}
	on:create={({ ref }) => {
		// Look at the center
		ref.lookAt(0, 0, 0);
	}}
>
	<!-- <OrbitControls /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={1} />
