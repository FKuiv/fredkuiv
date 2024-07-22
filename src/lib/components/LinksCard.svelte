<script lang="ts">
	import { T } from '@threlte/core';
	import { Color } from 'three';
	import { degToRad } from 'three/src/math/MathUtils.js';
</script>

<T.Mesh position={[0, 5, 10]} rotation={[0, degToRad(40), 0]}>
	<T.BoxGeometry args={[0.5, 12, 8]} />
	<T.MeshStandardMaterial color={new Color('#04D9C4')} />
</T.Mesh>
