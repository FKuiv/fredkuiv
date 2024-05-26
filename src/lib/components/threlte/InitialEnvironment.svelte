<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls, Stars } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { quadInOut, quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { BufferGeometry, Vector3, CatmullRomCurve3, CubicBezierCurve3 } from 'three';
	let cameraXPos = tweened(100, {
		duration: 1000,
		easing: quintInOut
	});
	let cameraFOV = tweened(180, {
		duration: 2000,
		easing: quadInOut
	});
	// Create an array of z positions for the lines
	const lineZPositions = Array.from({ length: 51 }, (_, i) => (i - 25) * 1);

	// Create an array of points for the curve
	const fullPoints = [
		new Vector3(28, -20, 0),
		new Vector3(26, -3, 0),
		new Vector3(25, -1, 0),
		new Vector3(0, -1, 0),
		new Vector3(-20, -1, 0),
		new Vector3(-21, 2, 0),
		new Vector3(-23, 30, 0)
	];

	// Create a CatmullRomCurve3 with the points
	const fullCurve = new CatmullRomCurve3(fullPoints);

	// Get points along the curve
	const fullCurvePoints = fullCurve.getPoints(35);

	// Create Geometry from the points
	const fullLineGeo = new BufferGeometry().setFromPoints(fullCurvePoints);

	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30);
			cameraFOV.set(60);
		});
		// Scroll to the top of the page
		window.scrollTo(0, 0);
	});
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
	<!-- <OrbitControls /> -->
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 0, 10]} intensity={1} />
<T.AmbientLight intensity={1} />

{#each lineZPositions as zPos}
	<T.Line geometry={fullLineGeo} position.z={zPos}>
		<T.LineBasicMaterial color="gray" />
	</T.Line>
{/each}
