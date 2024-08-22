<script lang="ts">
	import { T } from '@threlte/core';
	import { Color } from 'three';
	import { degToRad } from 'three/src/math/MathUtils.js';
	import { animationScripts, scrollPercent } from '$lib/store';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';

	let cubeYRotation = 0;
	let cubePosition: [x: number, y: number, z: number] = [0, 4, 0];
	let cubeScale = [5, 5, 5];
	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1],
			func: () => {
				const scalePercentFunction = scalePercent(scrollSections[1], $scrollPercent);
				cubeYRotation = lerp(0, 180, scalePercentFunction);

				cubePosition = [0, lerp(4, 6, scalePercentFunction), lerp(0, -12, scalePercentFunction)];
			},
			clearFunc: () => {}
		});
		return currentValue;
	});
</script>

<T.Mesh position={cubePosition} rotation={[0, degToRad(cubeYRotation), 0]}>
	<T.BoxGeometry args={cubeScale} />
	<T.MeshStandardMaterial color={new Color(0x00ff00)} wireframe />
</T.Mesh>
