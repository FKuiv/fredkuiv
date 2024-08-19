<script lang="ts">
	import { screenDimensions } from '$lib/store';
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import { Color } from 'three';
	import { degToRad } from 'three/src/math/MathUtils.js';
	let theNormalizer = 0.04;
	let percentageOfScreen = {
		width: 0.5,
		height: 0.3
	};

	$: {
		if ($screenDimensions.width <= 850) {
			percentageOfScreen = {
				width: 0.6,
				height: 0.6
			};
		} else {
			percentageOfScreen = {
				width: 0.5,
				height: 0.3
			};
		}
	}
</script>

<T.Mesh position={[0, 5, 0]} rotation={[0, 0, 0]}>
	<RoundedBoxGeometry
		args={[
			0.5,
			percentageOfScreen.height * $screenDimensions.height * theNormalizer,
			percentageOfScreen.width * $screenDimensions.width * theNormalizer
		]}
		radius={0.15}
	/>
	<T.MeshStandardMaterial color={new Color('#04D9C4')} />
</T.Mesh>
