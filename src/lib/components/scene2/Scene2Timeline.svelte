<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3, BufferGeometry, Color, Mesh } from 'three';
	const points = [new Vector3(10, 0, 10), new Vector3(0, 10, -10)];

	const geometry = new BufferGeometry().setFromPoints(points);
</script>

<!-- <T.Line {geometry}>
	<T.LineBasicMaterial color={new Color('red')} />
</T.Line> -->
