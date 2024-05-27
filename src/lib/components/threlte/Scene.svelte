<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Color } from 'three';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import InitialEnvironment from './InitialEnvironment.svelte';
	import { degToRad } from 'three/src/math/MathUtils.js';
	import { animationScripts, scrollPercent } from '$lib/store';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';

	const { renderer } = useThrelte();
	renderer.localClippingEnabled = true;

	let cubeRotation = 0;
	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1],
			func: () => {
				cubeRotation = lerp(
					0,
					140,
					scalePercent(scrollSections[1].start, scrollSections[1].end, $scrollPercent)
				);
			}
		});
		return currentValue;
	});

	function animate() {
		animationScripts.subscribe((scripts) => {
			scripts.forEach((script) => {
				if ($scrollPercent >= script.section.start && $scrollPercent <= script.section.end) {
					script.func();
				}
			});
		});
	}

	window.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercent.set(
			((document.documentElement.scrollTop || document.body.scrollTop) /
				((document.documentElement.scrollHeight || document.body.scrollHeight) -
					document.documentElement.clientHeight)) *
				100
		);
		animate();
	};
</script>

<InitialEnvironment />

<T.Mesh position={[0, 4, 0]} rotation={[0, 0, degToRad(cubeRotation)]}>
	<T.BoxGeometry args={[5, 5, 5]} />
	<T.MeshStandardMaterial color={new Color(0x00ff00)} wireframe />
</T.Mesh>
