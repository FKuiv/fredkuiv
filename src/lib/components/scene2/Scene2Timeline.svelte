<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3, BufferGeometry, Color, type NormalBufferAttributes } from 'three';
	import { animationScripts, scrollPercent } from '$lib/store';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { getArrayCenter } from '$lib/helpers/calculateLineCenter';

	let geometry: BufferGeometry<NormalBufferAttributes>;
	let points: Vector3[] = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];

	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1.5],
			func: () => {
				const scalePercentFunction = scalePercent(
					scrollSections[1.5].start,
					scrollSections[1.5].end,
					$scrollPercent
				);
				points = [new Vector3(0, 2, 0), new Vector3(0, 2, lerp(0, 30, scalePercentFunction))];
			},
			clearFunc: () => {
				if ($scrollPercent < scrollSections[1.5].start) {
					points = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
				}
			}
		});

		currentValue.push({
			section: scrollSections[2],
			func: () => {
				const scalePercentFunction = scalePercent(
					scrollSections[2].start,
					scrollSections[2].end,
					$scrollPercent
				);
				points = [
					new Vector3(lerp(0, 50, scalePercentFunction), lerp(2, -2, scalePercentFunction), 0),
					new Vector3(0, lerp(2, 10, scalePercentFunction), lerp(50, 30, scalePercentFunction))
				];
			},
			clearFunc: () => {}
		});
		return currentValue;
	});

	$: {
		geometry = new BufferGeometry().setFromPoints(points);
	}
</script>

<T.Line {geometry} position={getArrayCenter(points[0], points[1], true)}>
	<T.LineBasicMaterial color={new Color('red')} />
</T.Line>
