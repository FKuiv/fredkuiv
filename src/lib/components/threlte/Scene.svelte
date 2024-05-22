<script>
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import { BufferGeometry, Vector3, CatmullRomCurve3, LineBasicMaterial } from 'three';
	const linePositions = Array.from({ length: 51 }, (_, i) => (i - 25) * 1);
	const points = [
		new Vector3(-16, -1, 0),
		new Vector3(-17, -1, 0),
		new Vector3(-19, -0.5, 0),
		new Vector3(-22, 1, 0),
		new Vector3(-22, 2, 0)
	];

	// Create a CatmullRomCurve3 with the points
	const curve = new CatmullRomCurve3(points);

	// Get points along the curve
	const curvePoints = curve.getPoints(15);

	// Create a BufferGeometry from the points
	const lineGeo = new BufferGeometry().setFromPoints(curvePoints);
</script>

<T.PerspectiveCamera
	makeDefault
	position={[20, 5, 0]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position={[1, 0, 0]} />
<T.DirectionalLight intensity={0.8} position={[0, 2, 1]} />
<T.AmbientLight intensity={0.1} />

<T.Mesh position={[0, 0, 0]}>
	<T.BoxGeometry args={[2, 2, 2]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>

<Grid
	gridSize={[40, 50]}
	cellColor="#fff"
	type="lines"
	axis="y"
	position.y={-1}
	position.x={3}
	sectionSize={0}
/>
<Grid
	gridSize={[50, 20]}
	cellColor="#fff"
	plane="zy"
	type="lines"
	axis="x"
	position.y={12}
	position.x={-22}
	sectionSize={0}
/>

{#each linePositions as zPos}
	<T.Line geometry={lineGeo} position.z={zPos}>
		<T.LineBasicMaterial color="gray" />
	</T.Line>
{/each}
