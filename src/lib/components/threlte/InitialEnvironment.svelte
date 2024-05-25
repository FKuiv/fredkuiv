<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { quadInOut, quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { BufferGeometry, Vector3, CatmullRomCurve3 } from 'three';
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
	const points = [
		new Vector3(-15, -1, 0),
		new Vector3(-17, -1, 0),
		new Vector3(-20, 0, 0),
		new Vector3(-22, 2, 0),
		new Vector3(-22, 4, 0)
	];
	const frontPoints = [new Vector3(25, -1, 0), new Vector3(28, -2, 0), new Vector3(30, -4, 0)];

	// Create a CatmullRomCurve3 with the points
	const curve = new CatmullRomCurve3(points);
	const curve2 = new CatmullRomCurve3(frontPoints);

	// Get points along the curve
	const curvePoints = curve.getPoints(25);
	const curvePoints2 = curve2.getPoints(25);

	// Create Geometry from the points
	const lineGeo = new BufferGeometry().setFromPoints(curvePoints);
	const lineGeo2 = new BufferGeometry().setFromPoints(curvePoints2);

	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30);
			cameraFOV.set(60);
		});
		// Scroll to the top of the page
		window.scrollTo(0, 0);
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[$cameraXPos, 2, 0]}
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

<!-- Floor grid -->
<Grid
	gridSize={[40, 50]}
	cellColor="#fff"
	type="lines"
	axis="y"
	position.y={-1}
	position.x={5}
	sectionSize={0}
/>
<!-- Back grid -->
<Grid
	gridSize={[50, 20]}
	cellColor="#fff"
	plane="zy"
	type="lines"
	axis="x"
	position.y={14}
	position.x={-22}
	sectionSize={0}
/>
<!-- Front grid -->
<Grid
	gridSize={[50, 50]}
	cellColor="#fff"
	plane="zy"
	type="lines"
	axis="x"
	position.y={-29}
	position.x={30}
	sectionSize={0}
/>
{#each lineZPositions as zPos}
	<T.Line geometry={lineGeo} position.z={zPos}>
		<T.LineBasicMaterial color="gray" />
	</T.Line>

	<T.Line geometry={lineGeo2} position.z={zPos}>
		<T.LineBasicMaterial color="gray" />
	</T.Line>
{/each}
