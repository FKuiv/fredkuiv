<script lang="ts">
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { animationScripts, scrollPercent } from '$lib/store';
	import { Text } from '@threlte/extras';
	import { degToRad } from 'three/src/math/MathUtils.js';
	let textScale: [x: number, y: number, z: number] = [0, 0, 0];
	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1],
			func: () => {
				const scalePercentFunction = scalePercent(
					scrollSections[1].start,
					scrollSections[1].end,
					$scrollPercent
				);

				textScale = [
					lerp(0, 1, scalePercentFunction),
					lerp(0, 1, scalePercentFunction),
					lerp(0, 1, scalePercentFunction)
				];
			},

			clearFunc: () => {}
		});
		return currentValue;
	});
</script>

<Text
	text={'Hello World'}
	fontSize={4}
	color={'white'}
	scale={textScale}
	position={[0, 0, 0]}
	rotation={[0, degToRad(90), 0]}
/>
