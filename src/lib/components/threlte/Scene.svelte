<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { quadInOut, quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { BufferGeometry, Vector3, CatmullRomCurve3, Color } from 'three';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	let cameraXPos = tweened(100, {
		duration: 1000,
		easing: quintInOut
	});
	let cameraFOV = tweened(180, {
		duration: 2000,
		easing: quadInOut
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
	let cubeXPos = 0;
	let scrollPercentage = 0;

	// Create a BufferGeometry from the points
	const lineGeo = new BufferGeometry().setFromPoints(curvePoints);
	const lineGeo2 = new BufferGeometry().setFromPoints(curvePoints2);
	const animationScripts: { start: number; end: number; func: () => void }[] = [];
	animationScripts.push({
		start: 0,
		end: 40,
		func: () => {
			cubeXPos = lerp(10, 0, scalePercent(0, 100, scrollPercentage));
			console.log(cubeXPos);
		}
	});
	function animate() {
		console.log('ANIMATINFj');
		animationScripts.forEach((script) => {
			if (scrollPercentage >= script.start && scrollPercentage <= script.end) {
				script.func();
			}
		});
	}
	onMount(() => {
		requestAnimationFrame(() => {
			cameraXPos.set(30);
			cameraFOV.set(60);
		});
		// Scroll to the top of the page
		window.scrollTo(0, 0);
	});
	window.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercentage =
			((document.documentElement.scrollTop || document.body.scrollTop) /
				((document.documentElement.scrollHeight || document.body.scrollHeight) -
					document.documentElement.clientHeight)) *
			100;
		animate();
	};
</script>

<T.PerspectiveCamera
	makeDefault
	position={[$cameraXPos, 2, 8]}
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

<T.Mesh position={[10, 2, 0]}>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color={new Color(0x00ff00)} />
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
