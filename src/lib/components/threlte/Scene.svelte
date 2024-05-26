<script lang="ts">
	import { T } from '@threlte/core';
	import { BoxGeometry, CatmullRomCurve3, Color, Mesh, MeshBasicMaterial, Vector3 } from 'three';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import InitialEnvironment from './InitialEnvironment.svelte';
	import { degToRad } from 'three/src/math/MathUtils.js';

	let cubeRotation = 0;
	let scrollPercentage = 0;

	const animationScripts: { start: number; end: number; func: () => void }[] = [];
	animationScripts.push({
		start: 0,
		end: 30,
		func: () => {
			cubeRotation = lerp(0, 140, scalePercent(0, 30, scrollPercentage));
		}
	});

	// Create a curve that defines the path
	const curve = new CatmullRomCurve3([
		new Vector3(0, 0, -10),
		new Vector3(0, 5, -5),
		new Vector3(0, 0, 0),
		new Vector3(0, -5, 5),
		new Vector3(0, 0, 10)
	]);

	// Create a mesh
	const geometry = new BoxGeometry(1, 1, 1);
	const material = new MeshBasicMaterial({ color: 0x00ff00 });
	const mesh = new Mesh(geometry, material);

	// Create a variable to keep track of where along the path the mesh is
	let t = 0;
	animationScripts.push({
		start: 0,
		end: 50,
		func: () => {
			t = lerp(0, 1, scalePercent(0, 50, scrollPercentage));
			const point = curve.getPoint(t);
			mesh.position.copy(point);
		}
	});

	function animate() {
		animationScripts.forEach((script) => {
			if (scrollPercentage >= script.start && scrollPercentage <= script.end) {
				script.func();
			}
		});
	}

	window.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercentage =
			((document.documentElement.scrollTop || document.body.scrollTop) /
				((document.documentElement.scrollHeight || document.body.scrollHeight) -
					document.documentElement.clientHeight)) *
			100;
		animate();
	};
</script>

<InitialEnvironment />

<T.Mesh position={[0, 4, 0]} rotation={[0, 0, degToRad(cubeRotation)]}>
	<T.BoxGeometry args={[5, 5, 5]} />
	<T.MeshStandardMaterial color={new Color(0x00ff00)} wireframe />
</T.Mesh>

<T is={mesh} />
