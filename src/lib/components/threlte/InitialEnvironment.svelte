<script lang="ts">
	import { animationScripts, scrollPercent } from '$lib/store';
	import { T } from '@threlte/core';
	import { OrbitControls, Stars } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { quadInOut, quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { BufferGeometry, Vector3, CatmullRomCurve3, Plane } from 'three';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
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

	const bgCurve = new CatmullRomCurve3([
		new Vector3(28, -20, 0),
		new Vector3(26, -3, 0),
		new Vector3(25, -1, 0),
		new Vector3(0, -1, 0),
		new Vector3(-20, -1, 0),
		new Vector3(-21, 2, 0),
		new Vector3(-23, 30, 0)
	]);

	// Get points along the curve
	const bgCurvePoints = bgCurve.getPoints(35);
	// Create Geometry from the points
	const fullBgCurveGeometry = new BufferGeometry().setFromPoints(bgCurvePoints);

	let clippingPlane = new Plane(new Vector3(0, -1, 0), 0);
	let currentPlanePos = 1;
	// init plane position
	clippingPlane.setFromNormalAndCoplanarPoint(
		bgCurve.getTangent(currentPlanePos).negate(),
		bgCurve.getPoint(currentPlanePos)
	);

	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1],
			func: () => {
				currentPlanePos = lerp(
					1,
					0,
					scalePercent(scrollSections[1].start, scrollSections[1].end, $scrollPercent)
				);
				const point = bgCurve.getPoint(currentPlanePos);
				const tangent = bgCurve.getTangent(currentPlanePos).negate();
				clippingPlane.setFromNormalAndCoplanarPoint(tangent, point);
			}
		});
		return currentValue;
	});
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

<T.AmbientLight intensity={1} />

{#each lineZPositions as zPos}
	<T.Line geometry={fullBgCurveGeometry} position.z={zPos}>
		<T.LineBasicMaterial clippingPlanes={[clippingPlane]} color="gray" />
	</T.Line>
{/each}
