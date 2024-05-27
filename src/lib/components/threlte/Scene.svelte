<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import InitialEnvironment from './InitialEnvironment.svelte';
	import { animationScripts, scrollPercent } from '$lib/store';
	import InitialForeground from './InitialForeground.svelte';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import LightAndCamera from './LightAndCamera.svelte';

	const { renderer } = useThrelte();
	renderer.localClippingEnabled = true;

	function animate() {
		animationScripts.subscribe((scripts) => {
			scripts.forEach((script) => {
				if ($scrollPercent >= script.section.start && $scrollPercent <= script.section.end) {
					script.func();
				}
			});
		});
	}

	window.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercent.set(
			((document.documentElement.scrollTop || document.body.scrollTop) /
				((document.documentElement.scrollHeight || document.body.scrollHeight) -
					document.documentElement.clientHeight)) *
				100
		);
		animate();
	};
</script>

<LightAndCamera />

{#if $scrollPercent <= scrollSections[1].end}
	<InitialEnvironment />
	<InitialForeground />
{/if}
