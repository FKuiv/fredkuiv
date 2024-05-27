<script lang="ts">
	import { T } from '@threlte/core';
	import { Color } from 'three';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { degToRad } from 'three/src/math/MathUtils.js';
	import { animationScripts, scrollPercent } from '$lib/store';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';

	let cubeRotation = 0;
	let cubeScale = [5, 5, 5];
	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1],
			func: () => {
				cubeRotation = lerp(
					0,
					180,
					scalePercent(scrollSections[1].start, scrollSections[1].end, $scrollPercent)
				);
				cubeScale[1] = lerp(
					5,
					0,
					scalePercent(scrollSections[1].start, scrollSections[1].end, $scrollPercent)
				);
				cubeScale[0] = lerp(
					5,
					0,
					scalePercent(scrollSections[1].start, scrollSections[1].end, $scrollPercent)
				);
			}
		});
		return currentValue;
	});
</script>

<T.Mesh position={[0, 4, 0]} rotation={[0, 0, degToRad(cubeRotation)]}>
	<T.BoxGeometry args={cubeScale} />
	<T.MeshStandardMaterial color={new Color(0x00ff00)} wireframe />
</T.Mesh>
