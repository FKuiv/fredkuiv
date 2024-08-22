<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import InitialEnvironment from './scene1/InitialEnvironment.svelte';
	import { animationScripts, scrollPercent } from '$lib/store';
	import InitialForeground from './scene1/InitialForeground.svelte';
	import LightAndCamera from './LightAndCamera.svelte';
	import LinksCard from './LinksCard.svelte';
	import TextsContainer from './story/TextsContainer.svelte';

	const { renderer } = useThrelte();
	renderer.localClippingEnabled = true;

	function animate() {
		animationScripts.subscribe((scripts) => {
			scripts.forEach((script) => {
				if ($scrollPercent >= script.section.start && $scrollPercent <= script.section.end) {
					script.func();
				} else {
					script.clearFunc();
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

<InitialEnvironment />
<InitialForeground />

<TextsContainer />
<!-- <LinksCard /> -->
