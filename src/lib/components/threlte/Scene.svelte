<script>
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { BufferGeometry, Vector3, CatmullRomCurve3 } from 'three';
	let cameraXPos = tweened(100, {
		duration: 1000,
		easing: quintInOut
	});
	const lineZPositions = Array.from({ length: 51 }, (_, i) => (i - 25) * 1);
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

	// Create a BufferGeometry from the points
	const lineGeo = new BufferGeometry().setFromPoints(curvePoints);
	const lineGeo2 = new BufferGeometry().setFromPoints(curvePoints2);
	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30);
		});
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[$cameraXPos, 5, 0]}
	on:create={({ ref }) => {
		ref.lookAt(0, -1, 0);
	}}
>
	<!-- <OrbitControls /> -->
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position={[1, 0, 0]} />
<T.DirectionalLight intensity={0.8} position={[0, 2, 1]} />
<T.AmbientLight intensity={0.1} />

<T.Mesh position={[0, 5, 0]}>
	<T.BoxGeometry args={[2, 2, 2]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>

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
