<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Stars } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { quadInOut, quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { Vector3, BufferGeometry, Color, type NormalBufferAttributes } from 'three';

	let cameraXPos = tweened(100, {
		duration: 1000,
		easing: quintInOut
	});
	let cameraFOV = tweened(180, {
		duration: 2000,
		easing: quadInOut
	});

	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30);
			cameraFOV.set(60);
		});
		// Scroll to the top of the page
		window.scrollTo(0, 0);
	});
	let aspectRatio = window.innerWidth / window.innerHeight; // Assuming your canvas takes up the whole window
	let geometry: BufferGeometry<NormalBufferAttributes>;
	$: {
		let cameraPosition = new Vector3($cameraXPos, 4, 0);
		let distance = cameraPosition.length();
		let visibleHeight = 2 * Math.tan(($cameraFOV / 2) * (Math.PI / 180)) * distance;
		let visibleWidth = visibleHeight * aspectRatio;
		let points = [
			new Vector3(-visibleWidth / 2, visibleHeight, -visibleWidth),
			new Vector3(0, -visibleHeight / 2, visibleWidth / 2)
		];

		geometry = new BufferGeometry().setFromPoints(points);
	}
</script>

<Stars />

<T.PerspectiveCamera
	makeDefault
	position={[$cameraXPos, 4, 0]}
	fov={$cameraFOV}
	on:create={({ ref }) => {
		// Look at the center
		ref.lookAt(0, 0, 0);
	}}
>
	<OrbitControls />
</T.PerspectiveCamera>
<T.Line {geometry}>
	<T.LineBasicMaterial color={new Color('red')} />
</T.Line>
<T.AmbientLight intensity={1} />
