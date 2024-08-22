<script lang="ts">
	import { screenDimensions } from '$lib/store';
	import type { StoryCardPosition, StoryCardPositions, StoryText } from '$lib/types';
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import { Text } from '@threlte/extras';
	import { Color } from 'three';
	import { degToRad } from 'three/src/math/MathUtils.js';

	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { animationScripts, currentStoryText, scrollPercent } from '$lib/store';

	export let text: StoryText;
	export let pos: number = 0;
	const cardPositions: StoryCardPositions = {
		0: {
			position: [-10, 13, 0],
			rotation: [0, 0, degToRad(90)]
		},
		1: {
			position: [0, 5, 0],
			rotation: [0, 0, 0]
		},
		2: {
			position: [-10, -4, 0],
			rotation: [0, 0, degToRad(-90)]
		}
	};
	let currentMeshPos: StoryCardPosition = cardPositions[pos];
	let meshScale = 0;

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
	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[2],
			func: () => {
				meshScale = lerp(0, 1, scalePercent(scrollSections[2], $scrollPercent));
			},
			clearFunc: () => {
				meshScale = 0;
			}
		});
		return currentValue;
	});
</script>

<T.Mesh scale={meshScale} position={currentMeshPos.position} rotation={currentMeshPos.rotation}>
	<RoundedBoxGeometry
		args={[
			0.5,
			percentageOfScreen.height * $screenDimensions.height * theNormalizer,
			percentageOfScreen.width * $screenDimensions.width * theNormalizer
		]}
		radius={0.15}
	/>
	<T.MeshStandardMaterial color={new Color('#343840')} />
	<!-- <Text text={text.title} fontSize={1} position={[1, 5, 3]} rotation={[0, degToRad(90), 0]} />
	<Text
		text={text.description}
		fontSize={0.6}
		position={[1, 0, 0]}
		rotation={[0, degToRad(90), 0]}
	/> -->
</T.Mesh>
