<script lang="ts">
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import { Color } from 'three';
	import { degToRad } from 'three/src/math/MathUtils.js';
</script>

<T.Mesh position={[0, 5, 10]} rotation={[0, degToRad(40), 0]}>
	<RoundedBoxGeometry args={[0.5, 12, 8]} radius={0.15} />
	<T.MeshStandardMaterial color={new Color('#04D9C4')} />
</T.Mesh>
