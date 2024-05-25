<script lang="ts">
	import { T } from '@threlte/core';
	import { Color } from 'three';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import InitialEnvironment from './InitialEnvironment.svelte';
	import { degToRad } from 'three/src/math/MathUtils.js';

	let cubeRotation = 0;
	let scrollPercentage = 0;

	const animationScripts: { start: number; end: number; func: () => void }[] = [];
	animationScripts.push({
		start: 0,
		end: 30,
		func: () => {
			cubeRotation = lerp(0, 140, scalePercent(0, 30, scrollPercentage));
		}
	});
	function animate() {
		animationScripts.forEach((script) => {
			if (scrollPercentage >= script.start && scrollPercentage <= script.end) {
				script.func();
			}
		});
	}

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

<InitialEnvironment />

<T.Mesh position={[10, 2, 0]} rotation={[0, 0, degToRad(cubeRotation)]}>
	<T.BoxGeometry args={[5, 5, 5]} />
	<T.MeshStandardMaterial color={new Color(0x00ff00)} wireframe />
</T.Mesh>
